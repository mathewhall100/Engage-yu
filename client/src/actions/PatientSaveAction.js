import {
    PATIENT_SAVE_BEGIN,
    PATIENT_SAVE_SUCCESS,
    PATIENT_SAVE_FAILURE,
    PATIENT_SAVE_RESET
} from './types';
import patient_infoAPI from '../utils/patient_info';
import patient_dataAPI from '../utils/patient_data';
import { startCase } from 'lodash'

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
                enrolled_by_ref: localStorage.getItem("provider_id"),
                enrolled_by_id: localStorage.getItem("provider_id"),
                enrolled_by_name: `${localStorage.getItem("provider_first_name")} ${localStorage.getItem("provider_last_name")}`,
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
                primary_provider_ref: values.provider[0],
                primary_provider_id: values.provider[0],
                primary_provider_firstname: `${startCase(values.provider[1])}`,
                primary_provider_lastname: `${startCase(values.provider[2])}`,
                provider_group_ref: values.provider[3],
                provider_group_id: values.provider[4],
                provider_group_name: values.provider[5]
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
                    patient_infoAPI.insertRef(res_info.data._id, {
                        patient_data_ref: res_data.data._id,
                        patient_data_id: res_data.data._id
                    })
                    .then(res => {
                        console.log("res.data: ", res.data)
                        dispatch(patientSaveSuccess(res.data))
                    })
                    .catch(error => { 
                        dispatch(patientSaveFailure(error))
                        this.saveFailedCleanup(res_info.data._id, res_data.data._id, error) // inner block
                    })
                })
                .catch(error => {
                    dispatch(patientSaveFailure(error))
                    this.enrollSaveCleanup(res_info.data._id, null, error) // middle block
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