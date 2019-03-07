import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
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
        // console.log("handleActions: ", btn, " : ", _id)
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
                    case "edit details":
                        localStorage.setItem("patient_id", _id)
                        this.props.history.push({pathname: 'updatepatient'})
                        break;
                    case "view reports":
                        localStorage.setItem("patient_id", _id)
                        this.props.history.push({pathname: 'report', state: {episodeId: '0'} })
                        break;
                    case "new survey":
                        localStorage.setItem("patient_id", _id)
                        this.props.history.push({pathname: 'survey', state: {_id} })
                        // this.props.history.push(`survey/${_id}`)
                    default: null;
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

                    <FindPatientForm 
                        filterByName={this.filterByName} 
                        filterByNumber={this.filterByNumber} 
                        filterByList={this.filterByList}
                    />
                    <br />

                    { displayPatientId && <FindPatientDetails handleActionBtns={this.handleActions}/> }

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