import {
    PATIENT_UPDATE_BEGIN,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAILURE,
    PATIENT_UPDATE_RESET
} from './types';
import patient_infoAPI from '../utils/patient_info';

export const patientUpdateSave= (values, patientInfo) => {
    if (values === "reset") {
        return dispatch => {
            dispatch(patientUpdateSaveReset())
        }
    } else {
        return dispatch => {
            dispatch(patientUpdateSaveBegin());
            let updObj = {}
            if (values.firstname) {
                updObj = {firstname: values.firstname, lastname: patientInfo.lastname}
            } else if (values.lastname) {
                updObj = {firstname: patientInfo.firstname, lastname: values.lastname}
            } else if (values.email) {
                updObj = {email: values.email}
            } else if (values.phone) {
                updObj = {phone: values.phone}
            } else if (values.provider) {
                updObj = {
                    primary_provider: {
                        ref: values.provider[0],
                        id: values.provider[0],
                        title: values.provider[1],
                        firstname: values.provider[2],
                        lastname: values.provider[3],
                        role: values.provider[4]
                    }
                }
            } else if (values.status) {
                updObj = {status: values.status}
            } else updObj = {}

        return patient_infoAPI.update(patientInfo._id, updObj)
        .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
        .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
        }
    }
}


export const patientUpdateSaveBegin = () => ({
    type: PATIENT_UPDATE_BEGIN
});

export const patientUpdateSaveSuccess = data => ({
    type: PATIENT_UPDATE_SUCCESS,
    payload : { data }
});

export const patientUpdateSaveFailure = error => ({
    type: PATIENT_UPDATE_FAILURE,
    payload : { error }
});

export const patientUpdateSaveReset = () => ({
    type: PATIENT_UPDATE_RESET
});