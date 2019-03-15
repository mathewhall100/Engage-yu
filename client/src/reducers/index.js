import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './modules/auth';
import UserReducer from './UserReducer';
import DashboardReducer from './DashboardReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';
import SurveyQuestionsReducer from './SurveyQuestionsReducer';
import ActiveSurveysReducer from './ActiveSurveysReducer';
import ReportReducer from './ReportReducer';
import ListPatientsByProvider from './PatientListReducer';
import ListPatientsByCareGroup from './PatientListGroupReducer';
import ProviderReducer from './ProviderReducer';
import CareGroupReducer from './CareGroupReducer';

export default combineReducers({
    form: formReducer,
    auth : AuthReducer,
    router : routerReducer,
    user: UserReducer,
    patients: DashboardReducer,
    consoleTitle: ConsoleTitleReducer,
    surveyQuestions: SurveyQuestionsReducer,
    activeSurveys: ActiveSurveysReducer,
    reportPatientData: ReportReducer,
    listPatientsByProvider: ListPatientsByProvider,
    listPatientsByCareGroup: ListPatientsByCareGroup,
    provider: ProviderReducer,
    careGroup: CareGroupReducer
});