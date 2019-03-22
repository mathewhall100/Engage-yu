import { 
    PATIENTS_BY_PROVIDER_BEGIN,
    PATIENTS_BY_PROVIDER_SUCCESS, 
    PATIENTS_BY_PROVIDER_FAILURE
} from './types';
import patient_infoAPI from '../utils/patient_info';

export const loadPatientsByProvider = (id) => {
    console.log("PatientsByProviderAction: ", id);
    return dispatch => {
        dispatch(patientsByProviderBegin());
        return  patient_infoAPI.findAllByProvider(id)
            .then(res => {
                console.log("result: ", res.data)
                dispatch(patientsByProviderSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log("No active surveys retrieved");
                console.log(error);
                dispatch(patientsByProviderFailure(error))
            });
    };
}

export const patientsByProviderBegin = () => ({
    type: PATIENTS_BY_PROVIDER_BEGIN
});

export const patientsByProviderSuccess = listPatients => ({
    type: PATIENTS_BY_PROVIDER_SUCCESS,
    payload : { listPatients }
});

export const patientsByProviderFailure = error => ({
    type: PATIENTS_BY_PROVIDER_FAILURE,
    payload : { error }
});
