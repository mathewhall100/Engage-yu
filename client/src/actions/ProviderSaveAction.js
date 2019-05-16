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
    } 
    
    if (values && values !== "reset") {
        return dispatch => {
            dispatch(providerSaveBegin());
            const newObj = {
                date_added: new Date(),
                added_by: {
                    ref: localStorage.getItem("user_provider_id"),
                    id: localStorage.getItem("user_provider_id"),
                    title: localStorage.getItem("user_provider_title"),
                    firstname: localStorage.getItem("user_provider_firstname"),
                    lastname: localStorage.getItem("user_provider_lastname"),
                    role: localStorage.getItem("user_provider_role")
                },
                title: values.title.toLowerCase().trim(),
                firstname: values.firstname.toLowerCase().trim(),
                lastname: values.lastname.toLowerCase().trim(), 
                office: {
                    name: values.officename.toLowerCase().trim(),
                    street: values.officestreet.toLowerCase().trim(),
                    city:values.officecity.toLowerCase().trim(), 
                    state: values.officestate, 
                    zip: values.officezip,
                },
                email: values.email, 
                phone_office: values.phoneoffice,
                phone_cell: values.phonecell,
                phone_pager: values.phonepager,
                provider_role: {
                    role: values.role.toLowerCase()
                },
                provider_group: {
                    ref: values.caregroup[0],
                    id: values.caregroup[0],
                    name: values.caregroup[1]
                },
                custom_question_list: []
            };
            providerAPI.create(newObj)
            .then(result => {
                let newProvider;
                console.log("Create provider: ", result.data)
                if (values.signup && values.email && values.password) {
                    newProvider = result.data
                    authSave(dispatch, values, newProvider)
                } else {dispatch(providerSaveSuccess(newProvider))}
            })
            .catch(error => {
                console.log("error: ", error)
                console.log("error: ", error.response)
                dispatch(providerSaveFailure(error));
            })
        }
    }
};

// if provider is to have sign-up access, save them as a user with auth0 
const authSave = (dispatch, values, newProvider) => {
    let userObj = {};
    userObj = {
        connection: "Engage-Yu",
        email: values.email,
        password: values.password,
        user_metadata: { 
            firstname: values.firstname.toLowerCase().trim(),
            lastname: values.lastname.toLowerCase().trim(),
            role: "newProvider",
            password: "temp"
        },
        responseType: "token id_token"
    };
    AuthService.webAuth.signup(userObj, function (error, result) {
        if (error) {
            dispatch(providerSaveFailure(error))
            saveFailedCleanup(newProvider._id, error) 
        } else {
            console.log("New auth0 user created: ", result)
            userSave(dispatch, values, newProvider, result)
        }
    })
}

// if user successfully daved to auth0, then save as user in user collection
const userSave = (dispatch, values, newProvider, newAuth) => {
    console.log("NP: ", newProvider)
    userAPI.userCreate({
        sub: `auth0|${newAuth.Id}`,
        role: "provider",
        id: newProvider._id
    })
    .then(newUser => {
        console.log("New user crewted: ", newUser)
        newProvider["password"] = values.password // add pasword to provider & return
        dispatch(providerSaveSuccess(newProvider))
    })
    .catch(error => { 
        dispatch(providerSaveFailure(error))
        saveFailedCleanup(newProvider._id, error) // first middle block
    })
}

// When enroll fails, need to remove any documents created during the sequence of enroll database actions
const saveFailedCleanup = (id, error) => {
    console.log("error: ", error)
    console.log("error: ", error.response)
    console.log("Cleaning up: ", id)
    if (id) {
        providerAPI.remove(id)
        .then(res => {
            console.log(`Provider document ${id} removed`)
        })
        .catch(err => {
            console.log(`A problem occurred and provider document ${id} could not be cleaned up.`);
            console.log(err);
            console.log("err: ", err.response)
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

