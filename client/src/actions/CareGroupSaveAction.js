import {
    CAREGROUP_SAVE_BEGIN,
    CAREGROUP_SAVE_SUCCESS,
    CAREGROUP_SAVE_FAILURE,
    CAREGROUP_SAVE_RESET,
} from './types'
import provider_groupAPI from '../utils/provider_group';

export const careGroupSave = (values) => {

    if (values === "reset") {
        return dispatch => {
            dispatch(careGroupSaveReset())
        }
    } else {
        return dispatch => {
            dispatch(careGroupSaveBegin());
            return  provider_groupAPI.create({
                date_added: new Date(),
                added_by: {
                    ref: localStorage.getItem("user_provider_id"),
                    id: localStorage.getItem("user_provider_id"),
                    title: localStorage.getItem("user_provider_title"),
                    firstname: localStorage.getItem("user_provider_firstname"),
                    lastname: localStorage.getItem("user_provider_lastname")
                },
                group_name: values.caregroup
            })
            .then(res => {
                console.log("res.data: ", res.data);
                dispatch(careGroupSaveSuccess(res.data));
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(error);
                dispatch(careGroupSaveFailure(error));
            })
        }
    }
}
    

export const careGroupSaveBegin = () => ({
    type: CAREGROUP_SAVE_BEGIN
});

export const careGroupSaveSuccess = data => ({
    type: CAREGROUP_SAVE_SUCCESS,
    payload : { data }
});

export const careGroupSaveFailure = error => ({
    type: CAREGROUP_SAVE_FAILURE,
    payload : { error }
});

export const careGroupSaveReset = error => ({
    type: CAREGROUP_SAVE_RESET
});