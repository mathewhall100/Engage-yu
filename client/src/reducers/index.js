import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import PatientReducer from './PatientReducer';
import { 
    routerReducer 
} from "react-router-redux";

export default combineReducers({
    auth : AuthReducer,
    patient : PatientReducer,
    router : routerReducer,
});