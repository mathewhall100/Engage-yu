import Auth0 from 'auth0-js';

export default new Auth0.WebAuth({
    domain: 'shikwan.auth0.com',
    clientID: 'uQdJPDVXxxYgPqJiUoRVnAYFKZudGoHh',
    redirectUri: 'http://localhost:3000/callback',
    audience: 'https://shikwan.auth0.com/api/v2/',
    responseType : 'token id_token',
    scope : 'openid profile email'
});