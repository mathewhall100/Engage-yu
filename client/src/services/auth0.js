import Auth0 from 'auth0-js';

export default new Auth0.WebAuth({
    domain: 'shikwan.auth0.com',
    clientID: 'uQdJPDVXxxYgPqJiUoRVnAYFKZudGoHh',
    redirectUri: location.hostname === "localhost" || location.hostname === "127.0.0.1" ? 'http://localhost:3000/callback' : 'https://lit-island-56219.herokuapp.com//callback' , 
    audience: 'https://shikwan.auth0.com/api/v2/',
    responseType : 'token id_token',
    scope : 'openid profile email'
});