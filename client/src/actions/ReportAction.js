
import { REPORT_PATIENT_DATA } from './types';

export const fetchReportPatientData = (patientInfo, patientData) => {
    console.log("reportAction: (patientInfo): ", patientInfo)
    console.log("reportAction (patientData): ", patientData)
    return(dispatch) => {
        dispatch({
            type: REPORT_PATIENT_DATA,
            payload : {
                reportPatientInfo : patientInfo,
                reportPatientData : patientData
            }
        })

    }
};