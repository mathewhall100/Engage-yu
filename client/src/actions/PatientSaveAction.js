import {
    PATIENT_SAVE_BEGIN,
    PATIENT_SAVE_SUCCESS,
    PATIENT_SAVE_FAILURE,
    PATIENT_SAVE_RESET
} from './types';
import * as AuthService from '../services/AuthService';
import patient_infoAPI from '../utils/patient_info';
import userAPI from '../utils/user';

export const patientSave= (values) => {
    console.log("patientSaveAction: ", values);

    if (values === "reset") {
        return dispatch => {
            dispatch(patientSaveReset())
        }
    } 
    
    if (values && values !== "reset") {
        return dispatch => {
            dispatch(patientSaveBegin());
            const newObj = {
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
                    id: values.provider[5],
                    name: values.provider[6]
                }
            }; 
            let newPatientInfo;
            let newPatientData;
            patient_infoAPI.create(newObj)
            .then(res => {
                console.log("New patient created: ", res.data)
                newPatientInfo = res.data.data.newPtInfo
                newPatientData = res.data.data.newPtData
                authSave(dispatch, values, newPatientInfo, newPatientData)
            })
            .catch(error => {
                dispatch(patientSaveFailure(error));
                saveFailedCleanup(newPatientInfo._id, newPatientData._id, null, error)
            })
        }
    }
};
         
// save patient as a user with auth0 
const authSave = (dispatch, values, newPatientInfo, newPatientData) => {
    let userObj = {
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
    };
    AuthService.webAuth.signup(userObj, function (error, result) {
        if (error) {
            dispatch(patientSaveFailure(error))
            saveFailedCleanup(newPatientInfo._id, newPatientData._id, null, error)
        }
        else {
            console.log("New auth0 user created: ", result)
            userSave(dispatch, values, newPatientInfo, newPatientData, result)
        }
    })
};

// if user successfully saved to auth0, then save as user in user collection
const userSave = (dispatch, values, newPatientInfo, newPatientData, newAuth) => {
    userAPI.userCreate({
        sub: `auth0|${newAuth.Id}`,
        role: "provider",
        id: newPatientInfo._id
    })
    .then(res => {
        console.log("New user created: ", res)
        newPatientInfo["password"] = values.password // add pasword to patient & return
        dispatch(patientSaveSuccess(newPatientInfo))
    })
    .catch(err => {
        console.log(err)
        console.log(err.response)
        dispatch(patientSaveFailure(err))
        saveFailedCleanup(newPatientInfo._id, newPatientData._id, newAuth.Id, err) // first middle block
    })
}


// When enroll fails, need to remove any documents created during the sequence of enroll database actions (clean up)
const saveFailedCleanup = (info_id, data_id, auth_id, error) => {
    console.log("error: ", error)
    console.log("error: ", error.response)
    const clnUpObj = {
        info_id, data_id, auth_id,
    }
    patient_infoAPI.cleanUp(clnUpObj)
    .then(res=> {
        console.log("Cleanup after failed new patient save complete")
    })
    .catch(err => {
        console.log(err)
        console.log(err.response)
        console.log(":There was a problem cleaning up after the failed new patient save operation. there may be unwanted files remaiing on the system. Please contact the system administrator.")
    })
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