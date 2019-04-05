import {
    PROVIDER_SAVE_BEGIN,
    PROVIDER_SAVE_SUCCESS,
    PROVIDER_SAVE_FAILURE,
    PROVIDER_SAVE_RESET,
} from './types'
import providerAPI from '../utils/provider';
import * as AuthService from '../services/AuthService';
import userAPI from '../utils/user';

export const providerSave = (values) => {
    console.log("providerSaveAction: ", values);
    
    if (values === "reset") {
        return dispatch => {
            dispatch(providerSaveReset())
        }
    } else {
        return dispatch => {
            dispatch(providerSaveBegin());
            return  providerAPI.create({
                date_added: new Date(),
                firstname: values.firstname,
                lastname: values.lastname,
                provider_group_ref: values.caregroup[0],
                provider_group_id: values.caregroup[0],
                provider_group_name: values.caregroup[1],
                role: values.role, 
                office: {
                    name: values.officename,
                    street: values.officestreet,
                    city:values.officecity, 
                    state: values.officestate, 
                    zip: values.officezip,
                },
                email: values.email, 
                phone: preparePhoneNums(values.phone1, values.phone2, values.phone3)
            })
            .then(res_data => {
                console.log("res.data: ", res_data.data) 
                AuthService.webAuth.signup({
                    connection: "Engage-Yu",
                    email: values.email,
                    password: values.password,
                    user_metadata: { 
                        firstname: values.firstname,
                        lastname: values.lastname,
                    },
                    responseType: "token id_token"
                }, function (error, res_user) {
                    if (error) {
                        dispatch(providerSaveFailure(error))
                        saveFailedCleanup(res_data.data._id, error) // inner
                    }
                    console.log("New user Created: ", res_user)
                    userAPI.userCreate({
                        sub: `auth0|${res_user.Id}`,
                        role: "provider",
                        id: res_data.data._id,
                        // date_created: new Date()
                    })
                    .then(res_newUser => {
                        console.log("res_newUser: ", res_newUser)
                        
                        dispatch(providerSaveSuccess(res_data.data))
                    })
                    .catch(error => { 
                        dispatch(providerSaveFailure(error))
                        saveFailedCleanup(res_data.data._id, error) // first middle block
                    })
                }) 
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(error);
                dispatch(providerSaveFailure(error));
            })
        }
    }
}
    
const preparePhoneNums = (phone1, phone2, phone3) => {
    let phoneNos = [{
        phone: "office", 
        number: `${phone1.slice(0, phone1.indexOf("ext")).trim()}`, 
        ext:  `${phone1.slice((phone1.indexOf("ext")+3)).trim()}`
        }];
    if (phone2) {phoneNos.push({ phone: "cell", number: `${phone2.trim()}`, ext:  ""})}
    if (phone3) {phoneNos.push({ phone: "cell", number: `${phone2.trim()}`, ext:  ""})};
    return phoneNos
}

// When enroll fails, need to remove any documents created during the sequence of enroll database actions
const saveFailedCleanup = (id, err) => {
    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
    console.log(err);
    console.log("Add provider fail cleanup: ", id)
    if (id) {
        providerAPI.remove(id)
        .then(res => {
            console.log(`Provider document ${res.data._id} removed`)
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred. Document ${id} could not be cleaned up. Please contact your system administrator`);
            console.log(err);
        })
    }
}

export const providerSaveBegin = () => ({
    type: PROVIDER_SAVE_BEGIN
});

export const providerSaveSuccess = data => ({
    type: PROVIDER_SAVE_SUCCESS,
    payload : { data }
});

export const providerSaveFailure = error => ({
    type: PROVIDER_SAVE_FAILURE,
    payload : { error }
});

export const providerSaveReset = error => ({
    type: PROVIDER_SAVE_RESET
});