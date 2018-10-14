import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link, Redirect } from 'react-router-dom';
import { times, startCase } from 'lodash';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer } from 'recharts';

import Callback from '../components/Callback';
import ReportTable from '../components/Tables/ReportTable';
import ReportBarGraph from '../components/Graphs/ReportBarGraph';




const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit*2,
      marginBottom: "20px",
      paddingLeft: "20px"
    },
    detailsContainer: {
        width: "100%",
        height: "130px",
        marginTop: "10px"
    }, 
    detailsText: {
        marginTop: "15px"
    },
    btn: {
        backgroundColor: "#eeeeee",
        float: "right",
        marginTop: "10px",
        textDecoration: "none",
        borderRadius: "5px",
    },
    rightColumn: {
        paddingLeft: "20px"
    },
    bold: {
        fontWeight: "bold"
    },
    graphContainer: {
        height: "300px",
        border: "1px solid #dddddd",
        padding: "15px",
    },
    tableContainer: {
        height: "430px",
        border: "1px solid #dddddd",
        marginRight: "20px",
        marginTop: "10px",
        marginBottom: "10px",
        padding: "15px",
        overflow: "auto"
    },
    linksContainer: {
        paddingTop: '10px',
        paddingBottom: '20px',
        paddingLeft: "2px"
    },
    navLinks: {
        marginRight: "20px",
        fontSize: "15px",
        textDecoration: "underline",
        color: "#000000",
        '&:hover': {
          cursor: "pointer",
          fontWeight: 600,
        },
      },
      customWidth: {
        maxWidth: "100px",
      }, 
      floatRight: {
        float: "right"
      },
      questionButtons: {
        marginRight: "6px",
        padding: '5px 9px 5px 9px',
        backgroundColor: "#eeeeee",
        fontWeight: "bold",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#cccccc",
        },
        hover: {},
        disabled: {},
      }
  });


class ReportDisplayData extends Component {


    async componentDidMount() {
        console.log("id: ", this.props.episodeId)
        await this.setState({episodes: this.props.patientData.episodes}) 
        if (this.state.episodes) {
            //console.log("episodes: ", this.state.episodes)
            let episode= []
            if (this.props.episodeId === "null") {episode = this.getEpisodeToDisplay(this.state.episodes)[0]}
            else {episode = this.state.episodes.filter(e => e._id === this.props.episodeId)[0]};
        if (episode) {
            console.log("episode not null: ", episode)
            this.setState({ 
            episode: episode,
            questions: episode.questions,
            displayData: this.displayDataCalc(episode.records, episode.num_days, episode.expected_num_records/episode.num_days, episode.num_questions, episode.status)
            })
            } else {
                this.setState({noEpisodes: true})
             }
        }
        
    }

    async componentWillReceiveProps(nextProps) {
        console.log("display nextprops: ", nextProps)
        console.log("id: ", nextProps.episodeId)
        await this.setState({episodes: nextProps.patientData.episodes}) 

        if (this.state.episodes) {
            console.log("episodes: ", this.state.episodes)
            let episode= []
            if (nextProps.episodeId === "null") {episode = this.getEpisodeToDisplay(this.state.episodes)[0]}
                else {episode = this.state.episodes.filter(e => e._id === nextProps.episodeId)[0]};
            if (episode) {
                console.log("episode not null: ", episode)
                this.setState({ 
                episode: episode,
                questions: episode.questions,
                displayData: this.displayDataCalc(episode.records, episode.num_days, episode.expected_num_records/episode.num_days, episode.num_questions, episode.status)
                })
                } else {
                this.setState({noEpisodes: true})
            }
            
        }
        
    }


    state = {
        episode: [],
        episodes: [],
        noEpisodes: false,
        displayQuestion: 0,
        redirect: false,
    }

    getEpisodeToDisplay = (episodes) => {
        let episode = [];
        episode = episodes.filter(e => e.status === "awaiting review")
        if (episode.length > 0) {return episode}

        episode = episodes.filter(e => e.status === "active")
        if (episode.length > 0) {return episode}

        episode = episodes.filter(e => e.status === "actioned")
        if (episode.length > 0) {return episode}  

        episode = episodes.filter(e => e.status === "pending")
        if (episode.length > 0) {return episode}  

        return null
    }


    complianceCalc = (data) => {
        //console.log("completioncalc: ", data)
        let validCount = [];
        validCount = data.records.filter(record => record.valid === true)
        //console.log("validCount: ", validCount)
        return Math.round(validCount.length/data.expected_num_records*100)
    }

    displayDataCalc = (records, numDays, numTimes, numQuestions, status) => {
        //console.log("displaycalc Data: ", records, " ", " ", numDays, " ", numTimes, " ", numQuestions)

        if (status === "pending") {
            return [ "data pending" ]
        }

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
                        if (timesArrayIn[k].data.length > 0) {
                            questionDataSum[l] = questionDataSum[l] + timesArrayIn[k].data[j].question_answers[l] }
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

    handleFilterQuestions = (event, question) => {
        //console.log("question: ", question)
        this.setState({displayQuestion: question})
    }

    handleReportPrepClick= (event) => {
        //console.log("episodeId: ", this.state.episode._id)
        this.props.handleReportPrep(this.state.episode._id)
      }

    
    render () {

        const { classes } = this.props;
        const { episode, timeFrame, dateRange, status, questions, displayData, displayQuestion, redirect, patientId, episodeId } = this.state;

        const RenderDiaryCardDetails = () => {
            return (
                <div>
                    {episode && <div className={classes.detailsContainer}>
                        <div className={classes.bold}>
                            Diary Card Details
                        </div>
                        <Typography variant="body2">
                            <div className={classes.detailsText}>

                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Dates: </td>
                                            <td className={classes.rightColumn}>{`${ moment(episode.start_date).format("MMM Do YYYY")} to ${moment(episode.end_date).format("MMM Do YYYY") }`}</td>

                                        </tr>
                                        <tr>
                                            <td>Timeframe: </td>
                                            <td className={classes.rightColumn}> {`${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`}</td>
                                        
                                        </tr>
                                        <tr>
                                            <td>Current Status</td> 

                                            { episode.status === "active" && <td className={classes.rightColumn}>
                                               Curruntly Active 
                                                <span style={{ color: this.complianceCalc(episode) >= 90 ? "green" : this.complianceCalc(episode) >= 70 ? "#ffc200" : "red"}}> &nbsp;&nbsp;({this.complianceCalc(episode)}% compliance so far.)</span>
                                            </td> }

                                            { episode.status === "pending" && <td className={classes.rightColumn}>
                                               <span style={{color: "red"}}>Pending - awaiting first data.</span>
                                            </td> }

                                            { episode.status !== "pending" && episode.status !== "active" && <td className={classes.rightColumn}>
                                                {startCase(episode.status)}
                                                <span style={{ color: this.complianceCalc(episode) >= 90 ? "green" : this.complianceCalc(episode) >= 70 ? "#ffc200" : "red"}}> &nbsp;&nbsp;({this.complianceCalc(episode)}% compliance)</span>
                                            </td> }


                                            </tr>
                                    </tbody>
                                </table>

                            </div>
                        </Typography>
                    </div> } 
                </div>
            )
        }

        const RenderQuestion = () => {
            return (
                <div>
                    {questions && <div>
                        <span className={classes.bold}>
                            Question {displayQuestion+1}: {questions[displayQuestion].question}
                        </span>
                        <div className={classes.floatRight}>
                            {questions.map((q, index) => {
                                return (

                                    <span 
                                        className={classes.questionButtons}
                                        style={{backgroundColor: index === displayQuestion ? '#cccccc' : null}}
                                        onClick={event => this.handleFilterQuestions(event, index)}
                                        key={index}
                                        >
                                            {index+1}
                                    </span>
                                )
                            })}
                        </div>
                    </div> }
                </div>
            )
        }


        return (

            <div>

                {displayData && questions && episode ? null : <Callback />}
                       
                {displayData && questions && episode && <Paper className={classes.root}>

                    {episode.status === "pending" && <Grid container spacing={24}>
                        <Grid item xs={6}>

                            <Grid container >

                                <Grid item xs={8}>
                                     <RenderDiaryCardDetails />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button className={classes.btn} disabled={true} onClick={event => this.handleReportPrepClick(event)}>No report available</Button>
                                </Grid>

                            </Grid>

                            <div className={classes.graphContainer}>
                                This Diary card has not yet been started by the patient.
                            </div> 

                        </Grid>

                        <Grid item xs={6}>
                            <div className={classes.tableContainer}>

                            </div>
                        </Grid>
                    </Grid> }

                    {episode.status === "active" && <Grid container spacing={24}>
                        <Grid item xs={6}>

                            <Grid container >

                                <Grid item xs={9}>
                                     <RenderDiaryCardDetails />
                                </Grid>
                                <Grid item xs={3}>
                                    <Button className={classes.btn} disabled={true} onClick={event => this.handleReportPrepClick(event)}>No Report Available</Button>
                                </Grid>

                            </Grid>

                            <div className={classes.graphContainer}>
                                <RenderQuestion />
                                <ReportBarGraph 
                                    displayData={displayData}
                                    displayQuestion={displayQuestion}
                                    question={questions[displayQuestion]}
                                    height={230}
                                    responsive="true"
                                />
                            </div> 

                        </Grid> 

                        <Grid item xs={6}>
                            <div className={classes.tableContainer}>
                                <RenderQuestion />
                                <ReportTable 
                                    displayData={displayData}
                                    displayQuestion={displayQuestion}
                                    question={questions[displayQuestion]}
                                    numDays={this.state.episode.num_days}
                                />
                            </div>
                        </Grid>
                    </Grid> }

                    {episode.status !== "pending" && episode.status !== "active" && <Grid container spacing={24}>
                        <Grid item xs={6}>

                            <Grid container >

                                <Grid item xs={8}>
                                     <RenderDiaryCardDetails />
                                </Grid>
                                <Grid item xs={4}>
                                    <Button className={classes.btn} onClick={event => this.handleReportPrepClick(event)}>Prepare Report</Button>
                                </Grid>

                            </Grid>

                            <div className={classes.graphContainer}>
                                <RenderQuestion />
                                <ReportBarGraph 
                                    displayData={displayData}
                                    displayQuestion={displayQuestion}
                                    question={questions[displayQuestion]}
                                    height={230}
                                    responsive="true"
                                />
                            </div> 

                        </Grid>

                        <Grid item xs={6}>
                            <div className={classes.tableContainer}>
                                <RenderQuestion />
                                <ReportTable 
                                    displayData={displayData}
                                    displayQuestion={displayQuestion}
                                    question={questions[displayQuestion]}
                                    numDays={this.state.episode.num_days}
                                />
                            </div>
                        </Grid>
                </Grid> }

                </Paper> }
            </div>
        );
    }
}


ReportDisplayData.propTypes = {
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
  ReportDisplayData = connect(mapStateToProps)(ReportDisplayData)
  ReportDisplayData = withStyles(styles, { withTheme: true })(ReportDisplayData)
  export default ReportDisplayData