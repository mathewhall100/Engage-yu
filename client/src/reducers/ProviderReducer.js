import { PROVIDER_DETAILS } from '../actions/types'

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    //console.log("Action TYPE:", action.type, ": ", action.payload)
    switch (action.type) {
        case PROVIDER_DETAILS:
            //console.log("provider_reducer: ", action.payload)
            return action.payload;
        default:
            return state;
    }
};