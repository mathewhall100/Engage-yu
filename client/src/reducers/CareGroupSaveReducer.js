import {
    CAREGROUP_SAVE_BEGIN,
    CAREGROUP_SAVE_SUCCESS,
    CAREGROUP_SAVE_FAILURE,
    CAREGROUP_SAVE_RESET
} from '../actions/types';

const initialState = {
    info: {},
    loading: false,
    error: null
};

export default function careGroupSaveReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case CAREGROUP_SAVE_BEGIN:
            return {
                ...state,
                loading: true,
                save: null
            };

        case CAREGROUP_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
                info: action.payload.data
            };

        case CAREGROUP_SAVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                info: {}
            };

        case CAREGROUP_SAVE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                info: {}
            };

        default: return state;
    }
}