import {
    PROVIDER_UPDATE_BEGIN,
    PROVIDER_UPDATE_SUCCESS,
    PROVIDER_UPDATE_FAILURE,
    PROVIDER_UPDATE_RESET
} from './types';
import providerAPI from '../utils/provider';

export const providerUpdate = (values, provider) => {

    if (values === "reset") {
        return dispatch => {
            dispatch(providerUpdateReset())
        }
    } 
    
    if (values.email) {
        return dispatch => {
            dispatch(providerUpdateBegin());
            let updObj = {}
            updObj = {email: values.email, loginAuth: provider.login_auth}
            providerAPI.updateEmail(provider._id, updObj)
            .then(res => {
                //console.log("res: ", res.data)
                dispatch(providerUpdateSuccess(res.data))
            })
            .catch(err => {
                console.log("error: ", err)
                console.log("error: ", err.response)
                dispatch(providerUpdateFailure(err)) 
            })
        }
    }

    if (values !== "reset" && !values.email) {
        return dispatch => {
            dispatch(providerUpdateBegin());
            let updObj = [];
                if (values.officename || values.officestreet || values.officecity || values.officestate || values.officezip) {
                    updObj = {
                        office: {
                            name: values.officename ? values.officename : provider.office.name,
                            street: values.officestreet ? values.officestreet : provider.office.street,
                            city: values.officecity ? values.officecity : provider.office.city,
                            state: values.officestate ? values.officestate : provider.office.state,
                            zip: values.officezip ? values.officezip : provider.office.zip
                        }
                    }
                } else if (values.phoneoffice) {
                    updObj = {phone_office: values.phoneoffice}
                } else if (values.phonecell) {
                    updObj = {phone_cell: values.phonecell}
                } else if (values.phonepager) {
                    updObj = {phone_pager: values.phonepager}
                } else if (values.caregroup) {
                    updObj = {
                        provider_group: {
                            ref: values.caregroup[0],
                            id: values.caregroup[0],
                            name: values.caregroup[1]
                        }
                    }
                } else updObj = {}

            return providerAPI.update(provider._id, updObj)
            .then(res => {
                //console.log("res: ", res.data)
                dispatch(providerUpdateSuccess(res.data)) 
            })
            .catch(err => { 
                console.log(err)
                console.log(err.response);
                dispatch(providerUpdateFailure(err)) 
            })
        }
    }
}


export const providerUpdateBegin = () => ({
    type: PROVIDER_UPDATE_BEGIN
});

export const providerUpdateSuccess = data => ({
    type: PROVIDER_UPDATE_SUCCESS,
    payload : { data }
});

export const providerUpdateFailure = error => ({
    type: PROVIDER_UPDATE_FAILURE,
    payload : { error }
});

export const providerUpdateReset = () => ({
    type: PROVIDER_UPDATE_RESET
});