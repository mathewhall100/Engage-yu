import {
    CAREGROUP_UPDATE_BEGIN,
    CAREGROUP_UPDATE_SUCCESS,
    CAREGROUP_UPDATE_FAILURE,
    CAREGROUP_UPDATE_RESET
} from './types';
import provider_groupAPI from '../utils/provider_group';

export const careGroupUpdateSave = (values, careGroupId) => {
    if (values === "reset") {
        return dispatch => {
            dispatch(careGroupUpdateSaveReset())
        }
    } else {
        return dispatch => {
            dispatch(careGroupUpdateSaveBegin());
            provider_groupAPI.update(careGroupId, {
                group_name: values.caregroup
            })
            .then(res => {
                //console.log("res.data: ", res.data)
                dispatch(careGroupUpdateSaveSuccess(res.data))
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                dispatch(careGroupUpdateSaveFailure(err))
            })
        }
    }
}


export const careGroupUpdateSaveBegin = () => ({
    type: CAREGROUP_UPDATE_BEGIN
});

export const careGroupUpdateSaveSuccess = data => ({
    type: CAREGROUP_UPDATE_SUCCESS,
    payload : { data }
});

export const careGroupUpdateSaveFailure = error => ({
    type: CAREGROUP_UPDATE_FAILURE,
    payload : { error }
});

export const careGroupUpdateSaveReset = () => ({
    type: CAREGROUP_UPDATE_RESET
});