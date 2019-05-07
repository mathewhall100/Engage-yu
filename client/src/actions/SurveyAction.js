import { 
    SURVEY_BEGIN,
    SURVEY_SUCCESS,
    SURVEY_FAILURE,
    SURVEY_RESET
} from './types'
import moment from 'moment'
import patient_dataAPI from '../utils/patient_data'
import { createStartDate, createRecordsArray, createSurveyQuestions} from '../components/Survey/surveyLogic'
import { sliderTimes24HR } from '../components/Survey/surveyConstants'

export const saveSurvey = (
    values,  
    patientData, 
    slider1Value, 
    slider2Value, 
    selectedQuestions,
    recipients
) => {
    if (values === "reset") {
        return dispatch => {
            dispatch(surveyReset())
        }
    } else {
        const startDate = createStartDate(values.startdate, values.datepick)
        const endDate = moment(startDate).add(values.duration-1, 'd')
        const startTime = sliderTimes24HR[slider1Value];
        const endTime = sliderTimes24HR[slider2Value];
        const hoursPerDay = parseInt(endTime, 10) > parseInt(startTime, 10) ? 
            (parseInt(endTime, 10)-parseInt(startTime, 10))/100 + 1 : ((parseInt(endTime, 10)+2400)-parseInt(startTime, 10))/100 + 1; 
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

        const reportTo = [
            ...recipients.map(recipient => {
                return {
                    ref: recipient[0],
                    id: recipient[0],
                    title: recipient[1],
                    firstname: recipient[2],
                    lastname: recipient[3],
                    role: recipient[4]
                }
            })
        ];

        const surveyObj = {
            episode_number: patientData.episodes.length,
            date_requested: moment(),
            requesting_provider: requestingProvider,
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
            report_to: reportTo
        }

        return dispatch => {
            dispatch(surveyBegin());
            return patient_dataAPI.newEpisode(patientData._id, surveyObj)
            .then(res => {
                const ep = res.data.episodes[res.data.episodes.length-1]
                dispatch(surveySuccess( {newEpisodeId: ep._id, start: ep.start_date} ))
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(error);
                dispatch(surveyFailure(error))
            })
        };
    }
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

export const surveyReset = error => ({
    type: SURVEY_RESET,
});