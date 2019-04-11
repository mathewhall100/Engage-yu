
export const loadState = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
}

export const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
    } catch (err) {
        // ignore write errors
    }
}

// Clear user token and profile data from window.localStorage
export const clearLocalStorage = () => {
    const keys = ['auth_id_token', 
            'auth_profile', 
            'user_app_ID', 
            'user_auth_ID', 
            'user_provider_firstname', 
            'user_provider_lastname', 
            'user_provider_role', 
            'user_role', 
            'user_provider_id', 
            'user_provider_group_id',
            'user_provider_group_name',
            'persist:root'
        ];
    keys.forEach(key => localStorage.removeItem(key));
    return true;
};

export const purgeState = () => {
    // purge local storage of persisted state
    localStorage.removeItem('state')
}

