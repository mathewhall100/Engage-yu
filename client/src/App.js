import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as AuthService from './services/AuthService';
import { authActions } from './reducers/modules/auth';
import { fetchUserDetails, getUserRole, getUserID } from './actions/UserAction';
import "./App.css";

import Routes from './components/Routes';

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
  loginError: error => dispatch(authActions.loginError(error)), 
  fetchUserDetails : id => dispatch(fetchUserDetails(id)),
  getUserID :  () => getUserID(),
  getUserRole : () => getUserRole(),
});

class App extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    loginError: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    fetchUserDetails : PropTypes.func.isRequired,
    getUserID : PropTypes.func.isRequired, 
    getUserRole : PropTypes.func.isRequired, 
  };
  componentDidMount(){
    console.log("fetching user details..." , this.props);
    const {sub} = this.props.auth.profile
    {sub ? this.props.fetchUserDetails(sub) : null}
    
  }
  componentWillMount() {
    //console.log("this.props in app js file : ", this.props);
    const { history, loginError, loginSuccess } = this.props;
    // Add callback for lock's `authenticated` event
    AuthService.lock.on('authenticated', authResult => {
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        AuthService.setToken(authResult.idToken); // static method
        AuthService.setProfile(profile); // static method
        loginSuccess(profile);
        profile.sub ? this.props.fetchUserDetails(profile.sub) : null
        
        setTimeout(() => {
        if(this.props.user.role ==='patient'){
          history.push({ pathname: '/patient' });
        }else if(this.props.user.role === 'provider'){
          history.push({ pathname: '/admin/dashboard' });
        }else {
          history.push({ pathname: '/' });
        }
        AuthService.lock.hide();
        }, 500);
      });
    });
    // Add callback for lock's `authorization_error` event
    AuthService.lock.on('authorization_error', error => {
      loginError(error);
      history.push({ pathname: '/' });
    }); 
  }

  render() {
    return (
        <div>
          <Routes {...this.props} />
        </div>
    );
  }
}
const mapStateToProps =state =>{
  //console.log("state in app.js : ", state);
  return state;

}
export default withRouter(connect( mapStateToProps, mapDispatchToProps) (App));
