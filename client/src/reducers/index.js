import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";

import AuthReducer from './modules/auth';
import PatientReducer from './PatientReducer';
import UserReducer from './UserReducer';
import DashboardReducer from './DashboardReducer';

export default combineReducers({
    auth : AuthReducer,
    patient : PatientReducer,
    router : routerReducer,
    user: UserReducer,
    patients: DashboardReducer
});