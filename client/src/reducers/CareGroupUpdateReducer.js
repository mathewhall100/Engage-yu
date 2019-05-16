import {
    CAREGROUP_UPDATE_BEGIN,
    CAREGROUP_UPDATE_SUCCESS,
    CAREGROUP_UPDATE_FAILURE,
    CAREGROUP_UPDATE_RESET
} from '../actions/types';

const initialState = {
    update: {},
    loading: false,
    error: null
};

export default (state = initialState,action) => {
    switch(action.type) {
        case CAREGROUP_UPDATE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CAREGROUP_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload.data
            };
        case CAREGROUP_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                update: {}
            };
        case CAREGROUP_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                update: {} 
            };
        default: return state;
    }
};