import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import { withStyles, Card } from '@material-ui/core';
import { selectConsoleTitle, loadPatientsByProvider, loadPatient } from '../../actions';
import PatientFindForm from './PatientFindForm';
import PatientFindTable from './PatientFindTable';
import PatientFindDisplay from './PatientFindDisplay';

const styles = () => ({
    root: {
        padding: "20px",
        minHeight: "120px"
    },
})


class PatientFind extends Component {  
    
    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Select Patient", menuIndex: 2}));
        this.props.dispatch(loadPatientsByProvider(localStorage.getItem("user_provider_id")));
    };

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.PatientInfo) && nextProps.patientInfo !== this.props.patientInfo) {
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
        this.setState({filterList: value})
    };

    infoPanel = (status) => {
        this.setState({infoPanel: status === "open" ? true : false}, 
            () => localStorage.setItem("patient_find_info_panel", JSON.stringify(this.state.infoPanel))
        )
    }

    actions = (btn, _id) => {
        console.log("handleActions: ", btn, " : ", _id)
        this.props.dispatch(loadPatient(_id))
        switch (btn) {
            case "contact":
                break;
            case "edit":
                return this.props.history.push({pathname: 'update'})
            case "reports":
                localStorage.setItem("report_episode_id", 0)
                localStorage.setItem("report_return_locn", '/admin/patient/find')
                return this.props.history.push({pathname: '/admin/report'})
            case "new diary card":
                return this.props.history.push({pathname: '/admin/survey', state: {_id} })
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
                        infoPanel={this.infoPanel}
                    />
                    <br />

                    {infoPanel && 
                        <PatientFindDisplay
                            handleBtns={this.actions} 
                            infoPanel={this.infoPanel}
                        /> 
                    }

                </Card> 
                
                <br />
              
                <PatientFindTable 
                    filterName={this.state.filterName} 
                    filterNumber={this.state.filterNumber} 
                    filterList={this.state.filterList}
                    displayPatientDetails={this.displayPatientDetails}
                    handleActionBtn={this.actions}
                    infoPanel={this.infoPanel}
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
PatientFind = connect(mapStateToProps)(PatientFind)
export default PatientFind;