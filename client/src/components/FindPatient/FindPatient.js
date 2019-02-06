import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup, fetchReportPatientData } from '../../actions/index';
import FindPatientForm from './FindPatientForm';
import FindPatientTable from './FindPatientTable';
import FindPatientDetails from './findPatientDetails';

const styles = () => ({
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

    filterByName = (value) => { 
        this.setState({filterName: value})
     };

    filterByNumber= (value) => { 
        this.setState({filterNumber: value}) 
    };

    filterByList = (value) => {
        if (value === "all care group patients") {
            this.props.fetchListPatientsByCareGroup(localStorage.getItem("provider_group_id")) 
        } else {
            this.props.fetchListPatientsByProvider(localStorage.getItem("provider_id"))
        }
    };

    handleActions = (btn, _id) => {
        // console.log("handleActions: ", btn, " : ", _id)
        switch (btn) {
            case "close":
                localStorage.setItem("patient_id", "");
                this.props.fetchReportPatientData([],[])
                this.setState({displayPatientId: "" });
                break;
            case "contact":
                break;
            case "edit details":
                this.props.history.push(`updatepatient/${_id}`)
                break;
            case "view reports":
                localStorage.setItem("patient_id", _id)
                this.props.history.push('report/0')
                break;
            case "new survey":
                this.props.history.push(`survey/${_id}`)
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
    return bindActionCreators({selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup, fetchReportPatientData}, dispatch);
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