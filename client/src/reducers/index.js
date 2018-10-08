import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './modules/auth';
import PatientReducer from './PatientReducer';
import UserReducer from './UserReducer';
import DashboardReducer from './DashboardReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';
import SurveyQuestionsReducer from './SurveyQuestionsReducer';
import SurveyPatientReducer from './SurveyPatientReducer';
import ActiveSurveysReducer from './ActiveSurveysReducer';
import ReportReducer from './ReportReducer';
import ListPatientsByProvider from './PatientListReducer';

export default combineReducers({
    form: formReducer,
    auth : AuthReducer,
    router : routerReducer,
    user: UserReducer,
    patients: DashboardReducer,
    consoleTitle: ConsoleTitleReducer,
    surveyQuestions: SurveyQuestionsReducer,
    surveyPatient: SurveyPatientReducer,
    activeSurveys: ActiveSurveysReducer,
    reportPatientData: ReportReducer,
    listPatientsByProvider: ListPatientsByProvider
});