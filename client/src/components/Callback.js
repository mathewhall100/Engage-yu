import React , { Component } from 'react';
import { connect } from 'react-redux';
import { login, handleAuthentication, isAuthenticated, getProfile } from '../actions'

class Callback extends Component {
    componentDidMount() {
        this.props.handleAuthentication();
    }
    render () {
        return(
            <div>
                Loading...
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

export default connect(mapStateToProps, { login, handleAuthentication, isAuthenticated, getProfile })(Callback);