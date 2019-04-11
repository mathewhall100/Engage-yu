import Auth0 from 'auth0-js';

let REDIRECT_URI = `http://${window.location.hostname}${window.location.hostname.includes('localhost') ? ":3000" : null}/callback`

// new Auth0 instance
// export default new Auth0.WebAuth({
//     domain: 'engageyu-dev.auth0.com',
//     clientID: 'mrtJ796iMGWdpVzIH78fzVSwbGCj0tse',
//     redirectUri: REDIRECT_URI, 
//     audience: 'https://engageyu-dev.auth0.com/api/v2/',
//     responseType : 'token id_token',
//     scope : 'openid profile email'
// });
