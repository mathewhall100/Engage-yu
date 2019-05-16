import { LOGOUT_SUCCESS } from '../actions/auth/types'

import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import activeSurveys from './ActiveSurveysReducer';
import auth from './auth/reducer';
import careGroup from './CareGroupReducer';
import careGroupSave from './CareGroupSaveReducer';
import careGroupUpdate from './CareGroupUpdateReducer';
import consoleTitle from './ConsoleTitleReducer';
import episodeStatusUpdate from './EpisodeStatusUpdateReducer';
import mailer from './MailerReducer';
import patientSave from './PatientSaveReducer'
import patient from './PatientReducer';
import patientsByProvider from './PatientsByProviderReducer';
import patientsByCareGroup from './PatientsByCareGroupReducer';
import patientUpdate from './PatientUpdateReducer'
import provider from './ProviderReducer';
import providersByGroup from './ProvidersByCareGroupReducer'
import providerSave from './ProviderSaveReducer';
import providerUpdate from './ProviderUpdateReducer';
import questions from './QuestionsReducer';
import reportEpisode from './ReportEpisodeReducer';
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
    mailer,
    patient,
    patientSave,
    patientsByProvider,
    patientsByCareGroup,
    patientUpdate,
    provider,
    providersByGroup,
    providerSave,
    providerUpdate,
    questions, 
    router: routerReducer,
    reportEpisode,
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
 };

export default rootReducer;

        
