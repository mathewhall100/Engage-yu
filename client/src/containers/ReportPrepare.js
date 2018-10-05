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

import Callback from '../components/Callback';
import ReportTable from '../components/Tables/ReportTable';
import ReportBarGraph from '../components/Graphs/ReportBarGraph';
import ReportDiaryCardDetails from '../components/Textblocks/ReportDiaryCardDetails'

const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit*2,
      marginBottom: "20px",
      paddingLeft: "20px"
    },
    btnsContainer: {
        float: "right"
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

})


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


    render () {

        const { episode, questions, records, displayData } = this.state
        const { classes } = this.props    
        
        const RenderProviderDetails = () => {
        return (
            <div>
                <Typography variant="body2">
                        <div className={classes.detailsText}>
                            <table>
                                <tbody>

                                    <tr>
                                        <td>Requeting provider: </td>
                                        <td className={classes.rightColumn}>{ startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`) } </td>

                                    </tr>
                                    <tr>
                                        <td>Primary provider: </td>
                                        <td className={classes.rightColumn}> {startCase(`Dr. ${ this.props.patientInfo.primary_provider_name}`) } </td>
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

                {episode && records ? null : <Callback />}

                {episode && records && <Paper className={classes.root}>

                    <Grid container spacing={24}>
                    
                        <Grid item xs={6}> 
                             <ReportDiaryCardDetails episode={episode} /> 
                        </Grid>
                            
                        <Grid item xs={6}> 
                            <br />
                            <RenderProviderDetails />
                        </Grid>

                        <Grid item xs={6}>   

                            {questions.map((question, index) => {
                                //console.log("question: ", question)
                                console.log("displaydata: ", displayData)
                                return (
                                    <div>
                                    <hr />
                                        <ReportBarGraph 
                                                    displayData={displayData}
                                                    displayQuestion={index}
                                                    question={question}
                                                    height={230}
                                                    responsive="false"
                                                /> 
                                    </div>
                                )
                            }) }
                        </Grid>      
                        
                        <Grid item xs={6}> 
                        </Grid>  
                             
                    </Grid>

                    <br />

                    <div className={classes.btnsContainer}>
                        <Tooltip title ="Email report to provider and/or patient" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks}  onClick = {event => this.handleClickEmail(event)}>print</span>
                        </Tooltip>
                        <Tooltip title ="Send report to patients electronic health record" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} onClick = {event => this.handleClickEHR(event)}>email</span>
                        </Tooltip>
                        <Tooltip title ="Send report to patients electronic health record" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} onClick = {event => this.handleClickEHR(event)}>send to EHR</span>
                        </Tooltip>
                        <Tooltip title ="Close page" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} onClick = {event => this.handleClickBack(event)}>Close</span>
                        </Tooltip>
                    </div>

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