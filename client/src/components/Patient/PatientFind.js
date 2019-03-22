import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles, Card } from '@material-ui/core';
import { selectConsoleTitle, loadPatientsByProvider, loadPatientsByCareGroup, loadPatient } from '../../actions';
import PatientFindForm from './PatientFindForm';
import PatientFindTable from './PatientFindTable';
import PatientFindDetails from './PatientFindDetails';

const styles = () => ({
    root: {
        padding: "20px",
        minHeight: "120px"
    },
})


class PatientFind extends Component {  
    
    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Find Patient"}));
        this.props.dispatch(loadPatientsByProvider(localStorage.getItem("provider_id")));
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.patientInfo !== this.props.patientInfo) {
            this.setState({displayPatientInfo: nextProps.patientInfo._id})
        } 
    };

    state = {
        filterName: "",
        filterNumber: "",
        infoPanel: false
    };


    filterByName = (value) => { 
        this.setState({filterName: value})
     };

    filterByNumber= (value) => { 
        this.setState({filterNumber: value}) 
    };

    filterByList = (value) => {
        if (value === "all care group patients") {
            this.props.dispatch(loadPatientsByCareGroup(localStorage.getItem("provider_group_id")))
        } else {
            this.props.dispatch(loadPatientsByProvider(localStorage.getItem("provider_id")))
        }
    };

    infoPanel = (status) => {
        console.log("infoPanel: ", status)
        this.setState({infoPanel: status === "open" ? true : false})
    }

    actions = (btn, _id) => {
        console.log("handleActions: ", btn, " : ", _id)
        this.props.dispatch(loadPatient(_id))
        switch (btn) {
            case "contact":
                break;
            case "edit":
                return this.props.history.push({pathname: 'updatepatient'})
            case "reports":
                return this.props.history.push({pathname: 'report', state: {episodeId: '0', patientId: _id} })
            case "new diary card":
                return this.props.history.push({pathname: 'survey', state: {_id} })
            default: return null;
        }
    };

    render () {

        const { infoPanel } = this.state
        const { classes } = this.props

        return (
            <React.Fragment>
                <Card className={classes.root}>

                    <PatientFindForm 
                        filterByName={this.filterByName} 
                        filterByNumber={this.filterByNumber} 
                        filterByList={this.filterByList}
                    />
                    <br />

                    { infoPanel && 
                        <PatientFindDetails 
                            handleActionBtn={this.actions} 
                            handleInfoPanel={this.infoPanel}
                        /> 
                    }

                </Card> 
                
                <br />
              
                <PatientFindTable 
                    filterName={this.state.filterName} 
                    filterNumber={this.state.filterNumber} 
                    displayPatientDetails={this.displayPatientDetails}
                    handleActionBtn={this.actions}
                    handleInfoPanel={this.infoPanel}
                />
                <br />

            </React.Fragment> 
        );
    }
};


const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        user: state.user
    }
};

PatientFind = withRouter(PatientFind)
PatientFind = withStyles(styles)(PatientFind)
PatientFind = connect(mapStateToProps) (PatientFind)
export default PatientFind;