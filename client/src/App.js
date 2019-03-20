import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import * as AuthService from './services/AuthService';
import { authActions } from './reducers/modules/auth';
import { fetchUserDetails, getUserRole, getUserID } from './actions/UserAction';
import Routes from './routes/Routes';

import { MuiThemeProvider } from '@material-ui/core/styles'
import theme from './theme'


class App extends Component {

  componentDidMount() {
    //console.log("fetching user details..." , this.props);
    const {sub} = this.props.auth.profile;
    if (sub) {this.props.fetchUserDetails(sub)} 
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
        if (profile.sub) {this.props.fetchUserDetails(profile.sub)}
        
        setTimeout(() => {
        if (this.props.user.role ==='patient') {history.push({ pathname: '/patient' }) }
          else if (this.props.user.role === 'provider') { history.push({ pathname: '/admin/dashboard' }) }
          else {history.push({ pathname: '/' }) }
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

  // Component render
  render() {
    return (
      <MuiThemeProvider theme={theme} >
          <div>
            <Routes {...this.props} />
          </div>
        </MuiThemeProvider>
    );
  }

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
}

const mapDispatchToProps = dispatch => ({
  loginSuccess: profile => dispatch(authActions.loginSuccess(profile)),
  loginError: error => dispatch(authActions.loginError(error)), 
  fetchUserDetails : id => dispatch(fetchUserDetails(id)),
  getUserID :  () => getUserID(),
  getUserRole : () => getUserRole(),
});

const mapStateToProps =state =>{
  //console.log("state in app.js : ", state);
  return state;
}

export default withRouter(connect( mapStateToProps, mapDispatchToProps) (App));
