import {
    PATIENTS_BY_CAREGROUP_BEGIN,
    PATIENTS_BY_CAREGROUP_SUCCESS,
    PATIENTS_BY_CAREGROUP_FAILURE
} from './types'
import patient_infoAPI from '../utils/patient_info';

export const loadPatientsByCareGroup = (id) => {
    console.log("PatientsByCareGroupAction: ", id);
    return dispatch => {
        dispatch(patientsByCareGroupBegin());
        return  patient_infoAPI.findAllByGroup(id)
            .then(res => {
                console.log("result: ", res.data)
                dispatch(patientsByCareGroupSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log("No active surveys retrieved");
                console.log(error);
                dispatch(patientsByCareGroupFailure(error))
            });
    };
}


export const patientsByCareGroupBegin = () => ({
    type: PATIENTS_BY_CAREGROUP_BEGIN
});

export const patientsByCareGroupSuccess = listPatients => ({
    type: PATIENTS_BY_CAREGROUP_SUCCESS,
    payload : { listPatients }
});

export const patientsByCareGroupFailure = error => ({
    type: PATIENTS_BY_CAREGROUP_FAILURE,
    payload : { error }
});