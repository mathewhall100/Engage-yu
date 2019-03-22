import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles, Paper, Grid, Typography} from '@material-ui/core';
import Callback from '../UI/callback';
import BtnTooltip from '../UI/Buttons/btnTooltip'
import ReportTable from './ReportTable';
import ReportEntriesTable from './ReportEntriesTable'
import ReportBarGraph from './ReportBarGraph';
import DetailsBar from '../UI/detailsBar';
import { displayDataCalc } from './reportLogic';
import ReportRequestDetails from './ReportRequestDetails'
import ReportSurveyDetails from './ReportSurveyDetails'

const styles = theme => ({
    root: {
    //   width: "1160px",
      marginBottom: "20px",
      padding: "20px 20px 20px 40px"
    },    
    btnsContainer: {
        float: "right"
    },
    graphContainer: {
        width: "560px",
        border: "1px solid #dddddd",
        padding: "20px",
        marginBottom: "30px"
    },
    tableContainer: {
        width: "560px",
        border: "1px solid #dddddd",
        padding:"20px",
    },
    iconStyles: {
        fontSize: "32px",
        padding: 0
    },
    entriesContainer: {
        width: "490px",
        border: "1px solid #dddddd",
        marginLeft: "30px",
        padding: "20px"
    },
    fwMedium: {
        fontWeight: 500
    }
})


class ReportFull extends Component {

    componentDidMount() {
        // console.log("full report episode: ", this.props.episode)
        let episode = this.props.episode
        this.setState({ 
            episode,
            records: episode.records,
            questions: episode.questions,
            episodeDataForReport: displayDataCalc(episode.records, episode.num_days, episode.records.length/episode.num_days, episode.questions.length),
        })
    } 

    state = {
        episode: {},
        questions: [],
        episodeDataForReport: [],
        records: []
    }

    // Event handlers
    handleActions = (btn) => {
        console.log("handleActions: ", btn)
        switch (btn) {
            case "close":
                this.props.handleClose(this.props.episode._id)
                break;
            default: return null
        }
    }


    render () {

        const { episode, questions, records, episodeDataForReport } = this.state
        const { classes, patientInfo } = this.props  

        const btns = [
            {tooltip: "Close page", text: "close"},
            {tooltip: "Send report to patients electronic health record", text: "send to EHR"},
            {tooltip: "Email report to provider and/or patient", text: "email"},
            {tooltip: "Print report", text: "print"},
        ];
        const patientDetails = [
            {spacing: 3, caption: "Patient name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`},
            {spacing: 3, caption: "Hospital number", text: patientInfo.hospital_id},
            {spacing: 3, caption: "DOB", text: patientInfo.dob},
            {spacing: 3, caption: "", text: ""}
        ];

        const RenderSubtitle = (props) =>
            <Typography variant="subtitle1" className={classes.fwMedium} align="center" gutterBottom>
                {props.text}
            </Typography>

        return (
            <React.Fragment>
                { episode._id && records && questions ? 
                    <Paper className={classes.root}>

                        <Grid container spacing={24}> 
                            <Grid item xs={7}>
                                <Typography variant="h5" align="center" style={{position: "relative", top: "4px", left: "120px", fontWeight: 500}} >
                                    Diary Card Report
                                </Typography>
                            </Grid>
                            <Grid item xs={5} style={{position: "relative", top: "4px"}}>
                                <BtnTooltip btns={btns} handleActionBtns={this.handleActions}/>
                            </Grid>
                           
                        </Grid>

                        <br /><hr /><br />
                    
                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <DetailsBar items={patientDetails}/> 
                            </Grid>
                            <Grid item xs={6}>
                                {episode && <ReportSurveyDetails episode={episode}/> }
                            </Grid>
                            <Grid item xs={6}>
                                 <ReportRequestDetails episode={episode}/>
                            </Grid>
                        </Grid>
                    
                        {questions.map((question, index) => {
                            return (
                                <React.Fragment key={index}>

                                    <Grid container spacing={24}>
                                        <Grid item xs={12}> 
                                            <Typography variant="h6" >
                                                Question {index+1}: {question.question}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={24}>
                                        <Grid item xs={6}>

                                            <div className={classes.graphContainer}>
                                                <RenderSubtitle text="Summary Graph" />
                                                <ReportBarGraph 
                                                    displayData={episodeDataForReport}
                                                    displayQuestion={index}
                                                    question={question}
                                                    height={230}
                                                    responsive="true"
                                                />
                                            </div>

                                            <div className={classes.tableContainer}>
                                                <RenderSubtitle text="Summary Table" />
                                                <ReportTable 
                                                    displayData={episodeDataForReport}
                                                    displayQuestion={index}
                                                    question={question}
                                                    numDays={episode.num_days}
                                                />
                                            </div>

                                        </Grid>

                                        <Grid item xs={6}> 

                                            <div className={classes.entriesContainer}>
                                                <RenderSubtitle text="Patient Entries (raw data)" />
                                                <ReportEntriesTable 
                                                    records={records} 
                                                    startTime={episode.start_time}
                                                    index={index}
                                                    question={question}
                                                />
                                            </div>

                                        </Grid> 
                                    </Grid>
                                    
                                    <br /><br />
                          
                                </React.Fragment>

                            ) 
                        }) }
                            
                        <br /><hr /><br />
                        <Typography align="right">
                            {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
                        </Typography> 
                        <br />

                    </Paper> 
                    :
                    <Callback />
                }
            </React.Fragment>
        ); 
    }    
}

ReportFull.propTypes = {
    classes: PropTypes.object.isRequired,
  };


const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading
    }
  };

ReportFull = connect(mapStateToProps)(ReportFull)
ReportFull = withRouter(ReportFull)
ReportFull = withStyles(styles, { withTheme: true })(ReportFull)
export default ReportFull