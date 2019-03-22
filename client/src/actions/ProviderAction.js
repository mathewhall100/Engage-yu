import { 
    PROVIDER_BEGIN,
    PROVIDER_SUCCESS, 
    PROVIDER_FAILURE
} from './types';
import providerAPI from '../utils/provider';

export const loadProvider = (id) => {
    console.log("ProviderAction: ", id);
    return dispatch => {
        dispatch(providerBegin());
        return providerAPI.findById(id)
            .then(res => {
                console.log("result: ", res.data)
                dispatch(providerSuccess(res.data));
                return res.data;
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log("No active surveys retrieved");
                console.log(error);
                dispatch(providerFailure(error))
            });
    };
}

export const providerBegin = () => ({
    type: PROVIDER_BEGIN
});

export const providerSuccess = provider => ({
    type: PROVIDER_SUCCESS,
    payload : { provider }
});

export const providerFailure = error => ({
    type: PROVIDER_FAILURE,
    payload : { error }
});

  
