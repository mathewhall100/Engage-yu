import {
    EPISODE_STATUS_UPDATE_BEGIN,
    EPISODE_STATUS_UPDATE_SUCCESS,
    EPISODE_STATUS_UPDATE_FAILURE,
    EPISODE_STATUS_UPDATE_RESET
} from '../actions/types';

const initialState = {
    update: {},
    loading: false,
    error: null
};

export default function episodeStatusUpdateReducer( 
    state = initialState,
    action
) {
    switch(action.type) {
        case EPISODE_STATUS_UPDATE_BEGIN:
            return {
                ...state,
                loading: true,
                error: null
            };

        case EPISODE_STATUS_UPDATE_SUCCESS:
            return {
                ...state,
                loading: false,
                update: action.payload.data
            };

        case EPISODE_STATUS_UPDATE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                update: {}
            };

        case EPISODE_STATUS_UPDATE_RESET:
        return {
            ...state,
            loading: false,
            error: null,
            update: {} 
        };

        default: return state;
    }
}