import { LIST_PATIENTS_BY_PROVIDER } from '../actions/types';

const INITIAL_STATE = {

    listPatientsByProvider : [],
}

export default (state = INITIAL_STATE, action) => {
     
    switch (action.type) {
        case LIST_PATIENTS_BY_PROVIDER:
            return { 
                listPatientsByProvider: action.payload.listPatientsByProvider,
            }
        default:
            return state;
    }
};