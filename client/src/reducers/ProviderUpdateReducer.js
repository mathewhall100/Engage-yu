import {
    PROVIDER_UPDATE_BEGIN,
    PROVIDER_UPDATE_SUCCESS,
    PROVIDER_UPDATE_FAILURE,
    PROVIDER_UPDATE_RESET
} from '../actions/types';

const initialState = {
    update: {},
    loading: false,
    error: null
};

export default function providerUpdateSaveReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case PROVIDER_UPDATE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PROVIDER_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload.data
            };

        case PROVIDER_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                update: {}
            };

        case PROVIDER_UPDATE_RESET:
            return {
                ...state,
                loading: false,
                error: null,
                update: {} 
            };

        default: return state;
    }
}