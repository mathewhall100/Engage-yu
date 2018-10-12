
import { SURVEY_PATIENT_DETAILS } from '../actions/types';

const INITIAL_STATE = {

    surveyPatientInfo : [],
    surveyPatientData: []
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case SURVEY_PATIENT_DETAILS:
            return { 
                surveyPatientInfo: action.payload.surveyPatientInfo,
                surveyPatientData : action.payload.surveyPatientData[0],
            }
        default:
            return state;
    }
};