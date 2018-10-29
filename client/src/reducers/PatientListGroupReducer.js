import { LIST_PATIENTS_BY_CAREGROUP } from '../actions/types';

const INITIAL_STATE = {

    listPatientsByCareGroup: [],
}

export default (state = INITIAL_STATE, action) => {
     
    switch (action.type) {
        case LIST_PATIENTS_BY_CAREGROUP:
            return { 
                listPatientsByCareGroup: action.payload.listPatientsByCareGroup,
            }
        default:
            return state;
    }
};