
import { CONSOLE_TITLE } from './types';

export const selectConsoleTitle = (consoleTitle) => {

    return (dispatch) => dispatch ({ 
        type: CONSOLE_TITLE, 
        payload: consoleTitle
    }); 
}   
