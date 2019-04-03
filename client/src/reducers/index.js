import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import ActiveSurveysReducer from './ActiveSurveysReducer';
import AuthReducer from './modules/auth';
import CareGroupReducer from './CareGroupReducer';
import CareGroupSaveReducer from './CareGroupSaveReducer';
import CareGroupUpdateSaveReducer from './CareGroupUpdateSaveReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';
import DashboardDataReducer from './DashboardDataReducer';
import PatientSaveReducer from './PatientSaveReducer'
import PatientReducer from './PatientReducer';
import PatientsByProviderReducer from './PatientsByProviderReducer';
import PatientsByCareGroupReducer from './PatientsByCareGroupReducer';
import PatientUpdateSaveReducer from './PatientUpdateSaveReducer'
import ProviderReducer from './ProviderReducer';
import ProviderSaveReducer from './ProviderSaveReducer';
import ProviderUpdateSaveReducer from './ProviderUpdateSaveReducer';
import QuestionsReducer from './QuestionsReducer';
import SurveyReducer from './SurveyReducer';
import UserReducer from './UserReducer';

export default combineReducers({
    activeSurveys: ActiveSurveysReducer,
    auth : AuthReducer,
    careGroup: CareGroupReducer,
    careGroupSave: CareGroupSaveReducer,
    careGroupUpdate: CareGroupUpdateSaveReducer,
    consoleTitle: ConsoleTitleReducer,
    dashboardData: DashboardDataReducer,
    form: formReducer,
    patient: PatientReducer,
    patientSave: PatientSaveReducer,
    patientsByProvider: PatientsByProviderReducer,
    patientsByCareGroup: PatientsByCareGroupReducer,
    patientUpdate: PatientUpdateSaveReducer,
    provider: ProviderReducer,
    providerSave: ProviderSaveReducer,
    providerUpdate: ProviderUpdateSaveReducer,
    questions: QuestionsReducer, 
    router: routerReducer,
    survey: SurveyReducer,
    user: UserReducer
});