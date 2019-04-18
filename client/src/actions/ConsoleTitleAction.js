import axios from 'axios'
import { CONSOLE_TITLE } from './types';

export const selectConsoleTitle = (consoleTitle) => {
    // set default axios headers here so set again omn browkser reloads.
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('auth_id_token');

    return (dispatch) => dispatch ({ 
        type: CONSOLE_TITLE, 
        payload: consoleTitle
    }); 
}   
