import React , { Component } from 'react';
import { connect } from 'react-redux';
import { login, handleAuthentication, isAuthenticated, getProfile } from '../actions'

class Callback extends Component {

    render () {
        return(
            <div>
                Loading...
            </div>
        )
    }
}


export default (Callback);