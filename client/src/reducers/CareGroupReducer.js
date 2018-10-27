import { CARE_GROUP } from '../actions/types'

const INITIAL_STATE = null;

export default (state = INITIAL_STATE, action) => {
    //console.log("Action TYPE:", action.type, ": ", action.payload)
    switch (action.type) {
        case CARE_GROUP:
            //console.log("careGroup_reducer: ", action.payload)
            return action.payload;
        default:
            return state;
    }
};