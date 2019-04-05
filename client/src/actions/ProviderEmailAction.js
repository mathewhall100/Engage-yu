import { 
    PROVIDER_EMAIL_BEGIN,
    PROVIDER_EMAIL_SUCCESS, 
    PROVIDER_EMAIL_FAILURE,
    PROVIDER_EMAIL_RESET
} from './types';

export const emailNewProvider = (id) => {
    console.log("ProviderEmailAction: ", id);
    return dispatch => {
        dispatch(providerEmailBegin());
        let email="email"
        dispatch(providerEmailSuccess(email));
        let error="error"
        dispatch(providerEmailFailure(error));
        dispatch(providerEmailReset())
        // email code here
    };
}

export const providerEmailBegin = () => ({
    type: PROVIDER_EMAIL_BEGIN
});

export const providerEmailSuccess = email => ({
    type: PROVIDER_EMAIL_SUCCESS,
    payload : { email }
});

export const providerEmailFailure = error => ({
    type: PROVIDER_EMAIL_FAILURE,
    payload : { error }
});

export const providerEmailReset = () => ({
    type: PROVIDER_EMAIL_RESET,
});