import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { reset, reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import SurveySlider from './SurveySlider';
import SurveyRadio from './SurveyRadio';
import SurveyDatePicker from './SurveyDatePicker';
import CheckboxPanel from './SurveyCheckboxPanel';
import CancelIcon from '@material-ui/icons/Cancel'
import patient_dataAPI from "../../utils/patient_data.js";
import { durations, startDates, frequencies, timeMargins, reminders, createRecordsArray, createSurveyQuestions} from './SurveyLogic'
import SurveySaveSuccessDialog from '../Dialogs/SurveySaveSuccessDialog.js'
import SurveySaveFailedDialog from '../Dialogs/SurveySaveFailedDialog.js'
import Panel from '../Panels/SimplePanel';
import HrStyled from '../commons/hrStyled'
import ActionBtn from '../Buttons/actionBtn'
import ActionLnk from '../Buttons/actionLnk'
import Collapse from '@material-ui/core/Collapse';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CallBack from '../Callback'


//Form styles
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
    expandBtn: {
        float: "right",
        backgroundColor: "white",
        fontSize: "14px", 
        '&:hover': {
            backgroundColor: "white",
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
        width: "100%"
      },
      expandIconStyles: {
        fontSize: "24px",
        color: "#333",
      },
      collapseIconStyles: {
        fontSize: "24px",
        color: "#333",
        transform: "rotate(180deg)",
        transition: "transform 0.5s linear", 
      },
      // Popper
      popper: {
        zIndex: 100,
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
            },
          },
      },
      arrow: {
        position: 'absolute',
        fontSize: 12,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
      },
}); 

const CustomTableCell = withStyles(theme => ({
    body: {
        padding: "5px",
        fontSize: 14,
    },
  }))(TableCell);

const checkboxTheme = createMuiTheme({
    palette: {
        secondary: { main: '#009900' }, // This is just green.A700 as hex.
      },
})


// --------------- SurveyForm component --------------------------
class SurveyForm extends Component { 

    componentWillReceiveProps(nextProps) {
        console.log("NP: ", nextProps)
        if (nextProps.defaultQuestion[0] !== this.props.defaultQuestion[0]) {
            const tempArray = []
            tempArray.push(nextProps.defaultQuestion[0])
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
        settings: false,
        customize: false,
        toggleCollapse: [true,false,false],
        anchorEl: null,
        popperOpen: false,
        arrowRef: null,
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

    // Slider values
    getSliderValues = (slider1, slider2) => {
        console.log(slider1, slider2)
        this.setState({
            slider1Value: slider1, 
            slider2Value: slider2
        })
    }

    getCustomMsg = (customize) => {
        let msg = ""
        if (customize) msg="Clear to default"
            else msg="Customise questions"
        return msg
    }

    //event Handlers
    toggleCollapse = (box) => {
        let tempArray = [false, false, false]
        tempArray[box] = !this.state.toggleCollapse[box]
        this.setState({toggleCollapse: tempArray})
    }

    toggleCustom = () => {
        if (this.state.customize === true) {
            this.setState({selectedQuestions: [this.props.defaultQuestion[0]]})
        }
        this.setState({customize: !this.state.customize})
    }

    handleRowHover = (event, answers) => {
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          popperContent: answers,
          popperOpen: "true",
        }));
      };

    handleRowLeave = event =>  {
        this.setState(state => ({
            popperOpen: !state.popperOpen
        }))
    }

    handleCheckBoxClick = (event, question) => {
        event.stopPropagation()
        event.nativeEvent.stopImmediatePropagation()
        const { selectedQuestions } = this.state
        const selectedIndex = selectedQuestions.indexOf(question)
        console.log("selIndexOut: ", selectedIndex, " : ", selectedQuestions.length)
        let newSelected = [];
        switch (selectedIndex) {
            case -1:
                newSelected = newSelected.concat(selectedQuestions, question); break
            case 0:
                console.log("selIndexIn: ", selectedIndex, " : ", selectedQuestions.length)
                if (selectedQuestions.length > 1) {
                    console.log("selIndexIn2: ", selectedIndex, " : ", selectedQuestions.length)
                    newSelected = newSelected.concat(selectedQuestions.slice(1))
                 } else newSelected = selectedQuestions; break
            case selectedQuestions.length - 1:
                newSelected = newSelected.concat(selectedQuestions.slice(0, -1)); break
            default: 
                newSelected = newSelected.concat(selectedQuestions.slice(0, selectedIndex),selectedQuestions.slice(selectedIndex + 1))
        }
        this.setState({ selectedQuestions: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    // Popper arrow 
    handleArrowRef = node => {
        this.setState({
          arrowRef: node,
        });
      };

 
    // Render component
    render () {
        
        const { handleSubmit, classes, submitting, surveyForm, customQuestions } = this.props;
        const { rowsPerPage, page, selectedQuestions, slider1Value, slider2Value, settings, customize, toggleCollapse, popperOpen, anchorEl, popperContent, arrowRef, success, failed } = this.state;

        // SurveyForm component return
        return (
            <div className={classes.root}>

                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                        <Typography variant="subtitle1" className={classes.questionLabel}>Start Date</Typography>
                        <div style={{display: 'flex', flexDirection: 'row', marginBottom: "24px"}}>
                            <SurveyRadio  
                                name="startdate"
                                items={startDates}
                            /> 
                            <SurveyDatePicker
                                name="datePick"
                                disabled={surveyForm && surveyForm.values.startdate !== "date"}
                            />
                        </div>

                        <Typography variant="subtitle1" className={classes.questionLabel} >Duration</Typography>
                        <div style={{marginBottom: "32px"}}>
                            <SurveyRadio
                                name="duration" 
                                items={durations} 
                                evenSpace={true}
                            />
                        </div>

                        <Typography variant="subtitle1" className={classes.questionLabel} >Timeframe</Typography>
                        <div className={classes.timeframeContainer}>
                            <SurveySlider sliderValues={this.getSliderValues}/> 
                        </div>

                        <Typography variant="subtitle1" className={classes.questionLabel}> Selected Questions:</Typography>
                        <div className={classes.selectedQuestionsContainer}>
                            <span style={{width: "500px"}}>
                                {selectedQuestions ? 
                                    <React.Fragment>
                                        {selectedQuestions.map(question =>
                                            <div style={{marginTop: "8px"}}>
                                                <CheckboxPanel
                                                    key={question._id}  
                                                    question = {question}
                                                    checked={true}
                                                    handleCheckBoxClick={this.handleCheckBoxClick}
                                                />
                                            </div> 
                                        )}
                                    </React.Fragment>
                                    : 
                                    CallBack
                                }
                            </span>
                            <Typography variant="button" inline className={classes.underlineBtn} onClick={() => this.toggleCustom()}>
                                {this.getCustomMsg(customize)} 
                            </Typography> 
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
                                    <Collapse in={toggleCollapse[0]} collapsedHeight="45px" timeout={1000}>
                                        <div className={classes.customBox} >
                                            <Typography variant="subtitle1" inline>My question lists</Typography>
                                            <Button className={classes.expandBtn} onClick={() => this.toggleCollapse(0)}>
                                                <ExpandMoreIcon className={toggleCollapse[0] ? classes.collapseIconStyles : classes.expandIconStyles}/>
                                            </Button>
                                            <hr className={classes.hrStyled}/>

                                            {customQuestions && customQuestions[0] ?
                                                <React.Fragment>
                                            
                                                    <Table>
                                                        <TableBody >
                                                            {customQuestions
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((question, index) => {
                                                                    return (
                                                                        <TableRow key={index} hover onMouseOver={(event) => this.handleRowHover(event, question)} onMouseLeave={(event) => this.handleRowLeave(event, question)}>
                                                                            <CustomTableCell>
                                                                                <MuiThemeProvider theme={checkboxTheme}>
                                                                                    <Checkbox  checked={selectedQuestions.filter(q => q._id === question._id).length > 0 } onClick={(event) => this.handleCheckBoxClick(event, question)} />  
                                                                                </MuiThemeProvider>
                                                                                <span style={{marginLeft: "15px"}}>{question.question}</span>
                                                                            </CustomTableCell>
                                                                        </TableRow>
                                                                    ); 
                                                                })
                                                            } 
                                                        </TableBody>
                                                    </Table> 

                                                    <TablePagination
                                                        component="div"
                                                        count={this.props.customQuestions.length + 1}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                                                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    />

                                                </React.Fragment>
                                                :
                                            CallBack }

                                        </div>
                                    </Collapse>

                                    <Collapse in={toggleCollapse[1]} collapsedHeight="45px" timeout={1000}>
                                        <div className={classes.customBox} >
                                            <Typography variant="subtitle1" inline>My questions</Typography>
                                            <Button className={classes.expandBtn} onClick={() => this.toggleCollapse(1)}>
                                                <ExpandMoreIcon className={toggleCollapse[1] ? classes.collapseIconStyles : classes.expandIconStyles}/>
                                            </Button>
                                            <hr className={classes.hrStyled}/>

                                            {customQuestions && customQuestions[0] ?
                                                <React.Fragment>
                                            
                                                    <Table>
                                                        <TableBody >
                                                            {customQuestions
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((question, index) => {
                                                                    return (
                                                                        <TableRow key={index} hover onMouseOver={(event) => this.handleRowHover(event, question)} onMouseLeave={(event) => this.handleRowLeave(event, question)}>
                                                                            <CustomTableCell>
                                                                                <MuiThemeProvider theme={checkboxTheme}>
                                                                                    <Checkbox  checked={selectedQuestions.filter(q => q._id === question._id).length > 0 } onClick={(event) => this.handleCheckBoxClick(event, question)} />  
                                                                                </MuiThemeProvider>
                                                                                <span style={{marginLeft: "15px"}}>{question.question}</span>
                                                                            </CustomTableCell>
                                                                        </TableRow>
                                                                    ); 
                                                                })
                                                            } 
                                                        </TableBody>
                                                    </Table> 

                                                    <TablePagination
                                                        component="div"
                                                        count={this.props.customQuestions.length + 1}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                                                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    />

                                                </React.Fragment>
                                                :
                                            CallBack }

                                        </div>
                                    </Collapse>

                                    <Collapse in={toggleCollapse[2]} collapsedHeight="45px" timeout={1000}>
                                        <div className={classes.customBox}>
                                            <Typography variant="subtitle1" inline>All questions</Typography>
                                            <Button className={classes.expandBtn} onClick={() => this.toggleCollapse(2)}>
                                                <ExpandMoreIcon className={toggleCollapse[2] ? classes.collapseIconStyles : classes.expandIconStyles}/>
                                            </Button>
                                            <hr className={classes.hrStyled}/>

                                            {customQuestions && customQuestions[0] ?
                                                <React.Fragment>

                                                    <Table>
                                                        <TableBody >
                                                            {customQuestions
                                                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                                .map((question, index) => {
                                                                    return (
                                                                        <TableRow key={index} hover onMouseOver={(event) => this.handleRowHover(event, question)} onMouseLeave={(event) => this.handleRowLeave(event, question)}>
                                                                            <CustomTableCell>
                                                                                <MuiThemeProvider theme={checkboxTheme}>
                                                                                    <Checkbox  checked={selectedQuestions.filter(q => q._id === question._id).length > 0 } onClick={(event) => this.handleCheckBoxClick(event, question)} />  
                                                                                </MuiThemeProvider>
                                                                                <span style={{marginLeft: "15px"}}>{question.question}</span>
                                                                            </CustomTableCell>
                                                                        </TableRow>
                                                                    ); 
                                                                })
                                                            } 
                                                        </TableBody>
                                                    </Table> 

                                                    <TablePagination
                                                        component="div"
                                                        count={this.props.customQuestions.length + 1}
                                                        rowsPerPage={rowsPerPage}
                                                        page={page}
                                                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                                                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                                                        onChangePage={this.handleChangePage}
                                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                                    />

                                                </React.Fragment>
                                                :
                                                CallBack }          

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
                                        <SurveyRadio
                                            title="Frequency of diary entries"
                                            name="frequency"
                                            items={frequencies}
                                        /> 
                                    </div>
                                    
                                    <Typography variant="subtitle1" className={classes.questionLabel}>Time margin for entries</Typography>
                                    <div style={{marginBottom: "24px"}}>
                                        <SurveyRadio
                                            name="timeMargin"
                                            items={timeMargins}
                                        />
                                    </div>
                                    
                                    <Typography variant="subtitle1" className={classes.questionLabel}>Set reminder</Typography>
                                    <div >
                                        <SurveyRadio
                                            name="reminder"
                                            items={reminders}
                                        />
                                    </div> 
                                </div>
                            </div>
                        </Collapse>

                        <div className={classes.actionBtnsContainer}>
                            <ActionBtn type="submit" disabled={submitting || (slider1Value === 0 && slider2Value === 20)} text="create diary card" />
                            <span style={{marginLeft: "16px"}}>
                                <ActionLnk url='/admin/find' text="cancel"/>
                            </span>
                            {!settings &&
                                <Typography variant="button" inline className={classes.underlineBtn} onClick={() => this.setState({settings: true}) } >
                                    settings
                                </Typography> 
                            }
                        </div>

                </form>

                <Popper 
                    open={popperOpen} 
                    anchorEl={anchorEl} 
                    placement={'right'} 
                    className={classes.popper}
                    modifiers={{
                        arrow: {
                          enabled: true,
                          element: arrowRef,
                        },
                      }}
                    >
                        <span className={classes.arrow} ref={this.handleArrowRef} />
                        <Paper style={{width: "245px"}}>
                            <Fade in={popperOpen} timeout={600}>
                                { popperContent && 
                                    <div style={{padding: "20px 40px"}}> 
                                        <Typography style={{fontSize: "16px", fontWeight: 500}}>{popperContent.question}</Typography> 
                                        <br />
                                        {popperContent.answers.map((answer, index) => {
                                            return (
                                                <Typography variant="subtitle2">{index+1}. {answer[0].toUpperCase() + answer.slice(1)}</Typography> 
                                                )
                                            }) }
                                        <br />
                                        <Typography variant="subtitle2">
                                            {!popperContent.addedBy ? `Added ` : popperContent.addedBy === `Default question` ? `Default question.` : `Added by ${popperContent.addedBy}.`}
                                            {popperContent.date_added ? ` on ${moment(popperContent.date_added).format("MMM Do YYYY")}` : null}
                                        </Typography>
                                    </div>
                                }
                             </Fade>
                        </Paper>
                </Popper>

                {success && <SurveySaveSuccessDialog name = {`${this.props.patientInfo.firstname} ${this.props.patientInfo.lastname}`}/>}
                {failed && <SurveySaveFailedDialog />} 

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
    