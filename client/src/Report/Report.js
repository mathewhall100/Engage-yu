import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReportPatientDetails from './ReportPatientDetails';
import ReportSummary from './ReportSummary';
import ReportListSurveys from './ReportListSurveys';
import { selectConsoleTitle, fetchReportPatientData } from '../actions/index';
import ReportFull from './ReportFull';

class Report extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Summary Report"});
        
        let patientInfo, patientData
        //console.log("patient id: ", localStorage.getItem("patient_id"))
        const url = `/api/patient_info/find/${localStorage.getItem("patient_id")}`
        axios.get(url)
        .then(res => {
            patientInfo = res.data
            axios.get(`/api/patient_data/${patientInfo.patient_data_id}`)
            .then(res => {
                patientData = res.data
                //console.log("axios patientInfo: ", patientInfo)
                //console.log("axios patientData: ", patientData)
                this.props.fetchReportPatientData(patientInfo, patientData)
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
        })  
        //console.log("Report: episode_id ", this.props.location.state.episodeId)
        this.setState({episodeId: this.props.location.state.episodeId}) 
    };

    state = {
        episode: {},
        episodeId: "",
        openFull: false
    }

    handleChangeEpisode = (id) => {
        console.log("Report: handleChangeEpisode: ", id)
        this.setState({episodeId: id})
    }

    handleOpenFull = (episode, questions, episodeDataForReport) => {
        this.props.selectConsoleTitle({title: "Full Report"});
        this.setState({
            episode,
            questions,
            episodeDataForReport
            },  () => this.setState({openFull: true}) 
        )
    }

    handleCloseFull = (id) => {
        this.props.selectConsoleTitle({title: "Summary Report"});
        this.setState({episodeId: id}, () =>
            {this.setState({openFull: false}) }
        )
    }

    render () {

        const { openFull, episodeId, episode, questions, episodeDataForReport } = this.state

        return (
            <React.Fragment>
                
                {openFull && <ReportFull 
                    episode={episode} 
                    questions={questions}
                    episodeDataForReport={episodeDataForReport}
                    handleClose={this.handleCloseFull}
                    />
                }

                {!openFull && <React.Fragment>
                    <ReportPatientDetails />
                    <ReportSummary  episodeId={episodeId} handleFullReport={this.handleOpenFull} /> <br /> 
                    <ReportListSurveys changeEpisode={this.handleChangeEpisode} /> 
                </React.Fragment> }

            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchReportPatientData }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
    }
};

Report= connect(mapStateToProps, mapDispatchToProps)(Report)
Report = withRouter(Report)
export default Report;
