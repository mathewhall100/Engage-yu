import { LOGOUT_SUCCESS } from '../actions/auth/types'

import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import activeSurveys from './ActiveSurveysReducer';
import auth from './auth/reducer';
import careGroup from './CareGroupReducer';
import careGroupSave from './CareGroupSaveReducer';
import careGroupUpdate from './CareGroupUpdateSaveReducer';
import consoleTitle from './ConsoleTitleReducer';
import episodeStatusUpdate from './EpisodeStatusUpdateReducer';
import patientSave from './PatientSaveReducer'
import patient from './PatientReducer';
import patientsByProvider from './PatientsByProviderReducer';
import patientsByCareGroup from './PatientsByCareGroupReducer';
import patientUpdate from './PatientUpdateSaveReducer'
import provider from './ProviderReducer';
import providerSave from './ProviderSaveReducer';
import providerUpdate from './ProviderUpdateSaveReducer';
import questions from './QuestionsReducer';
import survey from './SurveyReducer';
import user from './UserReducer';

const combinedReducer = combineReducers({
    activeSurveys,
    auth,
    careGroup,
    careGroupSave,
    careGroupUpdate,
    consoleTitle,
    episodeStatusUpdate,
    form: formReducer,
    patient,
    patientSave,
    patientsByProvider,
    patientsByCareGroup,
    patientUpdate,
    provider,
    providerSave,
    providerUpdate,
    questions, 
    router: routerReducer,
    survey,
    user
});

// on logout, purge the redux store of all data
// by passing 'undefined' as state to rootReducer
 const rootReducer = (state, action) => {
     if (action.type ===  LOGOUT_SUCCESS) {
        return combinedReducer(undefined, action)
     }
     return combinedReducer(state, action)
 }

export default rootReducer

        
