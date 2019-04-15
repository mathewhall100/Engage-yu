import axios from 'axios';
import {
    USER_PROFILE,
    USER_FAILURE
} from './types';
import * as UserService from '../services/UserService';


export const fetchUserDetails = (sub) => {
    console.log("Fetching from user collection with 'sub': ", sub);
    let userInfo, userRole, userId, url;
    url = `/api/user/${sub.toString()}`;  // convert to user api call
    return (dispatch) => {
        axios.get(url)
        .then(res => {
            userInfo = res.data[0];
            localStorage.setItem('user_role', userInfo.role);
            localStorage.setItem('user_app_id', userInfo.id);

            if (userInfo.role) {userRole = userInfo.role} else {userRole = UserService.getUserRole()};  
            if (userInfo.id) {userId = userInfo.id} else {userId = UserService.getUserId()};   

            switch(userRole) {
                case 'patient':
                    url=`/api/patient_info/find/${userId}`;
                    break;
                case 'provider':
                    url = `/api/provider/${userId}`;
                    break;
                case 'admin':
                    url = `/api/provider/${userId}`
                    break;
                case 'super':
                    url = `/api/provider/${userId}`
                    break;
                default: url = `/`
            } 
            axios.get(url)
            .then(res => {
                if(userRole === 'patient') {
                    localStorage.setItem('user_patient_data_id', null);
                }
                if(userRole === 'provider'){
                    localStorage.setItem('user_provider_id', res.data._id);
                    localStorage.setItem('user_provider_firstname', res.data.firstname);
                    localStorage.setItem('user_provider_lastname', res.data.lastname);
                    localStorage.setItem('user_provider_role', res.data.role);
                    localStorage.setItem('user_provider_group_name', res.data.provider_group_name);
                    localStorage.setItem('user_provider_group_id', res.data.provider_group_id)
                }
                if(userRole === 'admin'){
                    localStorage.setItem('user_admin_id', null);
                    localStorage.setItem('user_admin_firstname', null);
                    localStorage.setItem('user_admin_lastname', null);
                    localStorage.setItem('user_admin_role', null);
                }
                if(userRole === 'super'){
                    localStorage.setItem('user_super_id', null);
                    localStorage.setItem('user_super_firstname', null);
                    localStorage.setItem('user_super_lastname', null);
                    localStorage.setItem('user_super_role', null);
                }
                //console.log("userId: ", userId)
                //console.log("userRole: ", userRole)
                dispatch(userProfile({userRole, userId}))
            })
            .catch(error => {
                console.log("No user retrieved");
                console.log(error);
                dispatch(userFailure(error))
            })
        })
        .catch(error => {
            console.log("No user retrieved");
            console.log(error);
            dispatch(userFailure(error))
        })
    }
}

export const userProfile = user => ({
    type: USER_PROFILE,
    payload: { user }
})

export const userFailure = error => ({
    type: USER_FAILURE,
    payload: { error }
})
