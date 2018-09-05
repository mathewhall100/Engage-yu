import {FETCH_ALL_PATIENTS} from '../actions/index'

export default function(state = [], action) {
    switch (action.type) {
        case FETCH_ALL_PATIENTS:
            return [action.payload.data.patientList];
        default:
            return state;
    }
};