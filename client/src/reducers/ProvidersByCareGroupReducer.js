import {
    PROVIDERS_BY_CAREGROUP_BEGIN,
    PROVIDERS_BY_CAREGROUP_SUCCESS,
    PROVIDERS_BY_CAREGROUP_FAILURE
} from '../actions/types';

const initialState = {
    listProviders: [],
    loading: false,
    error: null
};

export default function providersByCareGroupReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case PROVIDERS_BY_CAREGROUP_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case PROVIDERS_BY_CAREGROUP_SUCCESS:
            return {
                ...state,
                loading: false,
                listProviders: action.payload.listProviders
            };

        case PROVIDERS_BY_CAREGROUP_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                listProviders: []
            };

        default: return state;
    }
}