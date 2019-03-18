import axios from 'axios';
import { USER_PROFILE } from './types';

export const fetchUserDetails = (sub) => {
    //console.log("Sub : ", sub);
    const url = `/api/user/${sub.toString()}`;
    const request = axios.get(url);
    let userInfo, userRole, userID;
    return (dispatch) => {
    request.then(res => {
        userInfo = res.data[0];
        //console.log("User info : " , res.data);
        localStorage.setItem('role', userInfo.role);
        localStorage.setItem('userID', userInfo.id);
        localStorage.setItem('sub', userInfo.sub);
        
        userRole = userInfo.role ? userInfo.role : localStorage.getItem('role');
        userID = userInfo.id ?  userInfo.id : localStorage.getItem('userID');
        //console.log("User id  : " , userID); 
    }, (error) => console.log(error)).then( () => {
        //console.log("user data : ", userID)
        const url = userRole === 'patient' ? `/api/patient_info/find/${userID}` : `/api/provider/${userID}`
        const request = axios.get(url);
        request.then( res => {
            //console.log("In request patient info : ", res.data);
            localStorage.setItem('patientProviderID', res.data.primary_provider_id);
            if(userRole === 'patient'){
                localStorage.setItem('patient_data_id', res.data.patient_data_id);
            }
            if(userRole === 'provider'){
                localStorage.setItem('provider_id', res.data._id);
                localStorage.setItem('provider_first_name', res.data.firstname);
                localStorage.setItem('provider_last_name', res.data.lastname);
                localStorage.setItem('provider_role', res.data.role);
                localStorage.setItem('provider_group_name', res.data.provider_group_name);
                localStorage.setItem('provider_group_id', res.data.provider_group_id)
            }
            dispatch ({
                    type: USER_PROFILE,
                    payload: {
                        role : userRole ,
                        id : userID,
                        details : res.data,
                    }
                })
        }, (error) =>{
            console.log("Error : ", error)
        })
        
    }, (error) =>{console.log(error)});
    }
}
export const getUserRole = () => {
    return window.localStorage.getItem('role');
}

export const getUserID = () => {
    return window.localStorage.getItem('userID');
}