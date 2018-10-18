import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {authActions} from '../reducers/modules/auth';
//import PropTypes from 'prop-types';
import * as AuthService from '../services/AuthService';
import HomeContent from './HomeContent';

class Home extends Component {

    // static propTypes = {
    //     history: PropTypes.shape({
    //         push: PropTypes.func.isRequired
    //     }).isRequired,
    //     auth: PropTypes.shape({
    //         isAuthenticated: PropTypes.bool.isRequired,
    //         profile: PropTypes.object,
    //         error: PropTypes.object
    //     }).isRequired,
    //     loginRequest: PropTypes.func.isRequired,
    //     logoutSuccess: PropTypes.func.isRequired
    // };

    // handleLoginClick = () => {
    //     AuthService.login();
    //     this.props.loginRequest();
    // };

    // handleLogoutClick = () => {
    //     this.props.logoutSuccess();
    //     AuthService.logout(); // careful, this is a static method
    //     this.props.history.push({ pathname: '/' });
    // };

    render () {
        const { auth } = this.props;
        return(
            <div>
                {auth.isAuthenticated ? (
                    <div>
                        <br />
                        <p> already logged in - sort out where to direct if arrive here since patients and providers will have different places to start. </p>
                    </div>
                ) : (
                    <HomeContent />
                )}
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => ({auth})

// const mapDispatchToProps = dispatch => ({
//     loginRequest: () => dispatch(authActions.loginRequest()),
//     logoutSuccess: () => dispatch(authActions.logoutSuccess())
// });

export default withRouter(connect(mapStateToProps)(Home));
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));