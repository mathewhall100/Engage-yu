import {
    PROVIDER_SAVE_BEGIN,
    PROVIDER_SAVE_SUCCESS,
    PROVIDER_SAVE_FAILURE,
    PROVIDER_SAVE_RESET
} from '../actions/types';

const initialState = {
    info: {},
    loading: false,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PROVIDER_SAVE_BEGIN:
            return {
                ...state,
                loading: true,
                save: null
            };
        case PROVIDER_SAVE_SUCCESS:
            return {
                ...state,
                loading: false,
                info: action.payload.data
            };
        case PROVIDER_SAVE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                info: {}
            };
        case PROVIDER_SAVE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                info: {}
            };
        default: return state;
    }
};