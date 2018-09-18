import { ACTIVE_SURVEYS } from '../actions/types';

const INITIAL_STATE = {

    activeSurveys : [],
}

export default (state = INITIAL_STATE, action) => {
     
    switch (action.type) {
        case ACTIVE_SURVEYS:
            return { 
                activeSurveys: action.payload.activeSurveys,
            }
        default:
            return state;
    }
};