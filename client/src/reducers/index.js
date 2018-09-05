import { combineReducers } from 'redux';
import {  routerReducer } from "react-router-redux";
import { reducer as formReducer } from 'redux-form';

<<<<<<< HEAD
import AuthReducer from './modules/auth';
import PatientReducer from './PatientReducer';
import UserReducer from './UserReducer';
=======
import AuthReducer from './AuthReducer';
>>>>>>> master
import DashboardReducer from './DashboardReducer';
import ConsoleTitleReducer from './ConsoleTitleReducer';

export default combineReducers({
    form: formReducer,
    auth : AuthReducer,
    router : routerReducer,
<<<<<<< HEAD
    user: UserReducer,
    patients: DashboardReducer
=======
    
    patients: DashboardReducer,
    consoleTitle: ConsoleTitleReducer
>>>>>>> master
});