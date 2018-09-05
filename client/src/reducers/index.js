import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './modules/auth';
import PatientReducer from './PatientReducer';
import UserReducer from './UserReducer';
import DashboardReducer from './DashboardReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';

export default combineReducers({
    form: formReducer,
    auth : AuthReducer,
    router : routerReducer,
    user: UserReducer,
    patients: DashboardReducer,
    consoleTitle: ConsoleTitleReducer
});