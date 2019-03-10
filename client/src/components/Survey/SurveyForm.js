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
import Table from '@material-ui/core/Table';
import FormLabel from '@material-ui/core/FormLabel';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import SurveySlider from './SurveySlider';
import SurveyRadio from './SurveyRadio';
import SurveyDatePicker from './SurveyDatePicker';
import CheckboxPanel from '../Panels/CheckboxPanel.js';
import patient_dataAPI from "../../utils/patient_data.js";
import { durations, startDates, createRecordsArray, createSurveyQuestions} from './SurveyLogic'
import SurveySaveSuccessDialog from '../Dialogs/SurveySaveSuccessDialog.js'
import SurveySaveFailedDialog from '../Dialogs/SurveySaveFailedDialog.js'
import SimplePanel from '../Panels/SimplePanel';
import HrStyled from '../commons/hrStyled'
import ActionBtn from '../Buttons/actionBtn'
import ActionLnk from '../Buttons/actionLnk'



//Form styles
const styles = theme => ({

    openLink: {
       float: "right",
       marginTop: "12px"
    },
   
}); 

// styles for display table component
const tableStyles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3
    },
    table: {
      width: "100%",
      maxWidth: "800px",
    },
    tableWrapper: {
      overflowX: 'auto',
    },
  });


// --------------- SurveyForm component --------------------------
class SurveyForm extends Component { 

    componentWillMount() {
        this.handleInitialize()
    }

    state = {
        selectedQuestions: [],
        page: 0,
        rowsPerPage: 5,
        success: false,
        failed: false,
    }

    // Set initial states of form elements
    handleInitialize() {
        const initData = {
          "startdate": "tomorrow",
          "duration": "3",
          "frequency": "60",
          "timeMargin" : "15",
          "reminder": "5",
        };
        this.props.initialize(initData);
    }

    submit(values) {
        console.log("values: ", values)

        const { sliderValue1, sliderValue2, sliderTimes24HR } = this.state
        const { patientInfo } = this.props

        const startDate = values.startDate === "date" ? moment(values.datePick).hour(0).minute(0).second(0) : moment();
        const endDate = moment(startDate).add(values.duration, 'd')
        const startTime = sliderTimes24HR[sliderValue1];
        const endTime = sliderTimes24HR[sliderValue2];
        const hoursPerDay = parseInt(endTime) > parseInt(startTime) ? (parseInt(endTime, 10)-parseInt(startTime, 10))/100 + 1 : ((parseInt(endTime, 10)+2400)-parseInt(startTime, 10))/100 + 1; 
        const entriesPerDay = parseInt(hoursPerDay, 10)/(parseInt(values.frequency, 10)/60);
        const remindStatus = values.reminder === "off" ? "off" : "on";
        const remindMinsBefore = values.reminder !== "off" ? values.reminder : "";

        const surveyObj = {
            episode_number: this.props.patientData.episodes.length,
            date_requested: new Date(),
            requesting_provider_ref: localStorage.getItem("provider_id"),
            requesting_provider_id: localStorage.getItem("provider_id"),
            requesting_provider_firstname: localStorage.getItem("provider_firstname"),
            requesting_provider_lastname: localStorage.getItem("provider_lastname"),
            start_date: startDate,
            end_date: endDate,
            num_days: parseInt(values.duration),
            start_time: startTime,
            end_time: endTime,
            interval_mins: parseInt(values.frequency),
            margin_mins: parseInt(values.timeMargin),
            remind_status: remindStatus,
            remind_mins_before: remindMinsBefore,
            questions: createSurveyQuestions(this.state.selectedQuestions),
            notes: "",
            records: createRecordsArray(startDate, startTime, values.duration, values.frequency, entriesPerDay),
            status: "pending",
            report_to: localStorage.getItem("provider_id") // Need to complete
        };

        //console.log("obj ", surveyObj)
        patient_dataAPI.newEpisode(patientInfo._id, surveyObj)
        .then(res => {
            // console.log("res.data: ", res.data))
            this.setState ({success: true})   // save success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({failed: true}); // save success dialog
        })

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
        
        const { handleSubmit, classes, submitting, surveyForm } = this.props;
        const { rowsPerPage, page, selectedQuestions, sliderValue1, sliderValue2, success, failed } = this.state;

        const RenderCustomPanelContent = () => 
            <div style={{width: "100%"}} >
                <CheckboxPanel noBorder={true} question="question1" answers={[]}/>
                <CheckboxPanel noBorder={true} question="question2" answers={[]}/>
                <CheckboxPanel noBorder={true} question="question3" answers={[]}/>
            </div>
        


        // SurveyForm component return
        return (
            <React.Fragment>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <div style={{width: "720px"}}>

                        <Typography variant="subtitle1" style={{fontWeight: 500, position: "relative", top: "8px"}}>Start Date</Typography>
                        <div style={{display: 'flex', flexDirection: 'row', alignItems: "left"}}>
                            <SurveyRadio  
                                label="StartDate"
                                name="startdate"
                                items={startDates}
                            /> 
                            {surveyForm && surveyForm.values.startdate === "date" &&
                                <SurveyDatePicker
                                    name="datePick"
                                    label="Select a start date"
                                />
                            }
                        </div>

                        <br />

                        <Typography variant="subtitle1" style={{fontWeight: 500, position: "relative", top: "8px"}} >Duration</Typography>
                            <SurveyRadio
                                label="Duration"
                                name="duration" 
                                items={durations} 
                            />

                        <br />

                        <Typography variant="subtitle1" style={{fontWeight: 500, marginTop: "8px"}} >Timeframe</Typography>
                        <div style={{paddingRight: "12px"}}>
                            <SurveySlider /> 
                        </div>

                        <br />

                        <Typography variant="subtitle1" style={{fontWeight: 500, paddingBottom: "10px"}}>Selected Questions:</Typography>
                        <div style={{paddingRight: "12px"}}>
                            {this.props.defaultQuestion.map(question =>
                                <CheckboxPanel
                                    key={question._id}  
                                    question = {this.props.defaultQuestion[0].question}
                                    answers = {question.answers}
                                    addedBy = "Default question"
                                    checked={true}
                                />
                            )}
                        </div>

                        <br />

                        <div style={{paddingRight: "12px"}}>
                            <Typography variant="button" style={{float: "right", fontWeight: 500}}>Customize questions</Typography>   
                        </div>
                    

                        {/* <Grid item xs={1} style={{paddingTop: "15px"}}>
                            <div style={{height: "100%", borderRight: "1px solid #dddddd"}}></div>
                        </Grid>

                        <Grid item xs={4}>
                            <div>
                                <Typography variant="subtitle1" style={{fontWeight: 500}}>Custom Question Builder:</Typography>    
                                <br />
                                <SimplePanel title="My Custom Question Lists" content={<RenderCustomPanelContent />} />
                                <SimplePanel title="My Custom Questions" />
                                <SimplePanel title="All Custom Questions" />
                            </div>
                        </Grid> */}
          

                        <br />

                        {this.state.customQuestions && 
                            <Paper style={{marginRight: "40px"}} className={classes.customQuestionsWrapper}>

                                <div className={classes.tableWrapper}> 
                                <br />
                                    <Table className={classes.table} >

                                    
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
                                                                    <CheckboxPanel 
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
                                                            {/* <TableCell padding="checkbox" style={{border: 'none', backgroundColor: "#ffffff"}}>
                                                                <Checkbox checked={isSelected} onClick={event => this.handleClick(event, question._id)}/>
                                                            </TableCell> */}
                                    
                                                            <TableCell style={{border: 'none', backgroundColor: "#ffffff"}}>
                                                                        
                                                                <CheckboxPanel 
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
                        
                                <Toolbar style={{width: "630px", backgroundColor: "#dddddd"}}>
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

                        <div style={{width: "708px"}}>
                            <br /> <br /> <HrStyled /> <br />
                            <ActionBtn type="submit" disabled={submitting || (sliderValue1 === 0 && sliderValue2 === 20)} text="create diary card" />
                            <span style={{marginLeft: "16px"}}>
                                <ActionLnk url='/admin/find' text="cancel"/>
                            </span>

                            <Typography variant="button" inline style={{float: "right", marginTop: "16px"}}>Advanced settings</Typography>
                        </div>

                    </div>
                </form>

                {success && <SurveySaveSuccessDialog name = {`${this.props.patientInfo.firstname} ${this.props.patientInfo.lastname}`}/>}
                {failed && <SurveySaveFailedDialog />} 

            </React.Fragment>
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
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        surveyForm: state.form.NewSurveyForm
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
    

    
