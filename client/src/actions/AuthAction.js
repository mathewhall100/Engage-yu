// import jwtDecode from 'jwt-decode';
// import auth0 from '../services/auth0';
// import history from '../history' 

// export const login =() => {
//     auth0.authorize();
// }

// parses the returning auth0 authResult hash to extract authresults & tokens
// dispatches to reducer
// export const handleAuthentication = () => {
//     return(dispatch) => {
//         auth0.parseHash((err, authResults) => {
//             if (authResults && authResults.accessToken && authResults.idToken) {
//                 console.log(authResults);
//                 let expiresAt = JSON.stringify((authResults.expiresIn) * 1000 + new Date().getTime());
//                 localStorage.setItem('access_token', authResults.accessToken);
//                 localStorage.setItem('id_token', authResults.idToken);
//                 localStorage.setItem('expires_at', expiresAt);
//                 history.push('/admin/dashboard');
//                 dispatch({
//                     type: 'LOGIN_USER_SUCCESS',
//                     payload: {id_token : authResults.idToken, profileInfo : getProfile() }
//                 }) 
//             } else if (err) {
//                 console.log("Error: ", err);
//                 dispatch({
//                     type: 'LOGIN_USER_FAIL',
//                     payload: err
//                 }) 
//             }
//         })
//     }
// }

// export const isAuthenticated = () => {
//     return(dispatch) => {
//         let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
//         let userProfile = getProfile();

//         dispatch({
//             type: 'LOGIN_AUTHENTICATED',
//             payload: {authenticated : new Date().getTime() < expiresAt ? 1 : 2, 
//             profileInfo : userProfile}
//         }) 
//     }
    
// }

// export const logout = () => {
//     return(dispatch) => {
//         auth0.logout()
//         localStorage.removeItem('access_token');
//         localStorage.removeItem('id_token');
//         localStorage.removeItem('expires_at');
//         // add removal of complete auth and user information in local storage and clear from state.
//         history.push('/');
//         dispatch({
//             type: 'LOGOUT_SUCCESS',
//             payload: false
//         })
//     }
// }

// export const getUserProfile = () => {
//     if(localStorage.getItem('id_token')){
//         return (dispatch) => {
//             dispatch({
//                 type: 'USER_PROFILE',
//                 payload: jwtDecode(localStorage.getItem('id_token'))
//             })
//         }
//     }
    
// }

// export function getProfile() {
//     if(localStorage.getItem('id_token')){
//         return(jwtDecode(localStorage.getItem('id_token')));
//     }
    
// }
