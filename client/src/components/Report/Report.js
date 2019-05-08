import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Paper } from '@material-ui/core'
import CallBack from '../UI/callback'
import ReportPatientDetails from './ReportPatientDetails'
import ReportSummary from './ReportSummary';
import ReportListSurveys from './ReportListSurveys';

const styles = theme => ({
    root: {
        width: "100%",
        marginBottom: "12px",
        padding: "0 20px",
        minHeight: "470px"
    },
});

class Report extends Component {  

    componentDidMount() {
        this.setState({episodeId: localStorage.getItem("report_episode_id") })
    }
        
    state = {
        episode: {},
        episodeId: "",
        openFull: false
    }

    handleChangeEpisode = (id) => {
        localStorage.setItem("report_episode_id", id)
        this.setState({episodeId: id})
    }

    render () {
        const { classes, patientInfo, patientData, loading, error } = this.props
        const { episodeId } = this.state

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !patientInfo || !patientData) {
            return <CallBack />
        }

        return (
            <Paper className={classes.root}>
                <ReportPatientDetails />
                <ReportSummary  currentEpisode={episodeId} /> 
                <br /> 
                <ReportListSurveys changeEpisode={this.handleChangeEpisode} currentEpisode={episodeId}/> 
                <br />
            </Paper> 
        );
    }
}


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading,
    }
};

Report= connect(mapStateToProps)(Report)
Report = withStyles(styles)(Report)
export default Report;
