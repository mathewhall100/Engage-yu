
import { REPORT_PATIENT_DATA } from '../actions/types';

const INITIAL_STATE = {

    reportPatientInfo : [],
    reportPatientData: []
}

export default (state = INITIAL_STATE, action) => {
    
    switch (action.type) {
        case REPORT_PATIENT_DATA:
            return { 
                reportPatientInfo: action.payload.reportPatientInfo,
                reportPatientData : action.payload.reportPatientData[0],
            }
        default:
            return state;
    }
}