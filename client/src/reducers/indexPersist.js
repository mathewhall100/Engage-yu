
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import activeSurveys from './ActiveSurveysReducer';
import auth from './auth/reducer';
import careGroup from './CareGroupReducer';
import careGroupSave from './CareGroupSaveReducer';
import careGroupUpdate from './CareGroupUpdateSaveReducer';
import consoleTitle from './ConsoleTitleReducer';
import dashboardData from './DashboardDataReducer';
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

export default ({
    activeSurveys,
    auth,
    careGroup,
    careGroupSave,
    careGroupUpdate,
    consoleTitle,
    dashboardData,
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
