import React, { Component } from 'react';
import { reduxForm} from 'redux-form';
import { connect } from 'react-redux';
//import PropTypes from 'prop-types';
import moment from 'moment';
import { withStyles, Button, Typography, Collapse} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel'
import BtnAction from '../UI/Buttons/btnAction'
import BtnActionLink from '../UI/Buttons/btnActionLnk'
import CallBack from '../UI/callback'
import patient_dataAPI from "../../utils/patient_data.js";
import { durations, startDates, frequencies, timeMargins, reminders, sliderTimes24HR } from './surveyConstants'
import { createStartDate, createRecordsArray, createSurveyQuestions} from './surveyLogic'
import SurveyCustomQuestionTable from './SurveyCustomQuestionTable';
import SurveyPanelExpandButton from './SurveyPanelExpandButton'
import SurveyQuestionPanel from './SurveyQuestionPanel';
import SurveyFormSlider from './SurveyFormSlider';
import SurveyFormRadio from './SurveyFormRadio';
import SurveyDatePicker from './SurveyFormDatePicker';
import SurveySaveListDialog from "./SurveySaveListDialog"
import SurveySaveSuccessDialog from './SurveySaveSuccessDialog'
import DialogActionFailed from '../UI/Dialogs/dialogActionFailed'


const styles = theme => ({
    root: {
        width: "720px",
        margin: "0 auto"
    },
    questionLabel: {
        fontWeight: 500,
        position: "relative", 
        top: "8px"
    },
    timeframeContainer: {
        paddingRight: "12px",
        marginBottom: "32px", 
        marginTop: "10px"
    },
    selectedQuestionsContainer: {
        display: 'flex', 
        flexDirection: 'row', 
        justifyContent: "space-between", 
        marginTop: "10px"
    },
    customQuestionsContainer: {
        width: "500px",
        margin: "56px 12px 0 0",
        border: "1px solid #ccc",
        borderRadius: "4px"
    },
    settingsContainer: {
        width: "702px",
        margin: "56px 12px 0 0",
        border: "1px solid #ccc",
        borderRadius: "4px"
    },
    containerTitleBanner: {
        padding: "20px 0 20px 30px",
        backgroundColor: "#eee"
        
    },
    containerTitleText: {
        fontWeight: 500, 
        backgroundColor: "#eee"
    },
    customContent: {
        width: "100%",
        padding: "12px 0 20px 30px"
    },
    hrStyled: {
        opacity: 0.2, 
        color: theme.palette.primary.main, 
        paddingBottom: 0, 
        marginBottom: 0
    },
    // Btns
    closeBtn: {
        float: "right", 
        position: "relative", top: "-8px", 
        backgroundColor: "#eee",
        fontSize: "14px", 
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: "#eee",
            color: theme.palette.error.dark,
        }
    },
    closeIcon: {
        fontSize: "32px", 
        color: theme.palette.error.main,
        '&:hover': {
            backgroundColor: "#eee",
            color: theme.palette.error.dark,
        }
    },
    underlineBtn: {
        margin: "16px 12px 0 0",
        float: "right",
        '&:hover': {
            textDecoration: "underline",
            cursor: "pointer"
        }
    },
    actionBtnsContainer: {
        width: "720px", 
        marginTop: "60px"
    },
    // Collapse panels
      container: {
        width: "100%"
      },
      customBox: {
        height: "auto",
        width: "100%",
      },
}); 


// --------------- SurveyForm component --------------------------
class SurveyForm extends Component { 

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultQuestion !== this.props.defaultQuestion) {
            const tempArray = []
            tempArray.push(nextProps.defaultQuestion)
            this.setState({selectedQuestions: tempArray})
        }
    }

    componentWillMount() {
        this.handleInitialize()
    }

    state = {
        slider1Value: 0,
        slider2Value: 20,
        selectedQuestions: [],
        selectedList: {},
        settings: false,
        customize: false,
        toggleCollapse: [true,false,false],
        saveList: false,
        success: false,
        failed: false, 
        episodeStart: "",
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
        console.log("sliders: ", this.state.slider1Value, " ", this.state.slider2Value)
        console.log("questions: ", this.state.selectedQuestions)

        const { slider1Value, slider2Value, selectedQuestions } = this.state
        const { patientData, patientInfo } = this.props

        const startDate = createStartDate(values.startdate, values.datepick)
        const endDate = moment(startDate).add(values.duration-1, 'd')
        const startTime = sliderTimes24HR[slider1Value];
        const endTime = sliderTimes24HR[slider2Value];
        const hoursPerDay = parseInt(endTime, 10) > parseInt(startTime, 10) ? (parseInt(endTime, 10)-parseInt(startTime, 10))/100 + 1 : ((parseInt(endTime, 10)+2400)-parseInt(startTime, 10))/100 + 1; 
        const entriesPerDay = parseInt(hoursPerDay, 10)/(parseInt(values.frequency, 10)/60);
        const remindStatus = values.reminder === "off" ? "off" : "on";
        const remindMinsBefore = values.reminder !== "off" ? values.reminder : "";

        const surveyObj = {
            episode_number: patientData.episodes.length,
            date_requested: moment(),
            requesting_provider_ref: localStorage.getItem("provider_id"),
            requesting_provider_id: localStorage.getItem("provider_id"),
            requesting_provider_firstname: localStorage.getItem("provider_first_name"),
            requesting_provider_lastname: localStorage.getItem("provider_last_name"),
            primary_provider_ref: patientInfo.primary_provider_id,
            primary_provider_id: patientInfo.primary_provider_id,
            primary_provider_firstname: patientInfo.primary_provider_firstname,
            primary_provider_lastname: patientInfo.primary_provider_lastname,
            start_date: startDate,
            end_date: endDate,
            num_days: parseInt(values.duration, 10),
            start_time: startTime,
            end_time: endTime,
            interval_mins: parseInt(values.frequency, 10),
            margin_mins: parseInt(values.timeMargin, 10),
            remind_status: remindStatus,
            remind_mins_before: remindMinsBefore,
            questions: createSurveyQuestions(selectedQuestions),
            notes: "",
            records: createRecordsArray(startDate, startTime, values.duration, values.frequency, entriesPerDay),
            status: "pending",
            report_to: [
                {   provider_ref: patientInfo.primary_provider_id,
                    provider_id: patientInfo.primary_provider_id,
                    provider_firstname: patientInfo.primary_provider_firstname,
                    provider_lastname: patientInfo.primary_provider_lastname
                }
            ]
        };
        console.log("obj ", surveyObj)
        patient_dataAPI.newEpisode(patientData._id, surveyObj)
        .then(res => {
            // console.log("res.data: ", res.data))
            this.setState ({
                success: true, // save success dialog
                episodeStart: startDate
            })  
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({failed: true}); // save success dialog
        })

    };

    // Slider values
    getSliderValues = (slider1, slider2) => {
        console.log(slider1, slider2)
        this.setState({
            slider1Value: slider1, 
            slider2Value: slider2
        })
    }

    //event Handlers
    toggleCollapse = (box) => {
        let tempArray = [false, false, false]
        tempArray[box] = !this.state.toggleCollapse[box]
        this.setState({toggleCollapse: tempArray})
    }

    toggleCustom = () => {
        if (this.state.customize === true) {
            this.setState({
                selectedQuestions: [this.props.defaultQuestion],
                selectedList: ""
            })
        }
        this.setState({customize: !this.state.customize})
    }

    handleListCheckBoxClick = (event, list) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        this.setState({
            selectedQuestions: list.list_questions,
            selectedList: list
        })
    }

    handleQuestionCheckBoxClick = (event, question) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        const { selectedQuestions, selectedList } = this.state
        const selectedIndex = selectedQuestions.indexOf(question)
        let newSelected = [];
        switch (selectedIndex) {
            case -1:
                newSelected = newSelected.concat(selectedQuestions, question); break
            case 0:
                if (selectedQuestions.length > 1) {
                    newSelected = newSelected.concat(selectedQuestions.slice(1))
                 } else newSelected = selectedQuestions; break
            case selectedQuestions.length - 1:
                newSelected = newSelected.concat(selectedQuestions.slice(0, -1)); break
            default: 
                newSelected = newSelected.concat(selectedQuestions.slice(0, selectedIndex),selectedQuestions.slice(selectedIndex + 1))
        }
        if (selectedIndex > 0 && selectedList && selectedList.list_name) {
            if (selectedList.list_questions.includes(question)) {
                this.setState({selectedList: {} })
            }
        }
        this.setState({ selectedQuestions: newSelected });
    };

    saveList = () => {
        console.log("saveList")
        this.setState({saveList: true})
    }


    // Render component
    render () {
        
        const { patientInfo, patientData, defaultQuestion, customQuestions, provider, errorPatient, errorProvider, errorQuestions, loadingPatient, loadingProvider, loadingQuestions, handleSubmit, classes, submitting, surveyForm } = this.props;
        const { selectedQuestions, selectedList, slider1Value, slider2Value, settings, customize, toggleCollapse, saveList, success, failed, episodeStart } = this.state;

        if (errorPatient || errorProvider || errorQuestions) {
            return <div>Error! {errorPatient.message} {errorProvider.message} {errorQuestions.message}</div>
        }

        if (loadingPatient || loadingProvider || loadingQuestions || !patientInfo || !provider || !defaultQuestion) {
            return <CallBack />
        }

        // SurveyForm component return
        return (
            <div className={classes.root}>

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                        <Typography variant="subtitle1" className={classes.questionLabel}>Start Date</Typography>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: "24px"}}>
                            <SurveyFormRadio  
                                name="startdate"
                                items={startDates}
                            /> 
                            <SurveyDatePicker
                                name="datepick"
                                disabled={surveyForm && surveyForm.values.startdate !== "date"}
                            />
                        </div>

                        <Typography variant="subtitle1" className={classes.questionLabel} >Duration</Typography>
                        <div style={{marginBottom: "32px"}}>
                            <SurveyFormRadio
                                name="duration" 
                                items={durations} 
                                evenSpace={true}
                            />
                        </div>

                        <Typography variant="subtitle1" className={classes.questionLabel} >Timeframe</Typography>
                        <div className={classes.timeframeContainer}>
                            <SurveyFormSlider sliderValues={this.getSliderValues}/> 
                        </div>

                        <Typography variant="subtitle1" className={classes.questionLabel}> Selected Questions:</Typography>
                        <div className={classes.selectedQuestionsContainer}>
                            <span style={{width: "500px"}}>
                                {selectedQuestions ? 
                                    <React.Fragment>
                                        {selectedQuestions.map((question, idx) =>
                                            <div key={idx}style={{marginTop: "8px"}}>
                                                <SurveyQuestionPanel
                                                    question = {question}
                                                    checked={true}
                                                    handleCheckBoxClick={this.handleQuestionCheckBoxClick}
                                                />
                                            </div> 
                                        )}
                                    </React.Fragment>
                                    : 
                                    CallBack
                                }
                            </span>

                            <span>
                                <Typography variant="button" className={classes.underlineBtn} onClick={() => this.toggleCustom()}>
                                    {customize ? "restore default" : "customize questions"}
                                </Typography> 

                                <br /><br />


                                {selectedQuestions.length > 1 ?
                                    <Typography variant="button" className={classes.underlineBtn} onClick={() => this.saveList()}>
                                        save selection
                                    </Typography> 
                                    :
                                    null
                                }
                            </span>
                        </div>

                        <Collapse in={customize} timeout={1000} ease>
                            <div className={classes.customQuestionsContainer}>

                                <div className={classes.containerTitleBanner}> 
                                    <Typography variant="subtitle1" className={classes.containerTitleText} inline >Custom Questions</Typography>
                                    <Button className={classes.closeBtn} onClick={() => this.setState({customize: false})}>
                                        <CancelIcon className={classes.closeIcon} />
                                    </Button> 
                                </div>
                          
                                <div className={classes.customContent}>

                                    <Collapse in={toggleCollapse[0]} collapsedHeight="38px" timeout={1000}>
                                        <div className={classes.customBox} >
                                            <Typography variant="subtitle1" inline>My question lists</Typography>
                                            <SurveyPanelExpandButton 
                                                toggle={toggleCollapse[0]}
                                                i={0}
                                                toggleCollapse={this.toggleCollapse}
                                            />
                                            <hr className={classes.hrStyled}/>

                                            {provider && provider.custom_question_lists ?
                                                <SurveyCustomQuestionTable 
                                                    type="list"
                                                    customQuestions={provider.custom_question_lists}
                                                    selected={selectedList}
                                                    checkboxClick={this.handleListCheckBoxClick}
                                                />
                                                :
                                                CallBack 
                                            }
                                        </div>
                                    </Collapse>

                                    <Collapse in={toggleCollapse[1]} collapsedHeight="38px" timeout={1000}>
                                        <div className={classes.customBox} >
                                            <Typography variant="subtitle1" inline >My questions</Typography>
                                            <SurveyPanelExpandButton 
                                                toggle={toggleCollapse[1]}
                                                i={1}
                                                toggleCollapse={this.toggleCollapse}
                                            />
                                            <hr className={classes.hrStyled}/>

                                            {customQuestions && customQuestions[0] ?
                                                <SurveyCustomQuestionTable 
                                                    type="question"
                                                    customQuestions={customQuestions.filter(q => q.added_by_id === localStorage.getItem("provider_id"))}
                                                    selected={selectedQuestions}
                                                    checkboxClick={this.handleQuestionCheckBoxClick}
                                                />
                                                :
                                                CallBack 
                                            }
                                        </div>
                                    </Collapse>

                                    <Collapse in={toggleCollapse[2]} collapsedHeight="38px" timeout={1000}>
                                        <div className={classes.customBox}>
                                            <Typography variant="subtitle1" inline>All questions</Typography>
                                            <SurveyPanelExpandButton 
                                                toggle={toggleCollapse[2]}
                                                i={2}
                                                toggleCollapse={this.toggleCollapse}
                                            />
                                            <hr className={classes.hrStyled}/>

                                            {customQuestions && customQuestions.questionList ?
                                                <SurveyCustomQuestionTable 
                                                        type="question"
                                                        customQuestions={customQuestions.questionList}
                                                        selected={selectedQuestions}
                                                        checkboxClick={this.handleQuestionCheckBoxClick}
                                                />  
                                                :
                                                CallBack
                                            }          
                                        </div>
                                    </Collapse>

                                </div>
                            </div>              
                        </Collapse>
                            
                        <Collapse in={settings} timeout={1000} ease >
                            <div className={classes.settingsContainer}>

                                <div className={classes.containerTitleBanner}>
                                    <Typography variant="subtitle1" inline className={classes.containerTitleText}>Settings</Typography>
                                    <Button className={classes.closeBtn} onClick={() => this.setState({settings: false})}>
                                        <CancelIcon className={classes.closeIcon} />
                                    </Button>
                                </div>

                                <div className={classes.customContent}>
                                    <br />
                                    <Typography variant="subtitle1" className={classes.questionLabel}>Interval between entries</Typography>
                                    <div style={{marginBottom: "24px"}}>
                                        <SurveyFormRadio
                                            title="Frequency of diary entries"
                                            name="frequency"
                                            items={frequencies}
                                        /> 
                                    </div>
                                    
                                    <Typography variant="subtitle1" className={classes.questionLabel}>Time margin for entries</Typography>
                                    <div style={{marginBottom: "24px"}}>
                                        <SurveyFormRadio
                                            name="timeMargin"
                                            items={timeMargins}
                                        />
                                    </div>
                                    
                                    <Typography variant="subtitle1" className={classes.questionLabel}>Set reminder</Typography>
                                    <div >
                                        <SurveyFormRadio
                                            name="reminder"
                                            items={reminders}
                                        />
                                    </div> 
                                </div>
                            </div>
                        </Collapse>

                        <div className={classes.actionBtnsContainer}>
                            <BtnAction type="submit" disabled={submitting || (slider1Value === 0 && slider2Value === 20)} text="create diary card" />
                            <span style={{marginLeft: "16px"}}>
                                <BtnActionLink url='/admin/find' text="cancel"/>
                            </span>
                            {!settings &&
                                <Typography variant="button" inline className={classes.underlineBtn} onClick={() => this.setState({settings: true}) } >
                                    settings
                                </Typography> 
                            }
                        </div>

                </form>

                {saveList && <SurveySaveListDialog questions={selectedQuestions} providerId={localStorage.getItem("provider_id")}/>}
                {success && <SurveySaveSuccessDialog name={`${patientInfo.firstname} ${patientInfo.lastname}`} episodeStart={episodeStart} patientDataId={patientData._id}/>}
                {failed && <DialogActionFailed text="A problem was encountered and a new dairy has not been created." cancelUrl="/admin/find"/> } 

            </div>
        );
    }
};


function validate(values) {
    console.log("Error values: ", values) // -> { object containing all values of form entries } 
    const errors = {};
    // validate inputs from 'values'
    if (values.startdate === "date" && !values.datepick) {
        errors.datepick = "Please enter a valid date";   // message to be displayed if invalid
    }
    // If errors has any properties, redux form assumes form is invalid
    console.log("Errors: ", errors)
    return errors;
}


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        defaultQuestion: state.questions.questions.defaultQuestion,
        customQuestions: state.questions.questions.customQuestions,
        errorQuestions: state.questions.error,
        loadingQuestions: state.questions.loading,

        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        errorPatient: state.patient.error,
        loadingPatient: state.patient.loading,

        provider: state.provider.provider,
        errorProvider: state.provider.error,
        laodingprovider: state.provider.loading,
        
        surveyForm: state.form.NewSurveyForm //Make form state available in component
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
    