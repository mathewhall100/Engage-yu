import axios from 'axios';
import { SURVEY_QUESTIONS, SURVEY_PATIENT_DETAILS } from './types';


export const fetchSurveyQuestions = () => {
    const url = `/api/question_default`
    const request = axios.get(url);
    let defaultQ = [];
    return(dispatch) => {
        request.then( res => {
            defaultQ = res.data;
            }).then(
                axios.get('/api/question_custom').then( res => {
                    dispatch({
                        type: SURVEY_QUESTIONS,
                        payload : {
                            surveyCustomQuestions : res.data.questionList, 
                            surveyDefaultQuestion : defaultQ
                        }
                    })
                })
            
        )
    }
}

export const fetchSurveyPatientDetails = (id) => {
    const url = `/api/patient_info/find/${id}`;
    const request = axios.get(url)
    let patientInfo;
    return(dispatch) => {
        request.then( res => {
            patientInfo = res.data;
            }).then( () => {
                axios.get(`/api/patient_data/${patientInfo.patient_data_id}`).then( res => {
                    dispatch({
                        type: SURVEY_PATIENT_DETAILS,
                        payload : {
                            surveyPatientInfo : patientInfo,
                            surveyPatientData : res.data
                        }
                    })
                })
            }
        )
    }
}

