import {
    PATIENT_UPDATE_BEGIN,
    PATIENT_UPDATE_SUCCESS,
    PATIENT_UPDATE_FAILURE,
    PATIENT_UPDATE_RESET
} from './types';
import patient_infoAPI from '../utils/patient_info';

export const patientUpdate = (values, patientInfo) => {

    if (values === "reset") {
        return  dispatch =>  {
            dispatch(patientUpdateReset())
        }
    } 
    
    if (values.email)  {
        return dispatch => {
            dispatch(patientUpdateBegin());
            let updObj = {}
            updObj = {email: values.email}
            patient_infoAPI.updateEmail(patientInfo._id, updObj)
            .then(res => {
                //console.log("res: ", res.data)
                dispatch(patientUpdateSuccess(res.data))
            })
            .catch(err => {
                console.log("err: ", err)
                console.log("err: ", err.response)
                dispatch(patientUpdateFailure(err)) 
            })
        }
    }
        
    if (values !== "reset" && !values.email) {
        return dispatch => {
            dispatch(patientUpdateBegin());
                let updObj = {}
                if (values.firstname) {
                    updObj = {firstname: values.firstname, lastname: patientInfo.lastname}
                } else if (values.lastname) {
                    updObj = {firstname: patientInfo.firstname, lastname: values.lastname} 
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
                } else { updObj = {} }

                return patient_infoAPI.update(patientInfo._id, updObj)
                .then(res => {
                    console.log("res: ", res.data)
                    dispatch(patientUpdateSuccess(res.data)) 
                })
                .catch(err => { 
                    console.log(err)
                    console.log(err.response);
                    dispatch(patientUpdateFailure(err)) 
                })
            }
        }   
    }


export const patientUpdateBegin = () => ({
    type: PATIENT_UPDATE_BEGIN
});

export const patientUpdateSuccess = data => ({
    type: PATIENT_UPDATE_SUCCESS,
    payload : { data }
});

export const patientUpdateFailure = error => ({
    type: PATIENT_UPDATE_FAILURE,
    payload : { error }
});

export const patientUpdateReset = () => ({
    type: PATIENT_UPDATE_RESET
});
