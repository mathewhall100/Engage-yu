import { 
    SURVEY_BEGIN,
    SURVEY_SUCCESS,
    SURVEY_FAILURE
} from './types'
import moment from 'moment'
import patient_dataAPI from '../utils/patient_data'
import { createStartDate, createRecordsArray, createSurveyQuestions} from '../components/Survey/surveyLogic'
import { sliderTimes24HR } from '../components/Survey/surveyConstants'

export const saveSurvey = (
    values, 
    patientInfo, 
    patientData, 
    slider1Value, 
    slider2Value, 
    selectedQuestions
) => {
    const startDate = createStartDate(values.startdate, values.datepick)
    const endDate = moment(startDate).add(values.duration-1, 'd')
    const startTime = sliderTimes24HR[slider1Value];
    const endTime = sliderTimes24HR[slider2Value];
    const hoursPerDay = parseInt(endTime, 10) > parseInt(startTime, 10) ? (parseInt(endTime, 10)-parseInt(startTime, 10))/100 + 1 : ((parseInt(endTime, 10)+2400)-parseInt(startTime, 10))/100 + 1; 
    const entriesPerDay = parseInt(hoursPerDay, 10)/(parseInt(values.frequency, 10)/60);
    const remindStatus = values.reminder === "off" ? "off" : "on";
    const remindMinsBefore = values.reminder !== "off" ? values.reminder : "";

    const requestingProvider = {
            ref: localStorage.getItem("user_provider_id"),
            id: localStorage.getItem("user_provider_id"),
            title: localStorage.getItem("user_provider_title"),
            firstname: localStorage.getItem("user_provider_firstname"),
            lastname: localStorage.getItem("user_provider_lastname"),
            role: localStorage.getItem("user_provider_role")
    };

    const surveyObj = {
        episode_number: patientData.episodes.length,
        date_requested: moment(),
        requesting_provider: requestingProvider,
        // primary_provider_ref: patientInfo.primary_provider_id,
        // primary_provider_id: patientInfo.primary_provider_id,
        // primary_provider_firstname: patientInfo.primary_provider_firstname,
        // primary_provider_lastname: patientInfo.primary_provider_lastname,
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
        records: createRecordsArray(startDate, startTime, values.duration, values.frequency, entriesPerDay),
        status: "pending",
        messages: [],
        report_to: [
            // need to add code to allow user to enter 'report_to's
        ]
    }

    console.log("obj ", surveyObj)
    return dispatch => {
        dispatch(surveyBegin());
        return patient_dataAPI.newEpisode(patientData._id, surveyObj)
        .then(res => {
            // console.log("res.data: ", res.data))
            dispatch(surveySuccess({start: values.startdate}))
        })
        .catch(error => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(error);
            dispatch(surveyFailure(error))
        })
    };

};


export const surveyBegin = () => ({
    type: SURVEY_BEGIN
});

export const surveySuccess = survey => ({
    type: SURVEY_SUCCESS,
    payload : { survey }
});

export const surveyFailure = error => ({
    type: SURVEY_FAILURE,
    payload : { error }
});