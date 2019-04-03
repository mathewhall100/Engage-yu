import {
    CAREGROUP_UPDATE_SAVE_BEGIN,
    CAREGROUP_UPDATE_SAVE_SUCCESS,
    CAREGROUP_UPDATE_SAVE_FAILURE,
    CAREGROUP_UPDATE_SAVE_RESET
} from '../actions/types';

const initialState = {
    update: {},
    loading: false,
    error: null
};

export default function careGroupUpdateSaveReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case CAREGROUP_UPDATE_SAVE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case CAREGROUP_UPDATE_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload.data
            };

        case CAREGROUP_UPDATE_SAVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                update: {}
            };

        case CAREGROUP_UPDATE_SAVE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                update: {} 
            };

        default: return state;
    }
}