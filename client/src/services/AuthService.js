import Auth0Lock from 'auth0-lock';
import jwtDecode from 'jwt-decode';
import auth0 from 'auth0-js';

const REDIRECT_URI = `http://${window.location.hostname}${window.location.hostname.includes('localhost') ? ":3000" : null}/callback`;
const DOMAIN = 'engageyu-dev.auth0.com';
const CLIENT_ID = 'mrtJ796iMGWdpVzIH78fzVSwbGCj0tse'


// Create new webAuth instance for login from custom form
export const webAuth = new auth0.WebAuth({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    redirectUri: REDIRECT_URI,
    responseType: 'token id_token',
    scope: 'openid profile'
})


// Create new auth0 lock instance for login from auth0 'lock' widget
export const lock = new Auth0Lock(
    CLIENT_ID, 
    DOMAIN, 
    {
        auth: {
            redirectUrl: REDIRECT_URI,
            responseType: 'token id_token'
        },
        theme: {
            primaryColor: '#2d404b'
        },
        languageDictionary: {
            title: 'Engage-Yu'
        },
        additionalSignUpFields: [{  // array see docs for additional options
            name: "full_name",
            placeholder: "Enter your full name"
        }]
    }
);

// Call to show method to display the widget.
export const login = () => {  
    lock.show();
};

// Saves user token to window.localStorage
export const setToken = idToken => {
    window.localStorage.setItem('auth_id_token', idToken);
};

// Saves profile data to window.localStorage
export const setProfile = profile => {
    window.localStorage.setItem('auth_profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
};

// Retrieves the profile data from window.localStorage
export const getProfile = () => {
    const profile = window.localStorage.getItem('auth_profile');
    return profile ? JSON.parse(window.localStorage.auth_profile) : {};
};

// Checks if there is a saved token and it's still valid
// ? equivelent to 'isAuthenticated'
export const isAuthenticated = () => {
    const token = getToken();
    return token && !isTokenExpired(token);
};

export const authenticationSuccess = () => {
    if (getToken()) return true
        else return false
}

export const authenticationExpired = () =>  {
    const token = getToken();
    return isTokenExpired(token);
}

// Retrieves the user token from window.localStorage
export const getToken = () => {
    return window.localStorage.getItem('auth_id_token');
};

// Checks to see if token exists or has expired and returns TRUE if either
export const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;
        else {
            const date = getTokenExpirationDate();
            const offsetSeconds = 0;
            if (date === null) {
            return false;
        }
    return !(date.valueOf() > new Date().valueOf() + offsetSeconds * 1000);
    }
};

// Returns token expiration date
export const getTokenExpirationDate = () => {
    const token = getToken();
    const decoded = jwtDecode(token);
    if (!decoded.exp) return null;
        else {
            const date = new Date(0); // The 0 here is the key, which sets the date to the epoch
            date.setUTCSeconds(decoded.exp);
            console.log("token expiration date", date)
            return date;
        }
};

// Configure axios authorization header with JWT from Local storage 
export const getHeader = () => {
    const header = { 
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('auth_id_token')  //'auth_id_token'
        }
    }
    return header
}






