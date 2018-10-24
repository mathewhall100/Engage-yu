import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import {authActions} from '../reducers/modules/auth';
//import PropTypes from 'prop-types';
import Appbar from './AppBar';
import * as AuthService from '../services/AuthService';
import HomeContent from './HomeContent';

class Home extends Component {
    state= {
        redirect : false,
        role : '',
    }
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
    componentDidMount(){
        console.log("props in homepage : ", this.props);
        if(this.props.user.role){
            this.setState({
                redirect : true,
                page : this.props.user.role,
            })
        }
    }

    render () {
        const { auth, user } = this.props;
        const { redirect,  } = this.state;
        if (user.role) {
            const url = user.role === 'patient' ? `/patient` : [user.role ==='provider' ? `/admin/dashboard` : `/`];
            console.log("url : " + url);
            return <Redirect to={url}/>;
        }
        return(
            <div>
                <Appbar />
                <HomeContent />
            </div>
        );
    }
}

function mapStateToProps(state) {
    console.log("state in homepage : ", state);
    return state;
};

// const mapDispatchToProps = dispatch => ({
//     loginRequest: () => dispatch(authActions.loginRequest()),
//     logoutSuccess: () => dispatch(authActions.logoutSuccess())
// });

export default connect(mapStateToProps)(Home);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));