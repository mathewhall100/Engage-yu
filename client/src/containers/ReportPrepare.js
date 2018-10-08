import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { times, startCase } from 'lodash';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DoneIcon from '@material-ui/icons/Done';
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts';

import Callback from '../components/Callback';
import ReportTable from '../components/Tables/ReportTable';
import ReportDiaryCardDetails from '../components/Textblocks/ReportDiaryCardDetails'

const styles = theme => ({
    root: {
      width: "1020px",
      marginTop: theme.spacing.unit*2,
      marginBottom: "20px",
      padding: "20px"
    },
    reportTitle: {
        textAlign: "center"
    },
    colTitles: {
        fontWeight: "bold",
        textAlign: "center",
    }, 
    graphContainer: {
        width: "500px",
        border: "1px solid #dddddd",
        padding: "20px",
    },
    legendBox: {
        width: "18px",
        height: "18px",
        border: "1px solid grey",
        marginRight: "25px",
        display: "inline-block"
    },
    legendText: {
        fontSize: "14px",
        fontWeight: "bold",
        color: "#333333"
    },
    graphLabelText: {
        marginLeft: "180px",
        color: "#333333"
    },
    resultsHeading: {
        textAlign: "center",
        fontWeight: "bold", 
        margin: "20px"
    },
    tableContainer: {
        width: "500px",
        border: "1px solid #dddddd",
        padding:"20px",
    },
    entriesContainer: {
        width: "460px",
        border: "1px solid #dddddd",
        marginLeft: "20px",
        padding: "20px"
    },
    btnsContainer: {
        float: "right"
    },
    btn: {
        backgroundColor: "#eeeeee",
        marginRight: "15px",
        float: "right",
        textDecoration: "none",
        borderRadius: "5px",
    },
    detailsText: {
    },
    rightColumn: {
        paddingLeft: "20px"
    },
    bold: {
        fontWeight: "bold"
    },
    floatRight: {
        float: "right",   
    },

})


const CustomTableCell = withStyles(theme => ({
    head: {
      padding: "5px",
      fontSize: "14px",
      color: "#000000"
    },
    body: {
        padding: '5px',
        border: "none",
        fontSize: "16px",
        height: "auto",

      },
  }))(TableCell);


class ReportPrepare extends Component {

    componentWillMount() {
        const episodeId = this.props.match.params.id;
        let episodeArray = [];
        let episode = [];
        let records = [];

        if (this.props.patientData) {
            episodeArray = this.props.patientData.episodes.filter(e => e._id === episodeId) 
            episode = episodeArray[0]
            records = episode.records

            this.setState({ 
                episode: episode,
                questions: episode.questions,
                displayData: this.displayDataCalc(episode.records, episode.num_days, episode.expected_num_records/episode.num_days, episode.num_questions),
                records: records
            })
        } 
    }
    
    state = {
        episode: [],
        questions: [],
        records: []
    }

    displayDataCalc = (records, numDays, numTimes, numQuestions) => {
        //console.log("displaycalc Data: ", records, " ", " ", numDays, " ", numTimes, " ", numQuestions)
        let timesArrayIn = [];
        let questionDataSum = [];
        let obj = {};
        let objArray = [];
        let timesArrayOut = [];
        
        times(numTimes, (i) => {
            timesArrayIn = records.filter(rec => rec.time === records[i].time)
            //console.log("timesArrayin: ", timesArrayIn)

            times(numQuestions, (j) => {
                questionDataSum = [0, 0, 0, 0, 0];

                times(numDays, (k) => {
                    times(5, (l) => {
                        questionDataSum[l] = questionDataSum[l] + timesArrayIn[k].data[j].question_answers[l]
                    })
                }) 
                objArray.push({
                    question: j,
                    answers: questionDataSum
                    }) 
            })
            timesArrayOut.push({
                time: records[i].time,
                questions: objArray
            });
            objArray = [];
        })
        //console.log("TimesArrayOut: ", timesArrayOut)
        return timesArrayOut;
    }

    displayGraphCalc = (data, question) => {
        //console.log("graphdataIn: ", data)

        let array = [];
        data.map((d, index) => {

            array.push({
                time: `${d.time.slice(0, 2)}:${d.time.slice(-2)}`,
                ans1: d.questions[question].answers[0],
                ans2: d.questions[question].answers[1],
                ans3: d.questions[question].answers[2],
                ans4: d.questions[question].answers[3],
                ans5: d.questions[question].answers[4],
            })
        })
        //console.log("graphdataout: ", array)
        return array;
    }


    render () {

        const { episode, questions, records, displayData } = this.state
        const { classes, patientInfo, user } = this.props  

        const RenderPatientDetails = () => {
            return (
                <Grid container spacing={24}>
                    <Grid item xs={3}>
                        <Typography variant="caption">
                            Patient name
                        </Typography>
                        <Typography variant="title">
                            <span className={classes.textBold}>{startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption">
                            Hospital number:
                        </Typography>
                        <Typography variant="title">
                            <span className={classes.textBold}>{patientInfo.hospital_id}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption">
                            DOB
                        </Typography>
                        <Typography variant="title">
                            <span className={classes.textBold}>{patientInfo.dob}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="caption">
                            Primary provider
                        </Typography>
                        <Typography variant="title">
                            <span className={classes.textBold}> {startCase(`Dr. ${ this.props.patientInfo.primary_provider_name }`) }</span>
                        </Typography>
                    </Grid>
                </Grid>
            )
        }
        
        const RenderDiaryCardDetails = () => {
            return (
                <Grid container spacing={24}>
                    <Grid item xs={6}> 
                        <ReportDiaryCardDetails episode={episode} /> 
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="body2">
                            <div className={classes.detailsText}>
                                <br />
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Diary card requested by: </td>
                                            <td className={classes.rightColumn}>{ startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`) }</td>
                                        </tr><tr>
                                            <td>Report to: </td>
                                            <td className={classes.rightColumn}> {startCase(`Dr. ${ this.props.patientInfo.primary_provider_name}`) }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </Typography>
                    </Grid>
                </Grid>
            )
        }  

        const RenderReportDetails = () => {
            return (
                <div>
                    <div className={classes.bold}>
                            Report Details
                    </div>
                    <br />

                    <Typography variant="body2">
                            <div className={classes.detailsText}>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Report date: </td>
                                            <td className={classes.rightColumn}>{moment().format("MMM Do YYYY")}</td>
                                        </tr>
                                        <tr>
                                            <td>Report Requested by:  </td>
                                            <td className={classes.rightColumn}> {startCase(`Dr. ${ user.details.firstname} ${ user.details.lastname}`) } </td>
                                        </tr>                     
                                    </tbody>
                                </table>
                            </div>
                    </Typography>
                </div>
            )
        }


        return (

            <div>

                {episode && records && questions ? null : <Callback />}

                {episode && records && questions && <Paper className={classes.root}>

                 <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <div className={classes.btnsContainer}> 
                                <Tooltip title ="Close page" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                        <Button className={classes.btn} onClick = {event => this.handleClickBack(event)}>Close</Button>
                                </Tooltip> 
                                <Tooltip title ="Send report to patients electronic health record" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                        <Button className={classes.btn} onClick = {event => this.handleClickEHR(event)}>send to EHR</Button>
                                </Tooltip>
                                <Tooltip title ="Send report to patients electronic health record" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                        <Button className={classes.btn} onClick = {event => this.handleClickEmail(event)}>email</Button>
                                </Tooltip>
                                <Tooltip title ="Email report to provider and/or patient" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                        <Button className={classes.btn} onClick = {event => this.handleClickEmail(event)}>print</Button>
                                </Tooltip>
                            </div>
                         </Grid>
                    </Grid>
                    <br />
                    <hr />
                
                    <Grid container spacing={24}>
                        <Grid item xs={12}>
                            <br /><br />
                            <Typography variant="title" className={classes.reportTitle}>
                                Diary Card Report
                            </Typography>
                            <br />
                        </Grid>
                    </Grid>

                    <RenderPatientDetails />
                    <br />
                    <br />
                    <RenderReportDetails />
                    <br />
                    <br />
                    <RenderDiaryCardDetails />
                    <br />

                    {questions.map((question, index) => {
                        //console.log("question: ", question)
                        //console.log("displaydata: ", displayData)
                        return (
                            <div key={index}>
                                <Grid container spacing={24}>
                                    <Grid item xs={12}> 
                                        <br />
                                        <br />
                                        <br />
                                        <span className={classes.bold}>
                                            Question {index+1}: {question.question}
                                        </span>
                                        <br />
                                        <br />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs={6}>
                                            <div className={classes.graphContainer}>
                                                <div className={classes.resultsHeading}>
                                                    Summary Graph
                                                </div>
                                                <br />
                                                    <div> 
                                                        <span className={classes.legendBox} style={{backgroundColor: "green"}}></span> 
                                                        <span className={classes.legendtext}>{question.answers[0]}</span>
                                                    </div>
                                                    <div> 
                                                        <span className={classes.legendBox} style={{backgroundColor: "#FFc200"}}> </span> 
                                                        {question.answers[1]} 
                                                    </div>
                                                    <div> 
                                                        <span className={classes.legendBox} style={{backgroundColor: "orange"}}> </span> 
                                                        <span className={classes.legendtext}>{question.answers[2]}</span> 
                                                    </div>
                                                    <div> 
                                                        <span className={classes.legendBox} style={{backgroundColor: "red"}}> </span> 
                                                        <span className={classes.legendtext}>{question.answers[3]}</span>
                                                        </div>
                                                    <div> 
                                                        <span className={classes.legendBox} style={{backgroundColor: "grey"}}> </span> 
                                                        <span className={classes.legendtext}>{question.answers[4]}</span>
                                                    </div>
                                                <br />
                                            
                                                <BarChart data={this.displayGraphCalc(displayData, index)} margin={{top: 20, right: 30, bottom: 30}} width={485} height={200}>
                                                    <XAxis dataKey="time" angle={-45} textAnchor="end"></XAxis>
                                                    <YAxis hide={true}/>
                                                    <Bar dataKey="ans5" stackId="a" fill="grey" />
                                                    <Bar dataKey="ans4" stackId="a" fill="red" />
                                                    <Bar dataKey="ans3" stackId="a" fill="orange" />
                                                    <Bar dataKey="ans2" stackId="a" fill="#ffc200" />
                                                    <Bar dataKey="ans1" stackId="a" fill="green" />
                                                </BarChart> 
                                                <span className={classes.graphLabelText}>Time of day</span>
                                            </div>
                                            <br />
                                            <br />
                                            <div className={classes.tableContainer}>
                                                 <div className={classes.resultsHeading}>
                                                    Summary Table
                                                </div>
                                                <ReportTable 
                                                    displayData={displayData}
                                                    displayQuestion={index}
                                                    question={question}
                                                    numDays={this.state.episode.num_days}
                                                />
                                            </div>
                                            <br /> 
                                    </Grid>      
                                    <Grid item xs={6}> 

                                        <div className={classes.entriesContainer}>
                                            <div className={classes.resultsHeading}>
                                                    Patient Entries (raw data)
                                                </div>
                                            <Table style={{ padding: "20px", width: '100%'}}>    
                                                <TableHead >
                                                    <TableRow>
                                                        <CustomTableCell style={{width: "24%"}}>Time</CustomTableCell>
                                                        {question.answers.map((answer, i) => {
                                                            return (
                                                                <CustomTableCell style={{width: "15%"}} key={i}>
                                                                    {answer}
                                                                </CustomTableCell>
                                                            )
                                                        })}
                                                    </TableRow>
                                                </TableHead>  

                                                {times(episode.num_days, (day) => {
                                                    return ( 
                                                    <TableBody key={day}>

                                                        <TableRow style={{height: "10px"}}>
                                                            <CustomTableCell colSpan={6}> 
                                                            </CustomTableCell>
                                                        </TableRow>

                                                        <TableRow> 
                                                            <CustomTableCell colSpan={3}>
                                                                Day: {day}: {moment(records[(day)*records.length/episode.num_days].scheduled_datetime).format("MMM Do YYYY")} 
                                                                <hr />
                                                            </CustomTableCell>
                                                        </TableRow> 

                                                        {times((records.length/episode.num_days), (time) => {
                                                            return (
                                                                <TableRow key={time} style={{height: "40px"}}>
                                                                    
                                                                    <CustomTableCell>
                                                                        {`${records[((day)*records.length/episode.num_days)+time].time.slice(0, 2)}:${records[((day)*records.length/episode.num_days)+time].time.slice(-2)}`}
                                                                    </CustomTableCell>

                                                                    {records[((day)*records.length/episode.num_days)+time].data[index].question_answers.map((answer, i)=> {
                                                                        return (
                                                                            <CustomTableCell key={i}
                                                                                style={{
                                                                                    fontWeight: "bold",
                                                                                    textAlign: "center",
                                                                                    fontSize: '18px',   
                                                                                }}>
                                                                                {answer === true ? <DoneIcon /> : null}
                                                                            </CustomTableCell>
                                                                        ) 
                                                                    })} 
                                                                </TableRow>
                                                                
                                                            )
                                                        })}
                                                    </TableBody>)
                                                })}

                                               
                                            </Table>  
                                        </div>
                                    </Grid> 
                                </Grid>
                                
                            <br />
                            <br />

                        </div>

                        ) 
                    }) }
                        
                    <br />
                    <hr />
                    <br />

                    <div className={classes.floatRight}>{moment().format("dddd, MMMM Do YYYY, h:mm:ss a")}</div> 

                    <br />

                </Paper> }
            </div>
        ); 
    }

           
}


ReportPrepare.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
  };
  ReportPrepare = connect(mapStateToProps)(ReportPrepare)
  ReportPrepare = withRouter(ReportPrepare)
  ReportPrepare = withStyles(styles, { withTheme: true })(ReportPrepare)
  export default ReportPrepare