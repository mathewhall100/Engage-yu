import { ACTIVE_SURVEYS } from './types';

export const fetchActiveSurveys = (activeSurveys) => {
    return(dispatch) => {
        dispatch({
            type: ACTIVE_SURVEYS,
            payload : {
                activeSurveys : activeSurveys, 
            }
        })
    }
}

