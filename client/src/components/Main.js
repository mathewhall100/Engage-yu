import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, handleAuthentication, isAuthenticated, getProfile} from '../actions'

class Main extends Component {
    componentDidMount() {
        this.props.isAuthenticated();
        console.log("Main : ", this.props);
    }
    render () {
        const {authenticated } = this.props
        console.log(authenticated)
        return(
            <div>
                
                {authenticated === 2 || authenticated === 0 ?

                <div>
                    <hr/>
                        Please login first <br />
                        <button onClick={this.props.login}>Login</button>
                    <hr />
                </div>
                
                :
                <p className="App-intro">
                    Hello {this.props.profile ? this.props.profile.nickname : "" } ! <br/>
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