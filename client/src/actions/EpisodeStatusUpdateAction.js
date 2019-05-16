import {
    EPISODE_STATUS_UPDATE_BEGIN,
    EPISODE_STATUS_UPDATE_SUCCESS,
    EPISODE_STATUS_UPDATE_FAILURE,
    EPISODE_STATUS_UPDATE_RESET,
} from './types';
import patient_dataAPI from '../utils/patient_data';

export const updateEpisodeStatus = (values, newStatus, patientDataId, episodeId) => {
    if (values === "reset") {
        return dispatch => {
            dispatch(updateEpisodeStatusReset())
        }
    } else {
        return dispatch => {
            dispatch(updateEpisodeStatusBegin());
            let msg = {};
            let provider = {};
            let updater = {};

            if (values) {
                msg = {
                    msg_id: newStatus,
                    msg_date: Date.now(),
                    msg_title: values.title,
                    msg_body:  values.msg,
                    read: false
                }
            } else msg = null

            provider = {
                id: localStorage.getItem("user_provider_id"),
                ref: localStorage.getItem("user_provider_id"),
                title: localStorage.getItem("user_provider_title"),
                firstname: localStorage.getItem("user_provider_firstname"),
                lastName: localStorage.getItem("user_provider_lastname"),
                role: localStorage.getItem("user_provider_role")
            }

            switch (newStatus) {
                case "cancelled": 
                    updater = {
                        date: Date.now(),
                        msg_id: newStatus, 
                        cancelled_by: {...provider}
                    };
                    break;
                case "actioned": 
                    updater = {
                        date: Date.now(),
                        msg_id: newStatus, 
                        actioned_by: {...provider}
                    };
                    break;
                case "archived": 
                    updater = {
                        date: Date.now(),
                        msg_id: newStatus, 
                        archived_by: {...provider}
                    };
                    break;
                default: updater = null
                }
      
            patient_dataAPI.updateStatus(patientDataId,  
                {episodeId, newStatus, msg, updater} 
            )
            .then(res => {
                //console.log("res.data: ", res.data)
                dispatch(updateEpisodeStatusSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                dispatch(updateEpisodeStatusFailure(err)) 
            })
    
        }
    }
}


export const updateEpisodeStatusBegin = () => ({
    type: EPISODE_STATUS_UPDATE_BEGIN
});

export const updateEpisodeStatusSuccess = data => ({
    type: EPISODE_STATUS_UPDATE_SUCCESS,
    payload : { data }
});

export const updateEpisodeStatusFailure = error => ({
    type: EPISODE_STATUS_UPDATE_FAILURE,
    payload : { error }
});

export const updateEpisodeStatusReset = error => ({
    type: EPISODE_STATUS_UPDATE_RESET
});
