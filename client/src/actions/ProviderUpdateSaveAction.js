import {
    PROVIDER_UPDATE_SAVE_BEGIN,
    PROVIDER_UPDATE_SAVE_SUCCESS,
    PROVIDER_UPDATE_SAVE_FAILURE,
    PROVIDER_UPDATE_SAVE_RESET
} from './types';
import providerAPI from '../utils/provider';

export const providerUpdateSave = (values, provider) => {
    if (values === "reset") {
        return dispatch => {
            dispatch(providerUpdateSaveReset())
        }
    } else {
        return dispatch => {
            dispatch(providerUpdateSaveBegin());
            if (values.officename || values.officestreet || values.officecity || values.officestate || values.officezip) {
                providerAPI.update(provider._id, {
                    office: {
                        name: values.officename ? values.officename : provider.office.name,
                        street: values.officestreet ? values.officestreet : provider.office.street,
                        city: values.officecity ? values.officecity : provider.office.city,
                        state: values.officestate ? values.officestate : provider.office.state,
                        zip: values.officezip ? values.officezip : provider.office.zip
                    }
                })
                .then(res => {
                    console.log("res.data: ", res.data)
                    dispatch(providerUpdateSaveSuccess(res.data))
                })
                .catch(error => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(error);
                    dispatch(providerUpdateSaveFailure(error)) 
                })
    
            } else if (values.email) {
                providerAPI.update(provider._id, {
                    email: values.email,
                })
                .then(res => {
                    console.log("res.data: ", res.data)
                    dispatch(providerUpdateSaveSuccess(res.data))
                })
                .catch(error => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(error);
                    dispatch(providerUpdateSaveFailure(error)) 
                })
    
            } else if (values.phone2 || values.phone2 || values.phone3) {
                providerAPI.update(provider._id, {
                    phone: [{
                        phone: "office", 
                        number: values.phone1 ? `${values.phone1.slice(0, values.phone1.indexOf("ext")).trim()}` : provider.phone[0].number, 
                        ext:  values.phone1 ? `${values.phone1.slice((values.phone1.indexOf("ext")+3)).trim()}` : provider.phone[0].ext
                        }, {
                        phone: "cell", 
                        number: values.phone2 ? values.phone2 : provider.phone[1].number,
                        ext: "" 
                        }, {
                        phone: "other", 
                        number: values.phone3 ? `${values.phone3.slice(0, values.phone3.indexOf("ext")).trim()}` : provider.phone[2].number,
                        ext:  values.phone3 ? `${values.phone3.slice((values.phone3.indexOf("ext")+3)).trim()}` : provider.phone[2].ext
                    }]
                })
                .then(res => {
                    dispatch(providerUpdateSaveSuccess(res.data))
                    console.log("res.data: ", res.data)
                })
                .catch(error => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(error);
                    dispatch(providerUpdateSaveFailure(error)) 
                })
            } else if (values.caregroup) {
                providerAPI.update(provider._id, {
                    provider_group_ref: values.caregroup[0],
                    provider_group_id: values.caregroup[0],
                    provider_group_name: values.caregroup[1]
                })
                .then(res => {
                    dispatch(providerUpdateSaveSuccess(res.data))
                    console.log("res.data: ", res.data)
                })
                .catch(error => {
                    console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                    console.log(error);
                    dispatch(providerUpdateSaveFailure(error)) 
                })
            } 
        }
    }
}


export const providerUpdateSaveBegin = () => ({
    type: PROVIDER_UPDATE_SAVE_BEGIN
});

export const providerUpdateSaveSuccess = data => ({
    type: PROVIDER_UPDATE_SAVE_SUCCESS,
    payload : { data }
});

export const providerUpdateSaveFailure = error => ({
    type: PROVIDER_UPDATE_SAVE_FAILURE,
    payload : { error }
});

export const providerUpdateSaveReset = () => ({
    type: PROVIDER_UPDATE_SAVE_RESET
});