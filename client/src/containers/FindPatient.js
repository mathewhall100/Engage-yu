import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup} from '../actions/index';
import FindPatientForm from '../components/Forms/FindPatientForm';
import FindPatientTable from './FindPatientTable';
import FindPatientDetails from '../components/FindPatientDetails';

const styles = theme => ({
    root: {
        padding: "20px"
    },
})


class FindPatient extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Find Patient"});
        this.props.fetchListPatientsByProvider(localStorage.getItem("provider_id")) 
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.patientInfo !== this.props.patientInfo) {
            this.setState({displayPatientId: nextProps.patientInfo._id}) 
        } else {this.setState({displayPatientId: null}) }
    };

    state = {
        filterName: "",
        filterNumber: "",
        displayPatientId: null
    };

    filterByName = (value) => { this.setState({filterName: value}) };

    filterByNumber= (value) => { this.setState({filterNumber: value}) };

    filterByList = (value) => {
        if (value === "all care group patients") {
            this.props.fetchListPatientsByCareGroup(localStorage.getItem("provider_group_id")) 
        } else {
            this.props.fetchListPatientsByProvider(localStorage.getItem("provider_id"))
        }
    };

    handleActions = (btn, row) => {
        console.log("handleActions: ", btn, " : ", row._id)
        switch (btn) {
            case "close":
                console.log("close")
                this.setState({displayPatientId: "" });
                break;
            case "contact":
                console.log("contact")
                break;
            case "edit details":
                console.log("edit details")
                this.props.history.push(`updatepatient/${row._id}`)
                break;
            case "view reports":
                console.log("view reports")
                this.props.history.push(`report/${row._id}&null`)
                break;
            case "new survey":
                console.log("new survey")
                this.props.history.push(`survey/${row._id}`)
            default: null;
        }
    };

    render () {

        const { displayPatientId } = this.state
        const { classes } = this.props

        return (
            <React.Fragment>
                <Card className={classes.root}>

                    <FindPatientForm 
                        filterByName={this.filterByName} 
                        filterByNumber={this.filterByNumber} 
                        filterByList={this.filterByList}
                    />
                    <br />

                    { displayPatientId && 
                        <React.Fragment>
                            <FindPatientDetails handleActionBtns={this.handleActions}/> 
                        </React.Fragment> 
                    }

                </Card>
                 <br />
              
                <FindPatientTable 
                    filterName={this.state.filterName} 
                    filterNumber={this.state.filterNumber} 
                    displayPatientDetails={this.displayPatientDetails}
                    handleActionBtn={this.handleActions}
                />
                <br />

            </React.Fragment> 
        );
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup }, dispatch);
};

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        user: state.user
    }
};

FindPatient = withRouter(FindPatient)
FindPatient = withStyles(styles)(FindPatient)
FindPatient = connect(mapStateToProps, mapDispatchToProps) (FindPatient)
export default FindPatient;