import axios from 'axios';
import { QUESTIONS, PATIENT_DETAILS, PATIENT_DATA, PATIENT_DATA_FAIL, PATIENT_PROVIDER_INFO, SUBMIT_QUESTIONNAIRES, ERROR_SUBMIT_QUESTIONNAIRES } from './types';

export const fetchPatientData = () => {
    const user = localStorage.getItem('userID') ? localStorage.getItem('userID') : '';
    const url = `/api/patient_data/${user}`
    const request = axios.get(url);
    return(dispatch) => {
        console.log("fetching patient data : " );
        if(user){
            console.log("user is : ", user);
            request.then( res => {
                console.log("patient data : ", res.data);
            dispatch({
                type :  PATIENT_DATA,
                payload : {
                    patientData : res.data,
                    episodes : res.data[0].episodes,
                    currentEpisode : res.data[0].episodes[res.data[0].episodes.length-1]
                }
            })
        }, err => {dispatch({
            type: PATIENT_DATA_FAIL,
            payload: 'no user found'
        })})
        }else{
            dispatch({
                type: PATIENT_DATA_FAIL,
                payload: 'no user found'
            })
        }
        
    }
}
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
export const fetchProviderInfo = () => {
    console.log("fetching provider info")
    const providerID = localStorage.getItem('patientProviderID') ? localStorage.getItem('patientProviderID') : ''; 

    const url = `/api/provider/${providerID}`;
    const request = axios.get(url);
    return (dispatch) => {
        request.then( res => {
            console.log("Fetched provider info : ", res.data)
            dispatch({
                type: PATIENT_PROVIDER_INFO,
                payload : {
                    physicianInfo : res.data,
                                    
                }
            })
        })
    }
}

export const submitForm = (objQuestionnaire) => {
    console.log("submitForm ")
    const url = `/api/patient_data/new`;
    const request = axios.post(url, objQuestionnaire);

    return (dispatch) => {
        request.then( res => {
            dispatch({
                type : SUBMIT_QUESTIONNAIRES,
                payload : "Thank you for filling out the questionnaires!"
            })
        }, err => {
            dispatch({
                type : ERROR_SUBMIT_QUESTIONNAIRES,
                payload : err,
            })
        })
    }
}