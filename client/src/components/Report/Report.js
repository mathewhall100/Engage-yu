import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
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
        this.props.selectConsoleTitle({title: "Summary Report"});
        this.props.fetchReportPatientData(localStorage.getItem("patient_id"))
        this.setState({
            episodeId: this.props.match.params.id,
            patientId: localStorage.getItem("patient_id")
        })
        
    };

    state = {
        episode: {},
        episodeId: "",
        patientId: "",
        openFull: false
    }

    handleChangeEpisode = (id) => {
        this.setState({episodeId: id})
    }

    handleOpenFull = (episode, questions, episodeDataForReport) => {
        // console.log("fullReport episode:", episode)
        this.props.selectConsoleTitle({title: "Full Report"});
        this.setState({
            episode,
            questions,
            episodeDataForReport
            },  () => this.setState({openFull: true}) 
        )
    }

    handleCloseFull = (id) => {
        // console.log("report episode:", id)
        this.props.selectConsoleTitle({title: "Summary Report"});
        this.setState({episodeId: id}, () =>
            {this.setState({openFull: false}) }
        )
    }

    render () {

        const { classes } = this.props
        const { openFull } = this.state

        const RenderReportSummary = (props) =>
            <React.Fragment>
                <Paper className={classes.detailsContainer}>
                    <ReportPatientDetails closeBtn={true}/> 
                </Paper>  
                <ReportSummary  episodeId={this.state.episodeId} patientId={this.state.patientId} handleFullReport={this.handleOpenFull} /> <br /> 
                <ReportListSurveys changeEpisode={this.handleChangeEpisode} /> 
            </React.Fragment> 

        const RenderReportFull = (props) => 
            <ReportFull 
                episode={this.state.episode} 
                questions={this.state.questions}
                episodeDataForReport={this.state.episodeDataForReport}
                handleClose={this.handleCloseFull} />

        return (

            openFull ? <RenderReportFull /> : <RenderReportSummary />
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
