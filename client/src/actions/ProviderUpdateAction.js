import {
    PROVIDER_UPDATE_BEGIN,
    PROVIDER_UPDATE_SUCCESS,
    PROVIDER_UPDATE_FAILURE,
    PROVIDER_UPDATE_RESET
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
    
            } else if (values.phoneoffice) {
                providerAPI.update(provider._id, {
                    phone_office: values.phoneoffice,
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
            } else if (values.phonecell) {
                providerAPI.update(provider._id, {
                    phone_cell: values.phonecell,
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
            } else if (values.phonepager) {
                providerAPI.update(provider._id, {
                    phone_pager: values.phonepager,
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
                    provider_group: {
                        ref: values.caregroup[0],
                        id: values.caregroup[0],
                        name: values.caregroup[1]
                    }
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
    type: PROVIDER_UPDATE_BEGIN
});

export const providerUpdateSaveSuccess = data => ({
    type: PROVIDER_UPDATE_SUCCESS,
    payload : { data }
});

export const providerUpdateSaveFailure = error => ({
    type: PROVIDER_UPDATE_FAILURE,
    payload : { error }
});

export const providerUpdateSaveReset = () => ({
    type: PROVIDER_UPDATE_RESET
});