import { 
    ACTIVE_SURVEYS_BEGIN,
    ACTIVE_SURVEYS_SUCCESS,
    ACTIVE_SURVEYS_FAILURE 
} from './types' 
import patient_dataAPI from '../utils/patient_data';
import { createStatus } from '../components/Dashboard/dashboardLogic';

export const loadActiveSurveys = (id) => {
    return dispatch => {
        dispatch(activeSurveysBegin());
        return patient_dataAPI.fetchActiveSurveys(id)
            .then(res => {
                //console.log("result: ", res.data)
                let surveys = []; 
                if (res.data.length > 0) {
                    surveys = res.data.map(ep => {return {...ep, ...createStatus(ep)} });
                }
                dispatch(activeSurveysSuccess(surveys));
                return surveys;
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                dispatch(activeSurveysFailure(err))
            });
    };
}

export const activeSurveysBegin = () => ({
    type: ACTIVE_SURVEYS_BEGIN
});

export const activeSurveysSuccess = activeSurveys => ({
    type: ACTIVE_SURVEYS_SUCCESS,
    payload : { activeSurveys }
});

export const activeSurveysFailure = error => ({
    type: ACTIVE_SURVEYS_FAILURE,
    payload : { error }
});
