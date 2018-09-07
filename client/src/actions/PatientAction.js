import axios from 'axios';
import { QUESTIONS, PATIENT_DETAILS } from './types';


export const fetchQuestions = () => {
    const url = `/api/question_default`
    const request = axios.get(url);
    let defaultQ = [];
    return(dispatch) => {
        request.then( res => {
            defaultQ = res.data;
        }).then( 
            axios.get('/api/question_custom').then( res => {
                dispatch({
                    type: QUESTIONS,
                    payload: {customQuestions : res.data, defaultQuestion : defaultQ }
                })
            })
        )
    }
}

export const fetchPatientDetails = (id) => {
    const url = `/api/user/${id}`;
    const request = axios.get(url);
    let userInfo, patientInfo, patientData;
    return(dispatch) => {
        request.then( res => {
            userInfo = res.data;
        }).then(
            axios.get(`/api/patient_info/${userInfo.id}`).then( res => {
                patientInfo = res.data;
            }).then(
            axios.get(`/api/patient_data/${patientInfo.patient_data_id}`).then( res => {
                patientData = res.data;
                dispatch({
                    type: PATIENT_DETAILS,
                    payload : {
                        patientInfo,
                        userInfo,
                        patientData,
                    }
                })
            })
            )
        )
    }
}