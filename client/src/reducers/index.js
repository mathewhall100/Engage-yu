import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import createHistory from 'history/createBrowserHistory';
import {
    ConnectedRouter,
    routerReducer,
    routerMiddleware,
    push
} from "react-router-redux";
/* 
const history = createHistory();
 */
export default combineReducers({
    auth : AuthReducer,
    router : routerReducer,
});