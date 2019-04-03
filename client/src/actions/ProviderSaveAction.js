import {
    PROVIDER_SAVE_BEGIN,
    PROVIDER_SAVE_SUCCESS,
    PROVIDER_SAVE_FAILURE,
    PROVIDER_SAVE_RESET,
} from './types'
import providerAPI from '../utils/provider';

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
            .then(res => {
                console.log("res.data: ", res.data)
                dispatch(providerSaveSuccess(res.data));
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(error);
                dispatch(providerSaveFailure(error));
            })
        };
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