import {
    PATIENT_SAVE_BEGIN,
    PATIENT_SAVE_SUCCESS,
    PATIENT_SAVE_FAILURE,
    PATIENT_SAVE_RESET
} from './types';
import * as AuthService from '../services/AuthService';
import patient_infoAPI from '../utils/patient_info';
import patient_dataAPI from '../utils/patient_data';
import userAPI from '../utils/user';

export const patientSave= (values) => {
    console.log("patientSaveAction: ", values);

    if (values === "reset") {
        return dispatch => {
            dispatch(patientSaveReset())
        }
    } else {
        return dispatch => {
            dispatch(patientSaveBegin());
            return  patient_infoAPI.createNewPatient({
                date_enrolled: new Date(),
                enrolled_by: {
                    ref: localStorage.getItem("user_provider_id"),
                    id: localStorage.getItem("user_provider_id"),
                    title: `${localStorage.getItem("user_provider_title")}`,
                    firstname: `${localStorage.getItem("user_provider_firstname")}`,
                    lastname: `${localStorage.getItem("user_provider_lastname")}`,
                    role: `${localStorage.getItem("user_provider_role")}`
                },
                patient_data_ref: "000000000000000000000000",
                patient_data_id:  "000000000000000000000000",
                status: "active",
                hospital_id: values.hospId,
                firstname: values.firstname,
                lastname: values.lastname,
                gender: values.gender,
                dob: values.dob,
                email: values.email,
                phone: values.phone,
                primary_provider: {
                    ref: values.provider[0],
                    id: values.provider[0],
                    title: values.provider[1],
                    firstname: values.provider[2],
                    lastname: values.provider[3],
                    role: values.provider[4]
                },
                provider_group: {
                    ref: values.provider[5],
                    id: values.provider[6],
                    name: values.provider[7]
                }
            })
            .then(res_info => {
                console.log("res_info.data: ", res_info.data)
                // Then using new patientInfo_id create a new patient_data collection for the patient
                patient_dataAPI.createNewPatient({
                    patient_info_id: res_info.data._id,
                    patient_info_ref: res_info.data._id
                })
                .then(res_data => {
                    console.log("res_data.data: ", res_data.data)
                    // Then go back and save the patient_data_id into the patientInfo collection
                    patient_infoAPI.update(res_info.data._id, {
                        patient_data_ref: res_data.data._id,
                        patient_data_id: res_data.data._id
                    })
                    .then(res_ref => {
                        console.log("res_user: ", res_ref.data)
                        console.log("values: ", values)
                        AuthService.webAuth.signup({
                            connection: "Engage-Yu",
                            email: values.email,
                            password: values.password,
                            user_metadata: { 
                                firstname: values.firstname,
                                lastname: values.lastname,
                                role: "patient",
                                password: "temp"
                            },
                            responseType: "token id_token"
                        }, function (error, res_user) {
                            if (error) {
                                dispatch(patientSaveFailure(error))
                                saveFailedCleanup(res_info.data._id, res_data.data._id, error) // inner
                            }
                            console.log("New user Created: ", res_user)
                            userAPI.userCreate({
                                sub: `auth0|${res_user.Id}`,
                                role: "patient",
                                id: res_info.data._id,
                            })
                            .then(res_newUser => {
                                console.log("res_newUser: ", res_newUser)
                                dispatch(patientSaveSuccess(res_info.data))
                            })
                            .catch(error => { 
                                dispatch(patientSaveFailure(error))
                                saveFailedCleanup(res_info.data._id, res_data.data._id, error) // first middle block
                            })
                        })
                    })
                    .catch(error => { 
                        dispatch(patientSaveFailure(error))
                        saveFailedCleanup(res_info.data._id, res_data.data._id, error) // first middle block
                    })
                })
                .catch(error => {
                    dispatch(patientSaveFailure(error))
                    saveFailedCleanup(res_info.data._id, null, error) // second middle block
                })
            })
            .catch(error => {
                dispatch(patientSaveFailure(error))
                saveFailedCleanup(null, null, error) // outer block
            })
        }
    }
}
    

// When enroll fails, need to remove any documents created during the sequence of enroll database actions
const saveFailedCleanup = (info_id, data_id, err) => {
    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
    console.log(err);
    console.log("Enroll fail cleanup: ", info_id, " : ", data_id)
    if (info_id) {
        patient_infoAPI.remove(info_id)
        .then(res => {
            console.log(`patient_info document ${res.data._id} removed`)
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred. Document ${info_id} could not be cleaned up. Please contact your system administrator`);
            console.log(err);
        })
    }
    if (data_id) {
        patient_dataAPI.remove(data_id)
        .then(res => {
            console.log(`patient_data document ${res.data._id} removed`)
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred. Document ${data_id} could not be cleaned up. Please contact your system administrator`);
            console.log(err);
        })
    }
}
    


export const patientSaveBegin = () => ({
    type: PATIENT_SAVE_BEGIN
});

export const patientSaveSuccess = data => ({
    type: PATIENT_SAVE_SUCCESS,
    payload : { data }
});

export const patientSaveFailure = error => ({
    type: PATIENT_SAVE_FAILURE,
    payload : { error }
});

export const patientSaveReset = () => ({
    type: PATIENT_SAVE_RESET
});