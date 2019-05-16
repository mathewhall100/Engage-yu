import {
    PROVIDERS_BY_CAREGROUP_BEGIN,
    PROVIDERS_BY_CAREGROUP_SUCCESS,
    PROVIDERS_BY_CAREGROUP_FAILURE
} from './types'
import providerAPI from '../utils/provider';
import { providerName } from '../logic/textFunctions'

export const loadProvidersByCareGroup = (id) => {
    console.log("providersByCareGroupAction: ", id);
    return dispatch => {
        dispatch(providersByCareGroupBegin());
        let providers = [];
        return  providerAPI.findAllByGroup(id)
            .then(res => {
                //console.log("result: ", res.data)
                providers = res.data.map(provider => {
                    let val = [
                        provider._id, 
                        provider.title,
                        provider.firstname,
                        provider.lastname,
                        provider.provider_role.role,
                        provider.provider_group.id,
                        provider.provider_group.name,
                        provider.office.name,
                        provider.email
                    ];
                    return {
                        value: val,
                        text: providerName(provider.title, provider.firstname, provider.lastname)
                    };
                })
                dispatch(providersByCareGroupSuccess(providers));
                return providers;
            })
            .catch(error => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log("No active surveys retrieved");
                console.log(error);
                dispatch(providersByCareGroupFailure(error))
            });
    };
}


export const providersByCareGroupBegin = () => ({
    type: PROVIDERS_BY_CAREGROUP_BEGIN
});

export const providersByCareGroupSuccess = listProviders => ({
    type: PROVIDERS_BY_CAREGROUP_SUCCESS,
    payload : { listProviders }
});

export const providersByCareGroupFailure = error => ({
    type: PROVIDERS_BY_CAREGROUP_FAILURE,
    payload : { error }
});