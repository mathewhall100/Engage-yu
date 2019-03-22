import { combineReducers } from 'redux';
import { routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './modules/auth';
import UserReducer from './UserReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';
import QuestionsReducer from './QuestionsReducer';
import ActiveSurveysReducer from './ActiveSurveysReducer';
import PatientReducer from './PatientReducer';
import PatientsByProviderReducer from './PatientsByProviderReducer';
import PatientsByCareGroupReducer from './PatientsByCareGroupReducer';
import ProviderReducer from './ProviderReducer';
import CareGroupReducer from './CareGroupReducer';

export default combineReducers({
    form: formReducer,
    auth : AuthReducer,
    router : routerReducer,
    user: UserReducer,
    consoleTitle: ConsoleTitleReducer,
    questions: QuestionsReducer,
    activeSurveys: ActiveSurveysReducer,
    patient: PatientReducer,
    patientsByProvider: PatientsByProviderReducer,
    patientsByCareGroup: PatientsByCareGroupReducer,
    provider: ProviderReducer,
    careGroup: CareGroupReducer
});