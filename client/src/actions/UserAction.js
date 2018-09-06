import axios from 'axios';
import { USER_PROFILE } from './types';

export const fetchUserDetails = (id) => {
    //console.log("here in fetch user details action", id)
    const url = `/api/user/${id}`;
    const request = axios.get(url);
    let userInfo;
    return (dispatch) => {
        request.then(res => {
            userInfo = res.data[0];
            console.log("after scraping data, " , res.data);
            console.log("user info id : ", userInfo.id);
            console.log("user info role : ", userInfo.role);
            dispatch ({
                type: USER_PROFILE,
                payload: {
                    role : userInfo.role,
                    id : userInfo.id
                }
            })
        })
    }
}