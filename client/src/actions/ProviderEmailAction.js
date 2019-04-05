import { 
    PROVIDER_EMAIL_BEGIN,
    PROVIDER_EMAIL_SUCCESS, 
    PROVIDER_EMAIL_FAILURE,
    PROVIDER_EMAIL_RESET
} from './types';
import mailerAPI from '../utils/mailer'

export const emailNewProvider = (msg) => {
    console.log("ProviderEmailAction: ", msg);
    return dispatch => {
        dispatch(providerEmailBegin());
        let { email, name, subject, text } = msg
        email = "mathew.hall100@gmail.com"  // delete this where providers ahve real e,mail address
        mailerAPI.send({
            email: "medmonitor.io@gmail.com",
            name,
            to: email,
            subject: subject,
            text
        })
        .then(res => {
            console.log(res.data)
            dispatch(providerEmailSuccess(res.data));
        })
        .catch(error => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log("No active surveys retrieved");
            console.log(error);
            dispatch(providerEmailFailure());
        })
    }
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

