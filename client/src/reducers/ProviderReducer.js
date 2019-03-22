import {
    PROVIDER_BEGIN,
    PROVIDER_SUCCESS,
    PROVIDER_FAILURE
} from '../actions/types';

const initialState = {
    provider: {},
    loading: false,
    error: null
};

export default function providerReducer( 
    
    state = initialState,
    action
) {
    switch(action.type) {
        case PROVIDER_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PROVIDER_SUCCESS:
            return {
                ...state,
                loading: false,
                provider: action.payload.provider
            };

        case PROVIDER_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                provider: []
            };

        default: return state;
    }
}