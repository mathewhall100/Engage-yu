import userAPI from '../utils/user'


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

export const getUserSubFromId = (searchForId) => {
    return userAPI.userFind({id: searchForId})
    .then(res => {
        console.log("result: ", res.data)
        return res.data.sub;
    })
    .catch(error => {
        console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
        console.log("No active surveys retrieved");
        console.log(error);
    });

}

