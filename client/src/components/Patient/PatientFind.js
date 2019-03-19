import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles, Card } from '@material-ui/core';
import { selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup, fetchReportPatientData } from '../../actions/index';
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
        this.props.selectConsoleTitle({title: "Find Patient"});
        this.props.fetchListPatientsByProvider(localStorage.getItem("provider_id")) 
    };

    componentWillReceiveProps(nextProps) {
        if (nextProps.patientInfo !== this.props.patientInfo) {
            this.setState({displayPatientId: nextProps.patientInfo._id}) 
        } 
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
        console.log("handleActions: ", btn, " : ", _id)
        if (btn === "close") {
            localStorage.setItem("patient_id", "");
            this.props.fetchReportPatientData([],[])
            this.setState({displayPatientId: "" });
        } else {
            let patientInfo, patientData
            const url = `/api/patient_info/find/${_id}`
            axios.get(url)
            .then( res => {
                patientInfo = res.data
                axios.get(`/api/patient_data/${patientInfo.patient_data_id}`)
                .then( res => {
                    patientData = res.data
                    console.log("axios patientInfo: ", patientInfo)
                    console.log("axios patientData: ", patientData)
                    this.props.fetchReportPatientData(patientInfo, patientData)
                })
                .catch(err => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(err);
                })
                
                switch (btn) {
                    case "contact":
                        break;
                    case "edit":
                        localStorage.setItem("patient_id", _id)
                        this.props.history.push({pathname: 'updatepatient'})
                        break;
                    case "reports":
                        localStorage.setItem("patient_id", _id)
                        this.props.history.push({pathname: 'report', state: {episodeId: '0'} })
                        break;
                    case "new diary card":
                        localStorage.setItem("patient_id", _id)
                        this.props.history.push({pathname: 'survey', state: {_id} })
                        break;
                    default: return null;
                }
            })
        }
       
    };

    render () {

        const { displayPatientId } = this.state
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

                    { displayPatientId && <PatientFindDetails handleActionBtns={this.handleActions}/> }

                </Card> 
                
                <br />
              
                <PatientFindTable 
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

PatientFind = withRouter(PatientFind)
PatientFind = withStyles(styles)(PatientFind)
PatientFind = connect(mapStateToProps, mapDispatchToProps) (PatientFind)
export default PatientFind;