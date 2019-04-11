
export const getUserRole = () => {
    return window.localStorage.getItem('user_role');
}

export const getUserID = () => {
    return window.localStorage.getItem('user_app_ID');
}