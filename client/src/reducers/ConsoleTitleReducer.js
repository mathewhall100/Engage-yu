import { CONSOLE_TITLE } from '../actions/types'

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CONSOLE_TITLE:
            return action.payload;
        default:
            return state;
    }
};