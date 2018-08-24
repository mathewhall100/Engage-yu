import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import { 
    routerReducer 
} from "react-router-redux";

export default combineReducers({
    auth : AuthReducer,
    router : routerReducer,
});