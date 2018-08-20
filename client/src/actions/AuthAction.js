import jwtDecode from 'jwt-decode';
import { LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN_USER, LOGIN_AUTHENTICATED } from './types';
import auth0 from '../services/auth0';


export const login =() => {
    auth0.authorize();
}

export const handleAuthentication = () => {
    auth0.parseHash((err, authResults) => {
        if (authResults && authResults.accessToken && authResults.idToken) {
            let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
            localStorage.setItem('access_token', authResults.accessToken);
            localStorage.setItem('id_token', authResults.idToken);
            localStorage.setItem('expires_at', expiresAt);
            /* location.hash = '';
            location.pathname = '/'; */
            return {
                type : 'LOGIN_USER_SUCCESS',
                payload : authResults
            }

        }else if(err) {
            /* location.pathname = '/notfound'; */
            console.log(err);
            return {
                type: 'LOGIN_USER_FAIL',
                payload : err
            }
        }
    })
}

export const isAuthenticated = () => {
    let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return {
            type: 'LOGIN_AUTHENTICATED',
            payload : new Date().getTime() < expiresAt
        }
}

export function logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    this.context.router.history.push('/');
    return {
        type :'LOGOUT_SUCCESS',
        payload : false
    }
    
    /* location.pathname = '/notfound'; */
}

export function getProfile() {
    if(localStorage.getItem('id_token')){
        return jwtDecode(localStorage.getItem('id_token'));
    }else{
        return {};
    }
}
