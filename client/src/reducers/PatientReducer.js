import { DEFAULT_QUESTION, CUSTOM_QUESTIONS, QUESTIONS, PATIENT_DETAILS } from '../actions/types';

const INITIAL_STATE = {
    defaultQuestion : [],
    customQuestions : [],
}


export default (state = INITIAL_STATE, action) => {
    console.log("Patient reducer : " , action);

    switch (action.type) {
        case QUESTIONS : 
            return { 
                defaultQuestion: action.payload.defaultQuestion , 
                customQuestions: action.payload.customQuestions
            };
        case DEFAULT_QUESTION:
            return {defaultQuestion : action.payload.defaultQuestion };
        case CUSTOM_QUESTIONS:
            return { customQuestions : action.payload.customQuestions };
        case PATIENT_DETAILS:
            return { 
                patientInfo: action.payload.patientInfo ,
                patientData : action.payload.patientData
            }
        default:
            return state;
    }
};