import axios from 'axios';
import { USER_PROFILE } from './types';

export const fetchUserDetails = (sub) => {
    const url = `/api/user/${sub.toString()}`;
    const request = axios.get(url);
    let userInfo, userRole, userID;
    return (dispatch) => {
    request.then(res => {
        userInfo = res.data[0];
        console.log("user info : " , res.data);
        localStorage.setItem('role', userInfo.role);
        localStorage.setItem('userID', userInfo.id);
        localStorage.setItem('sub', userInfo.sub);
        
        userRole = userInfo.role ? userInfo.role : localStorage.getItem('role');
        userID = userInfo.id ?  userInfo.id : localStorage.getItem('userID');

    }, (error) => console.log(error)).then( () => {
        console.log("user data : ", userID)
        const url = userRole === 'patient' ? `/api/patient_info/find/${userID}` : `/api/provider/${userID}`
        const request = axios.get(url);
        request.then( res => {
            console.log("In request patient info : ", res.data);
            localStorage.setItem('patientProviderID', res.data.primary_provider_id);
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