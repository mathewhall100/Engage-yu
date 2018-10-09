/* eslint no-restricted-globals: 0 */
import auth0 from 'auth0-js';
import jwtDecode from 'jwt-decode';

const LOGIN_SUCCESS_PAGE = '/admin/dashboard';
const LOGIN_FAILURE_PAGE = '/';

export default class Auth {
    
    auth0 = location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 
    new auth0.WebAuth({
        domain: 'shikwan.auth0.com',
        clientID: 'uQdJPDVXxxYgPqJiUoRVnAYFKZudGoHh',
        redirectUri: 'localhost:3000/callback',
        audience: 'https://shikwan.auth0.com/api/v2/',
        responseType : 'token id_token',
        scope : 'openid profile'
    })
    :
        new auth0.WebAuth({
            domain: 'shikwan.auth0.com',
            clientID: 'uQdJPDVXxxYgPqJiUoRVnAYFKZudGoHh',
            redirectUri: 'https://lit-island-56219.herokuapp.com//callback',
            audience: 'https://shikwan.auth0.com/api/v2/',
            responseType: 'token id_token',
            scope: 'openid profile'
        })

    constructor() {
        this.login = this.login.bind(this);
    }
    login() {
        this.auth0.authorize();
    }
    handleAuthentication() {
        this.auth0.parseHash((err, authResults) => {
            if (authResults && authResults.accessToken && authResults.idToken) {
                let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
                localStorage.setItem('access_token', authResults.accessToken);
                localStorage.setItem('id_token', authResults.idToken);
                localStorage.setItem('expires_at', expiresAt);
                location.hash = '';
                location.pathname = LOGIN_SUCCESS_PAGE;

            }else if(err) {
                location.pathname = LOGIN_FAILURE_PAGE;
                console.log(err);
            }
        })
    }
    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        localStorage.removeItem('sub');
        localStorage.removeItem('role');
        localStorage.removeItem('userID');
        location.pathname = LOGIN_FAILURE_PAGE;
    }

    getProfile() {
        if(localStorage.getItem('id_token')){
            return jwtDecode(localStorage.getItem('id_token'));
        }else{
            return {};
        }
    }
}