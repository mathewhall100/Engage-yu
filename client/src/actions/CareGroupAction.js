import { 
    CAREGROUP_BEGIN, 
    CAREGROUP_SUCCESS, 
    CAREGROUP_FAILURE 
} from './types';
import careGroupAPI from '../utils/provider_group';

export const loadCareGroup = (id) => {
    console.log("CareGroupAction: ", id);
    return dispatch => {
        dispatch(careGroupBegin());
        return careGroupAPI.findById(id)
            .then(res => {
                //console.log("result: ", res.data)
                dispatch(careGroupSuccess(res.data));
                return res.data;
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                dispatch(careGroupFailure(err))
            });
    };
}



export const careGroupBegin = () => ({
    type: CAREGROUP_BEGIN
});

export const careGroupSuccess = careGroup => ({
    type: CAREGROUP_SUCCESS,
    payload : { careGroup }
});

export const careGroupFailure = error => ({
    type: CAREGROUP_FAILURE,
    payload : { error }
});