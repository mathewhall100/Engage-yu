import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, handleAuthentication, isAuthenticated, getProfile} from '../actions'

class Main extends Component {
    render () {
        
        return(
            <div>
                
                {!this.props.authenticated ?

                <div>
                    <hr/>
                    Please login first
                    <hr/>
                        <button onClick={this.props.login}>Login</button>
                </div>
                :
                <p className="App-intro">
                    Hello, {this.props.name } ! <br/>
                    Go to the secret page ? <a href='/secret'>Click here </a>
                </p>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    console.log("State in main : " , state);
    const { authenticated, error, id_token, loading, profile } = state.auth
    return {
        authenticated, error, id_token, loading, profile
    }
}

export default connect(mapStateToProps, { login, handleAuthentication, isAuthenticated, getProfile})(Main);