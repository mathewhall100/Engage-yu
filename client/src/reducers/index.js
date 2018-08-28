import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";

import AuthReducer from './AuthReducer';
import PatientReducer from './PatientReducer';
import DashboardReducer from './DashboardReducer';

export default combineReducers({
    auth : AuthReducer,
    patient : PatientReducer,
    router : routerReducer,
    patients: DashboardReducer
});