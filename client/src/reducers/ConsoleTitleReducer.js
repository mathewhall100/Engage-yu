import { CONSOLE_TITLE } from '../actions/index'

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    //console.log("Action TYPE: " + action.type)
    switch (action.type) {
        case CONSOLE_TITLE:
            //console.log("consoleTitle_reducer: " + action.payload)
            return action.payload;
        default:
            return state;
    }
};