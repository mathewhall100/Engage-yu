import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as AuthService from './services/AuthService';
import { authActions } from './reducers/modules/auth';
import { fetchUserDetails } from './actions/UserAction';
import "./App.css";

import Routes from './components/Routes';

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
  loginError: error => dispatch(authActions.loginError(error)), 
  fetchUserDetails : id => dispatch(fetchUserDetails(id)),
});

class App extends Component {
  static propTypes = {
    history: PropTypes.shape({
      push: PropTypes.func.isRequired
    }).isRequired,
    loginError: PropTypes.func.isRequired,
    loginSuccess: PropTypes.func.isRequired,
    fetchUserDetails : PropTypes.func.isRequired,
  };
  componentDidMount(){
    //console.log("fetching user details..." , this.props);
    fetchUserDetails(this.props.auth.profile.sub);
  }
  componentWillMount() {
    //console.log("this.props in app js file : ", this.props);
    const { history, loginError, loginSuccess } = this.props;
    let userProfile;
    // Add callback for lock's `authenticated` event
    AuthService.lock.on('authenticated', authResult => {
      
      AuthService.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (error) {
          return loginError(error);
        }
        userProfile = profile;
        AuthService.setToken(authResult.idToken); // static method
        AuthService.setProfile(profile); // static method
        loginSuccess(profile);
        //console.log("Profile : ", profile);
        history.push({ pathname: '/admin/dashboard' });
        AuthService.lock.hide();
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
