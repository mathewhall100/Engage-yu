import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import ReportPatientDetails from './ReportPatientDetails';
import ReportSummary from './ReportSummary';
import ReportListSurveys from './ReportListSurveys';
import { selectConsoleTitle, fetchReportPatientData } from '../../actions/index';
import ReportFull from './ReportFull';

const styles = theme => ({
    detailsContainer: {
        width: "100%",
        marginTop: theme.spacing.unit*2,
        paddingLeft: "20px",
        marginBottom: "30px"
    },
})

class Report extends Component {  

    componentDidMount() {
        console.log("Report CDM")
        this.props.selectConsoleTitle({title: "Summary Report"});
        
        let patientInfo, patientData
        const url = `/api/patient_info/find/${localStorage.getItem("patient_id")}`
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
        })
        console.log("Report: episode_id ", this.props.match.params.id)
        this.setState({episodeId: this.props.match.params.id}) 
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

        const { classes } = this.props
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
                    <Paper className={classes.detailsContainer}><ReportPatientDetails closeBtn={true}/></Paper>  
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
    }
};

Report= connect(mapStateToProps, mapDispatchToProps)(Report)
Report = withRouter(Report)
Report = withStyles(styles)(Report)
export default Report;
