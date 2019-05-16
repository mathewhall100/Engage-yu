import {
    CAREGROUP_BEGIN,
    CAREGROUP_SUCCESS,
    CAREGROUP_FAILURE
} from '../actions/types';

const initialState = {
    careGroup: {},
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case CAREGROUP_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };
        case CAREGROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                careGroup: action.payload.careGroup
            };
        case CAREGROUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                careGroup: []
            };
        default: return state;
    }
};