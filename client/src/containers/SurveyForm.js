import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { reset, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import { Input } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Slider from '@material-ui/lab/Slider';

import SurveyRadio from '../components/Forms/SurveyRadio.js';
import SurveyStartDate from '../components/Forms/SurveyStartDatePicker.js';
import Panel from '../components/Panels/SurveyExpansionPanel.js';

// import { fetchSurveyQuestions, fetchSurveyPatientDetails } from '../actions/index.js';
import patient_dataAPI from "../utils/patient_data.js";
import activeAPI from "../utils/active.js";
import SurveySaveSuccessDialog from '../components/Dialogs/SurveySaveSuccessDialog.js'
import SurveySaveFailedDialog from '../components/Dialogs/SurveySaveFailedDialog.js'

//Form styles
const styles = theme => ({

    formWrapper: {
        marginTop: "20px",
        marginRight: "40px"
    },
    basicSetttingsContainer: {
    },
    radiosContainer: {
        width: "100%",
    },
    sliderContainer: {
        marginRight: "40px",
        maxWidth: "760px"
    },
    advancedSettingsWrapper: {
        marginTop: "20px",
        marginRight: "40px"
    },
    advancedSettingsContainer: {
        margin: "20px",
    },
    closeBtn: {
        float: "right",
    },
    defaultQuestionContainer: {
        maxWidth: "760px", 
        marginRight: "40px",
    },
    customQuestionsWrapper: {
    },

    // Slider styles
    slider1: {
        width: "102%",
        position: "relative",
        top: 17,
        left: -8,
    },
    slider2: {
        width: "102%",
        position: "relative",
        top: -17,
        left: -8,
    },
    sliderHint1: {
        position: "relative",
        top: 18
    },
    sliderHint2: {
        position: "relative",
        top: -18,
        marginRight: -10,
    },
    sliderTable: {
        width: "100%",
        height: 60,
        tableLayout: "fixed",
        borderCollapse: "collapse",
        textAlign: "center",
        fontSize: 12,
    },
    sliderTableCellBorder: {
        borderleft: "1px solid rgb(0, 100, 0, 0.5)",
        borderRight: "1px solid rgb(0, 100, 0, 0.5)", 
        borderTop: "2px solid #dddddd"
    },
    sliderTableNumeralSize: {
        fontSize: 16,
    },
  
    // Button styles
    submitBtn: {
        marginRight: 20,
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    cancelBtn: {
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    }, 
    openLink: {
       float: "right",
       marginRight: "20px",
       marginTop: "5px"
    },
   
}); 

// styles for enhanced toolbar component
const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
      backgroundColor: "#dddddd"
    },
    spacer: {
      flex: '1 1 100%',
    },
    title: {
      flex: '0 0 auto',
    },
    closeBox: {
      float: "right",
    }
  });

// styles for display table component
const tableStyles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3
    },
    customQuestionsContainer: {
      marginRight: "40px"
    },
    table: {
      width: "100%",
      maxWidth: "800px",
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });

// ----------------------------------------------------------------
// --------------- SurveyForm2 component --------------------------
// ----------------------------------------------------------------

class SurveyForm extends Component { 

    componentWillMount() {
        this.handleInitialize();
    }

    componentDidMount() {
            //this.props.fetchSurveyQuestions();
            //this.props.fetchSurveyPatientDetails("5b844945d8dc5ce848cd28a3");
    }

    componentWillReceiveProps(nextProps) {
        //console.log("CWRP: ", nextProps)
        //console.log("SelQ: ", this.state.selectedQuestions)
        if (this.state.selectedQuestions.length === 0) {
            nextProps.defaultQuestion.map(question => 
                this.setState({ 
                    selectedQuestions: [question._id], 
                    selectedId: question._id, 
                    defaultId: question._id
                })
            );
        }
        this.setState({patientDataId: nextProps.patientData._id})
    }


    state = {
        advancedSettings: false, 
        customQuestions: false,

        sliderValue1: 0,
        sliderValue2: 20,
        sliderTimesAMPM: ["6am", "7am", "8am", "9am", "10am", "11am", "12pm", "1pm", "2pm", "3pm", "4pm", "5pm", "6pm", "7pm", "8pm", "9pm", "10pm", "11pm", "12am", "1am", "2am"],
        sliderTimes24HR: ["0600", "0700", "0800", "0900", "1000", "1100", "1200", "1300", "1400", "1500", "1600", "1700", "1800", "1900", "2000", "2100", "2200", "2300", "2400", "0100", "0200"],
        sliderTouched: null,

        selectedQuestions: [],
        page: 0,
        rowsPerPage: 5,
        numSelected: 1,
        selectedId: "",
        defaultId: "",

        patientDataId: "",

        surveySaveSuccess: false,
        surveySaveFailed: false,
    }


    // Set initial states of form elements
    handleInitialize() {
        const initData = {
          "startDate": "nowOn",
          "duration": "3",
          "frequency": "60",
          "timeMargin" : "15",
          "reminder": "5",
        };
        this.props.initialize(initData);
    }


    createRecordsArray = (startDate, startTime, duration, frequency, entriesPerDay) => {

        const dateStart = moment(startDate).hour(startTime.slice(0 ,2)).minute(startTime.slice(-2)).second(0);
        let datepoint = dateStart;
        let timepoint = "";
        let recordsArray = [];
        let index = 0;
        let addDay = 0;

        for (let day=0; day < duration; day++) {
            addDay = day === 0 ? 0 : 1  
            datepoint = moment(datepoint.add(addDay, "d"))
            datepoint = moment(datepoint).hour(startTime.slice(0 ,2)).minute(startTime.slice(-2)).second(0);

            for (let time=0; time < entriesPerDay; time++) {
                time ? 
                    datepoint = frequency === "30" ? moment(datepoint).add(30, 'm') : moment(datepoint).add(60, 'm')
                    :
                    null
                timepoint = `${moment(datepoint).format("HH")}${moment(datepoint).format("mm")}`

                !(frequency === "30" && time === entriesPerDay - 1) ? (
                    recordsArray.push(
                        {
                            record_number: index,
                            valid: false,
                            day: day,
                            time: timepoint,
                            scheduled_datetime: moment(datepoint), 
                        }
                    )
                ) : null

                index++
            }
        };

        return recordsArray;

    };


    createSurveyQuestions = (selectedQuestions) => {

        let allQuestions, filteredQuestions, surveyQuestions = [];

        allQuestions = [this.props.defaultQuestion[0], ...this.props.customQuestions]

        filteredQuestions = allQuestions.filter(question => {
            return (this.state.selectedQuestions.indexOf(question._id) > -1)
        })

        filteredQuestions.map((question, index) => {
            surveyQuestions.push(
                {   question_number: index,
                    question: question.question,
                    answers: question.answers,
                    hints: question.hints
                }
            )
        })

        return surveyQuestions

    };


    submit(values) {

        const episodeNumber = this.props.patientData.episodes.length;
        const startDate = values.startDate === "date" ? moment(values.datePick).hour(0).minute(0).second(0) : moment();
        const endDate = moment(startDate).add(values.duration, 'd')
        const startTime = this.state.sliderTimes24HR[this.state.sliderValue1];
        const endTime = this.state.sliderTimes24HR[this.state.sliderValue2];
        const hoursPerDay = parseInt(endTime) > parseInt(startTime) ? (parseInt(endTime, 10)-parseInt(startTime, 10))/100 + 1 : ((parseInt(endTime, 10)+2400)-parseInt(startTime, 10))/100 + 1; 
        const entriesPerDay = parseInt(hoursPerDay, 10)/(parseInt(values.frequency, 10)/60);
        const numRecords = values.duration*entriesPerDay;
        const remindStatus = values.reminder === "off" ? "off" : "on";
        const remindMinsBefore = values.reminder !== "off" ? values.reminder : "";
        const surveyQuestions = this.createSurveyQuestions(this.state.selectedQuestions);
        const records = this.createRecordsArray(startDate, startTime, values.duration, values.frequency, entriesPerDay);
        const reportTo = [this.props.patientInfo.primary_provider_id]

        const surveyObj = {
            episode_number: episodeNumber,
            requesting_provider_ref: '5b844946d8dc5ce848cd28a4',
            requesting_provider_id: '5b844946d8dc5ce848cd28a4',
            requesting_provider_firstname: "Mathew",
            requesting_provider_lastname: "Hall",
            date_requested: moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ'),

            start_date: startDate,
            end_date: endDate,
            num_days: parseInt(values.duration),
            start_time: startTime,
            end_time: endTime,
            interval_mins: parseInt(values.frequency),
            margin_mins: parseInt(values.timeMargin),
            remind_status: remindStatus,
            remind_mins_before: remindMinsBefore,
            num_questions: this.state.selectedQuestions.length,
            questions: surveyQuestions,

            expected_num_records: numRecords,
            notes: "",
            records:  records,

            active_record_ref: "000000000000000000000000",
            active_record_id: "000000000000000000000000",

            status: "pending",
            report_to: reportTo
        };
        
        //onsole.log("obj ", surveyObj)
        //console.log("id: ", this.state.patientDataId)

        patient_dataAPI.newEpisode(this.state.patientDataId, surveyObj)
        .then(res => {
            //console.log("res.data: ", res.data)

            const activeObj = {

                patient_info_ref: this.props.patientInfo._id,
                patient_info_id: this.props.patientInfo._id,
                firstname: this.props.patientInfo.firstname,
                lastname: this.props.patientInfo.lastname,
                hospital_id: this.props.patientInfo.hospital_id,
                patient_data_ref: this.props.patientInfo.patient_data_id,
                patient_data_id:  this.props.patientInfo.patient_data_id,
                episode_number: episodeNumber,
                episode_id: res.data._id,
                date_created: moment(),
            
                requesting_provider_ref: '5b844946d8dc5ce848cd28a4',
                requesting_provider_id: '5b844946d8dc5ce848cd28a4',
                requesting_provider_name: "Mathew Hall",

                primary_provider_ref: this.props.patientInfo.primary_provider_ref._id,
                primary_provider_id: this.props.patientInfo.primary_provider_id,
                primary_provider_name: this.props.patientInfo.primary_provider_name,
                
                provider_group_ref: this.props.patientInfo.provider_group_ref,
                provider_group_id: this.props.patientInfo.provider_group_id,
                provider_group_name: this.props.patientInfo.provider_group_name,
            
                start_date: startDate,
                start_time: startTime,
                end_date: endDate,
                end_time: endTime,
                num_records: numRecords,
                entries_per_day: entriesPerDay,
                num_entries: 0,
            
                status: "pending"
            };
            
            //console.log("activeobj: ", activeObj)

            activeAPI.create(activeObj)
            .then(result => {
                console.log("result.data: ", result.data)

                patient_dataAPI.insertRef(result.data.patient_data_id, {
                    episode_id: result.data.episode_id,
                    active_record_ref: result.data._id,
                    active_record_id: result.data._id
                })
                .then(res => {
                    // console.log("res.data: " + JSON.stringify(res.data, null, 2 ))

                    this.setState ({surveySaveSuccess: true})   // save success dialog
                
                })
                .catch(err => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(err);

                    this.setState({surveySaveFailed: true}); // save success dialog
                })
            })
        })
     
    };


    // Open discretionary panels

    openCustomQuestions(toggle) {
        this.setState({customQuestions: toggle})
    };

    openAdvancedSettings(toggle) {
        this.setState({advancedSettings: toggle})
    };


    // Slider controls

    handleSliderChange1 = (event, sliderValue1) => {
        this.setState({ sliderValue1: sliderValue1 > (this.state.sliderValue2-1) ? this.state.sliderValue2 - 1 : sliderValue1 });
        this.setState({ sliderTouched: 1})
    };
    
      handleSliderChange2 = (event, sliderValue2) => {
        this.setState({ sliderValue2: sliderValue2 < (this.state.sliderValue1 + 1) ? this.state.sliderValue1 + 1 : sliderValue2 });
        this.setState({ sliderTouched: 1})
    };
      

    // Custom Question table controls

    handleClick = (event, id) => {
        const { selectedQuestions, numSelected } = this.state;
        const selectedIndex = selectedQuestions.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
          newSelected = newSelected.concat(selectedQuestions, id);
        } else if (selectedIndex === 0) {
          newSelected = newSelected.concat(selectedQuestions.slice(1));
        } else if (selectedIndex === selectedQuestions.length - 1) {
          newSelected = newSelected.concat(selectedQuestions.slice(0, -1));
        } else if (selectedIndex > 0) {
          newSelected = newSelected.concat(
            selectedQuestions.slice(0, selectedIndex),
            selectedQuestions.slice(selectedIndex + 1),
          );   
        }
        console.log(this.state.selectedQuestions)
        this.setState({ selectedQuestions: newSelected.length === 0 ? [this.props.defaultQuestion[0]._id] : newSelected });

    };
    
    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id =>  
        this.state.selectedQuestions.indexOf(id) !== -1;

    
    // Render component
    render () {
        
        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { sliderValue1, sliderValue2, sliderTouched } = this.state;
        const { rowsPerPage, page, numSelected, selectedQuestions, defaultId  } = this.state;

        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.props.customQuestions.length - page * rowsPerPage)

        return (

            <div>

                {this.state.surveySaveSuccess && <SurveySaveSuccessDialog 
                                                        name = {`${this.props.patientInfo.firstname} ${this.props.patientInfo.lastname}`}
                                                     />}

                {this.state.surveySaveFailed && <SurveySaveFailedDialog
                                                     />} 


                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                    <Paper className={classes.formWrapper}>

                        <Toolbar style={{width: "100%", backgroundColor: "#dddddd"}}>
                            <div className={classes.title}>
                                <Typography variant="title">
                                    Basic Settings
                                </Typography>
                            </div> 
                        </Toolbar>
                    
                        <div style={{marginLeft: "20px"}} className={classes.basicSettingsContainer}>
                            <Grid container spacing={8}>

                                <Grid item xs={12}>
                                    <div className={classes.radiosContainer}>
                                        <SurveyStartDate 
                                            title="Start Date"
                                            name="startDate"
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    <div className={classes.radiosContainer}>
                                        <SurveyRadio
                                            title="Duration"
                                            name="duration" 
                                            items={[
                                                {value: "1", label: "1 day" },
                                                {value: "2", label: "2 days" },
                                                {value: "3", label: "3 days" },
                                                {value: "5", label: "5 days" },
                                                {value: "7", label: "7 days" },
                                                {value: "10", label: "10 days" },
                                                {value: "14", label: "14 days" }
                                            ]}
                                        />
                                    </div>
                                </Grid>
                            
                                <Grid item xs={12}>
                                    <div className={classes.sliderContainer} >
        
                                        <div>
                                            <Typography className={classes.sliderHint1} align='left' variant="subheading" gutterBottom id="label">Select Start Time (blue dot)</Typography>
                                            <Slider className={classes.slider1} name="slider1" value={sliderValue1} reverse min={20} max={0} step={1} onChange={this.handleSliderChange1} />
                                        </div>

                                        <table className={classes.sliderTable}>
                                            <tbody>
                                                <tr>
                                                {this.state.sliderTimesAMPM.map((time, index) => {
                                                    return(
                                                        <td key={index}
                                                            className={classes.sliderTableCellBorder} 
                                                            style={{backgroundColor:  this.state.sliderValue1 > index || this.state.sliderValue2 < index ? "#eeeeee" : "#4CAF50"}}
                                                        > 
                                                            <span className={classes.sliderTableNumeralSize}>{time.slice(0, time.length-2)}</span>
                                                            <br />
                                                            {time.slice(-2)}
                                                        </td>
                                                    )
                                                })}
                                                </tr> 
                                            </tbody>
                                        </table>

                                        <div>
                                            <Slider className={classes.slider2} name="slider2" value={sliderValue2} min={0} max={20} step={1} onChange={this.handleSliderChange2} />
                                            <Typography className={classes.sliderHint2} id="label" variant="subheading" gutterBottom align="right" >Select End Time (blue dot) </Typography>
                                        </div>
                                    </div>
                                
                                </Grid>

                                <Grid item xs={12}>
                                    <div className={classes.radiosContainer}>
                                        <Typography variant="subheading">
                                            Default Question: 
                                        </Typography>
                                        
                                        <br />

                                        {this.props.defaultQuestion.map(question =>
                                            <div key={question._id} className={classes.defaultQuestionContainer}>
                                                <Panel 
                                                    question = {question.question}
                                                    answers = {question.answers}
                                                    addedBy = "Default question"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                        <br />
                    </Paper>

                    <br />

                    {this.state.customQuestions && 
                        <Paper style={{marginRight: "40px"}} className={classes.customQuestionsWrapper}>

                            <Toolbar style={{width: "100%", backgroundColor: "#dddddd"}} className={classes.root} >

                                <div className={classes.title}>
                                    <Typography variant="title" id="tableTitle">
                                    Custom Questions
                                    </Typography>
                                </div>

                                {selectedQuestions.length > 1 ? (
                                    <Typography variant="subheading">
                                    &nbsp;&nbsp;({selectedQuestions.length} selected)
                                    </Typography>
                                ) : ""}

                                {selectedQuestions.length === 1 && selectedQuestions[0] === defaultId ? (
                                    <Typography variant="subheading">
                                    &nbsp;&nbsp;(Default question only selected)
                                    </Typography>
                                ) : ""}

                                {selectedQuestions.length === 1 && selectedQuestions[0] !== defaultId ? (
                                    <Typography variant="subheading">
                                        &nbsp;&nbsp;(1 custom question selected)
                                    </Typography>
                                ) : ""}

                                <div style={{ flex: 1 }}>
                                        <Button  style={{float: "right"}} className={classes.closeBox}  onClick={() =>  { this.openCustomQuestions(false)} }><u>Close</u></Button>
                                </div>
                            </Toolbar>

                            <div className={classes.tableWrapper}>
                                <Table className={classes.table} >

                                    <br />
                                    <TableBody >
                                        {this.props.defaultQuestion
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((question, index) => {
                                                const isSelected = this.isSelected(question._id);
                                                return (
                                                    <TableRow 
                                                        role="checkbox"
                                                        aria-checked={isSelected}
                                                        tabIndex={-1}
                                                        key={index}
                                                    >
                                                        <TableCell padding="checkbox" style={{border: 'none', backgroundColor: "#ffffff"}}>
                                                            <Checkbox checked={isSelected || (selectedQuestions.length === 0 && index == 0)} onClick={event => this.handleClick(event, question._id)}/>
                                                        </TableCell>
                                
                                                        <TableCell style={{border: 'none', backgroundColor: "#ffffff"}}>
                                                            <div>
                                                                <Panel 
                                                                    question = {question.question}
                                                                    answers = {question.answers}
                                                                    addedBy = {index === 0 ? `Default Question` : `Dr. ${question.added_by_name} on ${question.date_added.slice(0,10)}`}
                                                                />
                                                            </div>
                                                        </TableCell>

                                                    </TableRow>
                                                ); 
                                            })
                                        }

                                        {this.props.customQuestions
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((question, index) => {
                                                const isSelected = this.isSelected(question._id);
                                                return (
                                                    <TableRow 
                                                        role="checkbox"
                                                        aria-checked={isSelected}
                                                        tabIndex={-1}
                                                        key={index}
                                                    >
                                                        <TableCell padding="checkbox" style={{border: 'none', backgroundColor: "#ffffff"}}>
                                                            <Checkbox checked={isSelected} onClick={event => this.handleClick(event, question._id)}/>
                                                        </TableCell>
                                
                                                        <TableCell style={{border: 'none', backgroundColor: "#ffffff"}}>
                                                            <Panel 
                                                                question = {question.question}
                                                                answers = {question.answers}
                                                                addedBy = {index === 0 ? `Default Question` : `Dr. ${question.added_by_name} on ${question.date_added.slice(0,10)}`}
                                                            />
                                                        
                                                        </TableCell>

                                                    </TableRow>
                                                ); 
                                            })
                                        }

                                    </TableBody>
                                </Table>
                            </div>

                            <TablePagination
                                component="div"
                                count={this.props.customQuestions.length + 1}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                backIconButtonProps={{
                                'aria-label': 'Previous Page',
                                }}
                                nextIconButtonProps={{
                                'aria-label': 'Next Page',
                                }}
                                onChangePage={this.handleChangePage}
                                onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            /> 

                        </Paper>
                    }

                    {this.state.advancedSettings && 
                        <Paper className={classes.advancedSettingsWrapper}>
                    
                            <Toolbar style={{width: "100%", backgroundColor: "#dddddd"}}>
                                <div>
                                    <Typography variant="title">
                                        Advanced settings
                                    </Typography>
                                </div> 
                                <div style={{ flex: 1 }}>
                                    <Button className={classes.closeBtn} onClick={() => {this.openAdvancedSettings(false)}}><u>Close</u></Button>
                                </div>
                            </Toolbar>
                        
                            <div className={classes.advancedSettingsContainer}>
                                <Grid container spacing={8}>
                                
                                    <Grid item xs={12}>
                                        <SurveyRadio
                                            title="Frequency of diary entries"
                                            name="frequency"
                                            items={[
                                                {value: "30", label: "30 mins intervals" },
                                                {value: "60", label: "60 mins intervals" }
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <SurveyRadio
                                            title="Time margin for diary entry"
                                            name="timeMargin"
                                            items={[
                                                {value: "5", label: "5 mins" },
                                                {value: "10", label: "10 mins" },
                                                {value: "15", label: "15 mins" },
                                                {value: "20", label: "20 mins" },
                                                {value: "30", label: "30 mins" },
                                            ]}
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <SurveyRadio
                                            title="Set reminder"
                                            name="reminder"
                                            items={[
                                                {value: "5", label: "5 mins before" },
                                                {value: "10", label: "10 mins before" },
                                                {value: "15", label: "15 mins before" },
                                                {value: "off", label: "off" },
                                            ]}
                                        />
                                    </Grid>
                                </Grid>
                            </div>
            
                            <br />

                        </Paper>
                    } 

                    <Grid container spacing={8}>

                        <Grid item xs={12}>
                            <br />
                            <Button type="submit" disabled={submitting || (sliderValue1 === 0 && sliderValue2 === 20)} className={classes.submitBtn}>Create diary card</Button>
                            <Link to='/admin' style={{textDecoration: "none"}}><Button className={classes.cancelBtn}>Cancel</Button></Link>

                            
                            {!this.state.openAdvancedSettings && <Button className={classes.openLink} onClick={() => {this.openAdvancedSettings(true)}}><u>Advanced settings</u></Button>}
                            {!this.state.openCustomQuestions && <Button className={classes.openLink} onClick={() => {this.openCustomQuestions(true)}}><u>Custom questions</u></Button>} 
                        </Grid> 
                        
                    </Grid>

                    <br /><br />
                </form>
            </div>
        );
    }
};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    if (values.startDate === "date" && !values.datePick) {
        errors.datePick = "Please enter a valid date";   // message to be displayed if invalid
    }

    // If errors is empty, then form good to submit
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;
}


// const mapDispatchToProps = (dispatch) => {
//     return bindActionCreators({ fetchSurveyQuestions, fetchSurveyPatientDetails }, dispatch);
// }

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        defaultQuestion: state.surveyQuestions.surveyDefaultQuestion,
        customQuestions: state.surveyQuestions.surveyCustomQuestions,
        patientInfo: state.surveyPatient.surveyPatientInfo,
        patientData: state.surveyPatient.surveyPatientData
    }
};
  
const formData = {
    form: 'NewSurveyForm',
    validate
}
SurveyForm = connect(mapStateToProps)(SurveyForm)
SurveyForm = reduxForm(formData)(SurveyForm)
SurveyForm = withStyles(styles, { withTheme: true })(SurveyForm)
export default SurveyForm
    

    
