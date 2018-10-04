import React, { Component } from 'react';
import { connect } from 'react-redux';
import {  times, startCase } from 'lodash';
import moment from 'moment';

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import {BarChart, Bar, XAxis, YAxis, Tooltip as rechartTooltip, Legend, ResponsiveContainer } from 'recharts';



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
    }, 
    detailsText: {
        marginTop: "15px"
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
        height: "420px",
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
        // '&:disabled': {
        //     color: 'grey'
        // },
        hover: {},
        disabled: {},
      }
  });

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

class ReportDisplayData extends Component {

    async componentWillReceiveProps(nextProps) {
        console.log("display nextprops: ", nextProps)
        await this.setState({episodes: nextProps.patientData.episodes}) 
        if (this.state.episodes) {
            //console.log("episodes: ", this.state.episodes);
            //console.log(nextProps.episode);
            const episodeArray = this.state.episodes.filter(e => e._id === nextProps.episode);
            const episode = episodeArray[0];
            this.setState({ 
                episode: episode,
                dateRange: `${ moment(episode.start_date).format("MMM Do YYYY")} to ${moment(episode.end_date).format("MMM Do YYYY") }`,
                timeFrame: `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                status: episode.status,
                compliance: this.complianceCalc(episode),
                questions: episode.questions,
                displayData: this.displayDataCalc(episode.records, episode.num_days, episode.expected_num_records/episode.num_days, episode.num_questions)
            })
        }

       console.log("Episode to view: ", this.state.episode)
       console.log("DisplayData: ", this.state.displayData)
       console.log("Questions: ", this.state.questions)
    }


    state = {
        episode: [],
        episodes: {},
        dateRange: "",
        timeFrame: "",
        compliance: "",
        navLinksSwitch: "",

        displayQuestion: 0,
        hideAllQuestions: true
    }


    complianceCalc = (data) => {
        //console.log("completioncalc: ", data)
        let validCount = [];
        validCount = data.records.filter(record => record.valid === true)
        //console.log("validCount: ", validCount)
        return Math.round(validCount.length/data.expected_num_records*100)
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

    tableCellOpacity = (answer) => {
        if (answer === 0) {return 0;}
        const opacity = (Math.round((0.5 + ( (answer/this.state.episode.num_days) /2)) * 10))/10
        //console.log(opacity)
        return opacity;
    }

    tableAnswer = (answer) => {
        if (answer === 0) {return 0;}
        return Math.round(((answer)/(this.state.episode.num_days))*100)
    }

    handleFilterQuestions = (event, question) => {
        //console.log("question: ", question)
        this.setState({displayQuestion: question})
    }

    handleClickAllQuestions = (event) => {
        console.log("All Qustions clicked")
        this.setState({
            hideAllQuestions: this.state.hideAllQuestions ? false : true,
            displayQuestion: 0
        })
    }
    
    handleClickLinks = (event, link) => {
        //console.log("link: ", link)
    }

    
    render () {

        const { classes } = this.props;
        const { episode, timeFrame, dateRange, status, compliance, questions, displayData, displayQuestion, hideAllQuestions } = this.state;

        const RenderDiaryCardDetails = () => {
            return (
                <div className={classes.detailsContainer}>
                <div className={classes.bold}>
                    Diary Card Details
                </div>
                <Typography variant="body2">
                    <div className={classes.detailsText}>

                        <table>
                            <tbody>
                                <tr>
                                    <td>Dates: </td>
                                    <td className={classes.rightColumn}>{dateRange}</td>

                                </tr>
                                <tr>
                                    <td>Timeframe: </td>
                                    <td className={classes.rightColumn}>{timeFrame}</td>
                                
                                </tr>
                                <tr>
                                    <td>Current Status</td> 
                                    <td className={classes.rightColumn}>
                                        {status}
                                        <span style={{ color: compliance > 90 ? "green" : compliance > 75 ? "#ffc200" : "red"}}> &nbsp;&nbsp;({compliance}% compliance)</span>
                                    </td> 
                                    </tr>
                            </tbody>
                        </table>

                    </div>
                </Typography>
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


                            {hideAllQuestions && <div className={classes.floatRight}>
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
                            </div> }

                    </div> }
                </div>
            )
        }

        const RenderGraph = () => {
            return (
                <div>
                    {displayData && <ResponsiveContainer width="100%" height={230}>
                        
                        <BarChart data={this.displayGraphCalc(displayData, displayQuestion)} margin={{top: 20, right: 30, left: 20, bottom: 30}}>
                            
                            <XAxis dataKey="time" angle={-45} textAnchor="end"/>
                            <YAxis hide={true}/>
                            <rechartTooltip/>
                            <Legend layout='vertical' align='right' verticalAlign='top' 
                                payload={[
                                    { id: 'ans1', value: questions[displayQuestion].answers[0], type: 'square', color: 'green'},
                                    { id: 'ans2', value: questions[displayQuestion].answers[1], type: 'square', color: '#ffc200'},
                                    { id: 'ans3', value: questions[displayQuestion].answers[2], type: 'square', color: 'orange'},
                                    { id: 'ans4', value: questions[displayQuestion].answers[3], type: 'square', color: 'red'},
                                    { id: 'ans5', value: questions[displayQuestion].answers[4], type: 'square', color: 'grey'},
                                    ]} 
                                    wrapperStyle={{
                                    paddingLeft: "15px",
                                    lineHeight: "20px",
                                    fontSize: "14px",
                                    fontWeight: 600,
                                    color: "#333333"
                                }}
                            />
                            <Bar dataKey="ans5" stackId="a" fill="grey" />
                            <Bar dataKey="ans4" stackId="a" fill="red" />
                            <Bar dataKey="ans3" stackId="a" fill="orange" />
                            <Bar dataKey="ans2" stackId="a" fill="#ffc200" />
                            <Bar dataKey="ans1" stackId="a" fill="green" />
                        </BarChart>

                    </ResponsiveContainer> }
                </div>
            )
        }

        const renderLegend = () => {
            return (
            <ul>
                {
                questions[displayQuestion].answers.map((answer, index) => (
                    <li style={{listStyle: "none"}} key={`item-${index}`}>{answer}</li>
                ))
                }
            </ul>
            );
        }

        const RenderTable = () => {
            return (
                <div>
                     {displayData &&  <Table style={{ width: '90%'}}>    
                        <TableHead >
                            <TableRow>

                                <CustomTableCell style={{width: "20%"}}>Time</CustomTableCell>

                                {questions[displayQuestion].answers.map((answer, index) => {
                                    return (
                                        <CustomTableCell style={{width: "16%"}} key={index}>
                                            {answer}
                                        </CustomTableCell>
                                    )
                                })}
                                
                            </TableRow>
                        </TableHead>  

                        <TableBody>
                            
                            <TableRow style={{height: "20px"}}></TableRow>

                            {displayData.map((d, index) => {
                                return (

                                    <TableRow key={index} style={{height: "40px"}}>
                                
                                        <CustomTableCell>
                                            {`${d.time.slice(0, 2)}:${d.time.slice(-2)}`}
                                        </CustomTableCell>
                                    
                                        {d.questions[displayQuestion].answers.map((answer, i)=> {
                                            return (
                                                <CustomTableCell key={i}
                                                    style={{
                                                        fontWeight: "bold",
                                                        textAlign: "center",
                                                        fontSize: '13px',
                                                        opacity: this.tableCellOpacity(answer),
                                                        backgroundColor: i === 0 ? "green" : i === 1 ? "#ffc200" : i === 2 ? "orange" : i === 3 ? "red" : "grey",

                                                    }}>
                                                    
                                                    ({this.tableAnswer(answer)}%)
                                                    
                                                </CustomTableCell>
                                            ) 
                                        })}
                    
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                     </Table> }     
                </div>
            )
        }

        return (

            <div>

                {displayData && questions ? null : <div>
                        Loading ... 
                </div> }

                {displayData && questions &&  <Paper className={classes.root}>

                    <Grid container spacing={24}>
                        <Grid item xs={6}>

                            <RenderDiaryCardDetails />

                            <div className={classes.graphContainer}>
                                <RenderQuestion />
                                <RenderGraph />
                            </div>

                        </Grid>

                        <Grid item xs={6}>
                        
                            <div className={classes.tableContainer}>
                                <RenderQuestion />
                                <RenderTable />
                            </div>

                        </Grid>
                    </Grid>

                    {/* <div className={classes.linksContainer}>
                            
                        <Tooltip title ="Review all questions in one view" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} style={{color: this.state.navLinksSwitch === "all" ? "#000000" : "#888888"}} onClick = {event => this.handleClickAllQuestions(event)}>All questions</span>
                        </Tooltip>

                        <Tooltip title ="Compare this diary card data with a previous diary " classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} style={{color: this.state.navLinksSwitch === "comparePrevious" ? "#000000" : "#888888"}} onClick = {event => this.handleClickLinks(event, "comparePrevious")}>Compare with previous</span>
                        </Tooltip>

                        <Tooltip title ="Compare this diary card data with a later diary card if it exists" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} style={{color: this.state.navLinksSwitch === "compareNext" ? "#000000" : "#888888"}} onClick = {event => this.handleClickLinks(event, "compareNext")}>Compare with next</span>
                        </Tooltip>

                    </div> */}

                </Paper> }
            </div>
        );
    }
}


ReportDisplayData.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,

        user: state.user
    }
  };
  ReportDisplayData = connect(mapStateToProps)(ReportDisplayData)
  ReportDisplayData = withStyles(styles, { withTheme: true })(ReportDisplayData)
  export default ReportDisplayData