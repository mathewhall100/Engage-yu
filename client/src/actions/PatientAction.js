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
            return patient_infoAPI.findById(id)
            .then(res => {
                patientData = res.data.patient_data_ref;
                delete res.data.patient_data_ref
                patientInfo = res.data
                console.log("PatientAction patientInfo: ", patientInfo)
                console.log("PatientAction patientData: ", patientData)
                dispatch(patientSuccess({patientInfo, patientData}))
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
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