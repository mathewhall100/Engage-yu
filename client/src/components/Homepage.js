import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {authActions} from '../reducers/modules/auth';
import PropTypes from 'prop-types';
import * as AuthService from '../services/AuthService';
class Main extends Component {
    static propTypes = {
        history: PropTypes.shape({
            push: PropTypes.func.isRequired
        }).isRequired,
        auth: PropTypes.shape({
            isAuthenticated: PropTypes.bool.isRequired,
            profile: PropTypes.object,
            error: PropTypes.object
        }).isRequired,
        loginRequest: PropTypes.func.isRequired,
        logoutSuccess: PropTypes.func.isRequired
    };

    handleLoginClick = () => {
        AuthService.login();
        this.props.loginRequest();
    };

    handleLogoutClick = () => {
        this.props.logoutSuccess();
        AuthService.logout(); // careful, this is a static method
        this.props.history.push({ pathname: '/' });
    };

    render () {
        const { auth } = this.props;
        return(
            <div>
                {auth.isAuthenticated ? (
                    <div>
                        <img src={auth.profile.picture} height="40px" alt="profile" />
                        <span>Welcome, {auth.profile.nickname}</span>
                        <p>Go to the secret page ? <a href='/secret'>Click here </a></p>
                        <button onClick={this.handleLogoutClick}>Logout</button>
                    </div>
                ) : (
                        <div>
                        Please login first <br />
                        <button onClick={this.handleLoginClick}>Login</button>
                        </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => ({auth})

const mapDispatchToProps = dispatch => ({
    loginRequest: () => dispatch(authActions.loginRequest()),
    logoutSuccess: () => dispatch(authActions.logoutSuccess())
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));