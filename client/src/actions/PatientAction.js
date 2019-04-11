import { 
    PATIENT_BEGIN,
    PATIENT_SUCCESS, 
    PATIENT_FAILURE, 
    PATIENT_RESET
} from './types';
import patient_infoAPI from '../utils/patient_info';

export const loadPatient = (id) => {
    console.log("patientAction: ", id);

    if (id === "reset") {
        return dispatch => {
            dispatch(patientReset())
        }
    } else {
        let patientInfo = {};
        let patientData = {};
        return dispatch => {
            dispatch(patientBegin());
            return patient_infoAPI.findFullById(id)
            .then(res => {
                patientData = res.data.patient.patient_data_ref;
                patientInfo = res.data.patient
                patientInfo.patient_data_ref = patientInfo.patient_data_id
                console.log("PatientAction patientInfo: ", patientInfo)
                console.log("PatientAction patientData: ", patientData)
                dispatch(patientSuccess({patientInfo, patientData}))
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log("No patient retrieved");
                console.log(error);
                dispatch(patientFailure(error))
            });
        };
    }
}


export const patientBegin = () => ({
    type: PATIENT_BEGIN
});

export const patientSuccess = patient => ({
    type: PATIENT_SUCCESS,
    payload : { patient }
});

export const patientFailure = error => ({
    type: PATIENT_FAILURE,
    payload : { error }
});

export const patientReset = () => ({
    type: PATIENT_RESET
});