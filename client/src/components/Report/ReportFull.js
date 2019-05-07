import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase, isEmpty } from 'lodash'
import ReactToPrint from 'react-to-print'
import moment from 'moment';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PropTypes from 'prop-types';
import { withStyles, Paper, Grid, Typography, Button, Tooltip} from '@material-ui/core';
import CallBack from '../UI/callback';
import ReportTable from './ReportTable';
import ReportEntriesTable from './ReportEntriesTable'
import ReportBarGraph from './ReportBarGraph';
import DetailsBar from '../UI/detailsBar';
import BtnLink from '../UI/Buttons/btnLink';
import { selectConsoleTitle } from '../../actions/index';
import { displayDataCalc } from './reportLogic';
import ReportRequestDetails from './ReportRequestDetails'
import ReportSurveyDetails from './ReportSurveyDetails'
import ReportEmailDialog from './ReportEmailDialog'
import { reportEpisode } from '../../actions';
import './reportPrint.css'


const styles = theme => ({
    root: {
        width: "1160px",
        margin: "0 auto",
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
    },
    btn: {
        height: "32px",
        padding: "0 5px",
        marginLeft: '15px',
        color: "#555",
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#dddddd",
            color: theme.palette.primary.dark,
            cursor: "pointer"
        },
        '&:disabled': {
            color: 'grey',
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
})


class ReportFullPrepare extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Full Report"}));
        let episode =  this.props.episode
        if (episode && episode._id) {
            this.setState({ 
                episode: episode,
                records: episode.records,
                questions: episode.questions,
                episodeDataForReport: displayDataCalc(episode.records, episode.num_days, episode.records.length/episode.num_days, episode.questions.length),
            })
        }
    }

    componentWillUnmount() {
        this.props.dispatch(reportEpisode({}))
    }

    state = {
        episode: {},
        questions: [],
        episodeDataForReport: [],
        records: []
    }

    render () {

        const { episode, questions, records, episodeDataForReport } = this.state
        const { classes, loading, error, patientInfo } = this.props  
 
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
            <Paper id="report" className={classes.root}>
                {!isEmpty(episode) ? 
                    <Fragment>
                        {questions.map((question, index) => {
                            return (       
                                <div className='page-break' key={index} >
                                
                                    <Typography variant="h5" align="center" style={{fontWeight: 500}} >
                                        Diary Card Report
                                    </Typography>

                                    <br /><hr /><br />

                                    <DetailsBar items={patientDetails} /> 

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
                                                
                                            </Fragment>
                                        }
                                        
                                    <br /><hr /><br />
                                    <Typography align="right">
                                        {moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}
                                    </Typography> 
                                    <br />
                                </div>
                            )   
                        })} 
                    </Fragment>
                    :
                    <Fragment>
                        <Typography variant="h5" align="center" style={{fontWeight: 500}} >
                            Diary Card Report
                        </Typography>
                        <br /><hr /><br />
                        <DetailsBar items={patientDetails} /> 
                        <Typography variant="subtitle1" >
                            <CallBack 
                            noSpin={true} 
                            text="Loading..." 
                            fallbackTitle="" 
                            fallbackText="There are no diary cards to report for this patient." 
                        />
                        </Typography>
                    </Fragment>
                }

            </Paper> 
        ); 
    }    
}

class ReportFull extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Full Report"}));
        let episode =  this.props.episode
        if (episode && episode._id) {
            this.setState({episode: episode})
        }
    }

    state = {
        episode: {},
        openDialog: false
    }

    pxToMm = (px) => {
        return px/document.getElementById('myMm').offsetHeight
    }

    mmToPx = (mm) => {
        return document.getElementById('myMm').offsetHeight*mm;
    }

    handleCreatePdf = () => {
            // const USLetterWidthMm = 216;
            // const USLetterHeightMm = 279;
            const a4WidthMm = 210;
            const a4HeightMm = 297;
            const printPageWidthPx = 830;
            const printPageWidthMm = 290;
            const printPageHeightPx = 1188;
            const input = document.getElementById("report")
            const inputHeightMm = this.pxToMm(input.offsetHeight);
            const inputWidthMm = this.pxToMm(input.offsetWidth);
            const inputHeightPx = input.offsetHeight;
            //const inputWidthPx = input.offsetWidth;
            console.log("inputHeightMm: ", inputHeightMm)
            console.log("inputWidthMm: ", inputWidthMm)
            console.log("inputHeightPx: ", input.offsetHeight)
            console.log("inputWidthPx: ", input.offsetWidth)
            //const a4HeightPx = this.mmToPx(a4HeightMm);
            const numPages = inputHeightMm <= a4HeightMm ? 1 : Math.floor(inputHeightMm/a4HeightMm) + 1;
            console.log("numPages: ", numPages)
            html2canvas(input)
            .then((canvas) => {
                let pdf;
                const imgData = canvas.toDataURL('image/png');
                if (numPages > 1) {
                    pdf = new jsPDF({
                        orientation: "portrait",
                        // Note units: 'mm' doesn't work here,  defaults to pixels (known bug). Units 'mm' works as default elsewhere (eg in addImage method below)
                        format: [inputHeightPx*(a4WidthMm/printPageWidthMm), printPageWidthPx]
                    })
                } else {
                    pdf = new jsPDF({
                        orientation: "portrait",
                        // Note (pixels - see above)
                        format: [printPageHeightPx, printPageWidthPx]
                    })
                }
                pdf.addImage(imgData, "PNG", 0, 0, printPageWidthMm, inputHeightMm, null, "MEDIUM");
                pdf.save('report.pdf')
            })
    }

    handleEmail = () => {
        this.setState({openDialog: false}, () => {this.setState({openDialog: true}) } )
    }

    handleSendToEHR = () => {
        console.log("send to EHR")
    }


    render() {

        const { classes } = this.props
        const { openDialog, episode } = this.state
        
        return (
            <Fragment>
                <div style={{textAlign: "center"}}>
                {/* dummy component to get the height of 1mm in pixels for the pdf function */}
                <div id="myMm" style={{height: "1mm" }} /> 
                    <ReactToPrint
                        trigger={() =>  <Tooltip title="Open print menu to print or save report" enterDelay={300}>
                                            <Button variant="outlined" size="small" disabled={isEmpty(episode)} className={classes.btn}>print</Button>
                                        </Tooltip>
                                } 
                        content={() => this.componentRef}
                    />
                     <Tooltip title="Generate PDF to download, print or email" enterDelay={300}>
                        <Button variant="outlined" size="small" disabled={isEmpty(episode)} className={classes.btn} onClick={() => this.handleCreatePdf()}>create PDF</Button>
                    </Tooltip>
                    <Tooltip title="Open Email dialog to send report to other providers" enterDelay={300}>
                        <Button variant="outlined" size="small" disabled={isEmpty(episode)}className={classes.btn} onClick={() => this.handleEmail()}>email</Button>
                    </Tooltip>
                    <Tooltip title="Send report direct to patient's electronic health record (EHR)" enterDelay={300}>
                        <Button variant="outlined" size="small" disabled={isEmpty(episode)}className={classes.btn} onClick={() => this.handleSendToEHR()}>send to ehr</Button>
                    </Tooltip>
                    <BtnLink type="button" text='back' url={this.props.episode ? `/admin/report/${this.props.episode._id}` : '/admin/report/0'} />
                </div>              
                <br /><br />
                <ReportFullPrepare id="report" ref={el => (this.componentRef = el)} />
                {openDialog && <ReportEmailDialog />}
            </Fragment>
        )
    }
}


ReportFullPrepare.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        error: state.patient.error,
        loading: state.patient.loading,
        episode: state.reportEpisode
    }
  };

ReportFullPrepare = connect(mapStateToProps)(ReportFullPrepare)
ReportFullPrepare = withRouter(ReportFullPrepare)
ReportFullPrepare = withStyles(styles, { withTheme: true })(ReportFullPrepare)

ReportFull = connect(mapStateToProps)(ReportFull)
export default withStyles(styles)(ReportFull)