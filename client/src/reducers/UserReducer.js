import {
    USER_PROFILE
} from '../actions/types';

const INITIAL_STATE = {
    role : '',
    id : '',
}

export default (state = INITIAL_STATE , action) => {
    console.log("in user action : ", action);
    switch(action.type){
        case USER_PROFILE : 
            console.log("reducer in user action  ")
            return { ...state, role: action.payload.role, id: action.payload.id }
        default :
            return state;
    }
}