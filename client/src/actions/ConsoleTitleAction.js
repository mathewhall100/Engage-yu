
export const CONSOLE_TITLE = 'CONSOLE_TITLE';

export const selectConsoleTitle = (consoleTitle) => {

    return (dispatch) => dispatch(
        { 
        type: CONSOLE_TITLE, 
        payload: consoleTitle
    });
    
}   
