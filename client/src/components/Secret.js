import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, logout, handleAuthentication, isAuthenticated, getProfile } from '../actions'

class Secret extends Component {
    
    logoutUser() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.props.authenticated = false;
        console.log("User logout");
        this.props.history.push('/');

    }
    render () {
        console.log("Props : ", this.props);
        return (
            <div>
                This is a secret area.
                <br />
                <button onClick={this.props.logout}>Logout</button>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    console.log("State in main : ", state);
    const { authenticated, error, id_token, loading, profile } = state.auth
    return {
        authenticated, error, id_token, loading, profile
    }
}

export default connect(mapStateToProps, { login, logout, handleAuthentication, isAuthenticated, getProfile })(Secret);