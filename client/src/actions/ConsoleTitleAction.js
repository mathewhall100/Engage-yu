
export const CONSOLE_TITLE = 'CONSOLE_TITLE';

export const selectConsoleTitle = (consoleTitle) => {

    // console.log("ConsoleTitle_action: " + CONSOLE_TITLE + "  +  " + JSON.stringify(consoleTitle))
    return (dispatch) => dispatch(
        { 
        type: CONSOLE_TITLE, 
        payload: consoleTitle
    });
    
}   
