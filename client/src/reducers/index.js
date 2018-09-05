import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

import AuthReducer from './AuthReducer';
import DashboardReducer from './DashboardReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';

export default combineReducers({
    form: formReducer,
    auth : AuthReducer,
    router : routerReducer,
    
    patients: DashboardReducer,
    consoleTitle: ConsoleTitleReducer
});