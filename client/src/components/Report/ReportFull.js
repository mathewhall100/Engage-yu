import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase, isEmpty } from 'lodash'
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles, Paper, Grid, Typography} from '@material-ui/core';
import CallBack from '../UI/callback';
import BtnTooltipGroup from '../UI/Buttons/btnTooltipGroup'
import ReportTable from './ReportTable';
import ReportEntriesTable from './ReportEntriesTable'
import ReportBarGraph from './ReportBarGraph';
import DetailsBar from '../UI/detailsBar';
import { selectConsoleTitle } from '../../actions/index';
import { displayDataCalc } from './reportLogic';
import ReportRequestDetails from './ReportRequestDetails'
import ReportSurveyDetails from './ReportSurveyDetails'

const styles = theme => ({
    root: {
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
        this.props.dispatch(selectConsoleTitle({title: "Full Report"}));
        let episode =  JSON.parse(localStorage.getItem("report_episode")) 
        if (episode) {
            this.setState({ 
                episode,
                records: episode.records,
                questions: episode.questions,
                episodeDataForReport: displayDataCalc(episode.records, episode.num_days, episode.records.length/episode.num_days, episode.questions.length),
            })
        }
    }

    state = {
        episode: {},
        questions: [],
        episodeDataForReport: [],
        records: []
    }

    // Event handlers
    handleBtns = (btn) => {
        console.log("handleActions: ", btn)
        switch (btn) {
            case "close":
                this.props.history.push({
                    pathname: `/admin/report/${this.state.episode._id}`
                })
                break;
            default: return null
        }
    }


    render () {

        const { episode, questions, records, episodeDataForReport } = this.state
        const { classes, loading, error, patientInfo } = this.props  

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

        if (loading || error) { 
            return <CallBack text="loading..." fallbackText="Unable to retrieve requested data"/>
        }

        return (
            <Paper className={classes.root}>

                <Grid container spacing={24}> 
                    <Grid item xs={7}>
                        <Typography variant="h5" align="center" style={{position: "relative", top: "4px", left: "120px", fontWeight: 500}} >
                            Diary Card Report
                        </Typography>
                    </Grid>
                    <Grid item xs={5} style={{position: "relative", top: "4px"}}>
                        <BtnTooltipGroup btns={btns} handleBtns={this.handleBtns}/>
                    </Grid>
                </Grid>

                <br /><hr /><br />

                <DetailsBar items={patientDetails} /> 

                {!isEmpty(episode) ?
                    <Fragment>

                        <Grid container spacing={24}>
                            <Grid item xs={6}>
                                <ReportSurveyDetails episode={episode}/> 
                            </Grid>
                            <Grid item xs={6}>
                                <ReportRequestDetails episode={episode} patientInfo={patientInfo}/>
                            </Grid>
                        </Grid>

                        {episode.status === "pending" ?
                            <Typography variant="subtitle1" >
                                <br /> <br />
                                <strong>No Data to report:</strong> this diary card has not yet been started by the patient.
                            </Typography>
                            :
                            <Fragment>
                                {questions.map((question, index) => {
                                    return (
                                        <Fragment key={index}>

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
                                
                                        </Fragment>
                                    ) 
                                }) }
                            </Fragment>
                        }
                    </Fragment>
                    :
                    <Typography variant="subtitle1" >
                        <br /> <br />
                        <strong>No Data to report:</strong> no diary cards found for this patient.
                    </Typography>
                }
                   
                <br /><hr /><br />
                <Typography align="right">
                    {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
                </Typography> 
                <br />

            </Paper> 
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
        error: state.patient.error,
        loading: state.patient.loading
    }
  };

ReportFull = connect(mapStateToProps)(ReportFull)
ReportFull = withRouter(ReportFull)
ReportFull = withStyles(styles, { withTheme: true })(ReportFull)
export default ReportFull