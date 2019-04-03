import Auth0 from 'auth0-js';

let redirectURI = `http://${window.location.hostname}${window.location.hostname.includes('localhost') ? ":3000" : null}/callback`

export default new Auth0.WebAuth({
    domain: 'engageyu-dev.auth0.com',
    clientID: 'mrtJ796iMGWdpVzIH78fzVSwbGCj0tse',
    redirectUri: redirectURI, 
    audience: 'https://engageyu-dev.auth0.com/api/v2/',
    responseType : 'token id_token',
    scope : 'openid profile email'
});



// export default new Auth0.WebAuth({
//     domain: 'shikwan.auth0.com',
//     clientID: 'uQdJPDVXxxYgPqJiUoRVnAYFKZudGoHh',
//     redirectUri: redirectURI, 
//     audience: 'https://shikwan.auth0.com/api/v2/',
//     responseType : 'token id_token',
//     scope : 'openid profile email'
// });