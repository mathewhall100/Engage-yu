
export const setUserRole = (userRole) => {
    return window.localStorage.setItem('user_role', userRole);
}

export const getUserRole = () => {
    return window.localStorage.getItem('user_role');
}

export const setUserId = (userId) => {
    return window.localStorage.setItem('auth_user_id', userId);
}

export const getUserId = () => {
    return window.localStorage.getItem('auth_user_id');
}

