import {
    PATIENT_UPDATE_SAVE_BEGIN,
    PATIENT_UPDATE_SAVE_SUCCESS,
    PATIENT_UPDATE_SAVE_FAILURE,
    PATIENT_UPDATE_SAVE_RESET
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
            if (values.firstname) {
                return patient_infoAPI.updateName(patientInfo._id, {
                    firstname: values.firstname,
                    lastname: patientInfo.lastname
                })
                .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
                .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
            } else if (values.lastname) {
                return patient_infoAPI.updateName(patientInfo._id, {
                    firstname: patientInfo.firstname,
                    lastname: values.lastname
                })
                .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
                .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
            } else if (values.email) {
                return patient_infoAPI.updateEmail(patientInfo._id, {
                    email: values.email,
                })
                .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
                .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
            } else if (values.phone) {
                return patient_infoAPI.updatePhone(patientInfo._id, {
                    phone: values.phone,
                })
                .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
                .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
            } else if (values.provider) {
                    return patient_infoAPI.updateProvider(patientInfo._id, {
                    primary_provider_ref: values.provider[0],
                    primary_provider_id: values.provider[0],
                    primary_provider_firstname: `${values.provider[1]}`,
                    primary_provider_lastname: `${values.provider[2]}`,
                })
                .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
                .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
            } else if (values.status) {
                return patient_infoAPI.updateStatus(patientInfo._id, {
                    status: values.status
                })
                .then(res => {dispatch(patientUpdateSaveSuccess(res.data))})
                .catch(error => {dispatch(patientUpdateSaveFailure(error)) })
            }
        }
    }
}


export const patientUpdateSaveBegin = () => ({
    type: PATIENT_UPDATE_SAVE_BEGIN
});

export const patientUpdateSaveSuccess = data => ({
    type: PATIENT_UPDATE_SAVE_SUCCESS,
    payload : { data }
});

export const patientUpdateSaveFailure = error => ({
    type: PATIENT_UPDATE_SAVE_FAILURE,
    payload : { error }
});

export const patientUpdateSaveReset = () => ({
    type: PATIENT_UPDATE_SAVE_RESET
});