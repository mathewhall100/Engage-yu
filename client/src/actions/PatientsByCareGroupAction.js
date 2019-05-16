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
        return  patient_infoAPI.findAllByCareGroup(id)
        .then(res => {
            //console.log(res.data.data)
            dispatch(patientsByCareGroupSuccess(res.data));
        })
        .catch(err => {
            console.log(err)
            console.log(err.response) 
            dispatch(patientsByCareGroupFailure(err))
        })
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