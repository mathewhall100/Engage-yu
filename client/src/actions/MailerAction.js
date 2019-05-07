import { 
    MAILER_BEGIN,
    MAILER_SUCCESS, 
    MAILER_FAILURE,
    MAILER_RESET
} from './types';
import mailerAPI from '../utils/mailer'

export const mailer = (msg) => {
    console.log("mailerAction: ", msg);

    if (msg === "reset") {
        return dispatch => {
            dispatch(mailerReset())
        }
    } else {
        return dispatch => {
            dispatch(mailerBegin());
            let { emailTo, name, subject, text, html, attachments } = msg 
            mailerAPI.send({
                from: "medmonitor.io@gmail.com", // senders address
                name,
                to: "mathew.hall100@gmail.com",  // replace with 'emailTo' in production
                subject,
                text,
                html,
                attachments
            })
            .then(res => {
                console.log(res.data)
                dispatch(mailerSuccess(res.data));
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log("No active surveys retrieved");
                console.log(error);
                dispatch(mailerFailure(error));
            })
        }
    }
}

export const mailerBegin = () => ({
    type: MAILER_BEGIN
});

export const mailerSuccess = mail => ({
    type: MAILER_SUCCESS,
    payload : { mail }
});

export const mailerFailure = error => ({
    type: MAILER_FAILURE,
    payload : { error }
});

export const mailerReset = () => ({
    type: MAILER_RESET,
});


