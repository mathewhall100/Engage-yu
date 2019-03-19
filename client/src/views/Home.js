import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { withRouter, Redirect } from 'react-router-dom';
// import {authActions} from '../reducers/modules/auth';
// import * as AuthService from '../services/AuthService';
import Appbar from '../AppBar';
import HomeContent from '../components/Home/HomeContent';

class Homepage extends Component {
    state= {
        redirect : false,
        role : '',
    }
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
        // const { auth, user } = this.props;
        // const { redirect,  } = this.state;
        // if (user.role) {
        //     const url = user.role === 'patient' ? `/patient` : (user.role ==='provider' ? `/admin/dashboard` : `/`);
        //     console.log("url : " + url);
        //     return <Redirect to={url}/>;
        // }
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
    return {
        // user: state.user
    }
};

// const mapDispatchToProps = dispatch => ({
//     loginRequest: () => dispatch(authActions.loginRequest()),
//     logoutSuccess: () => dispatch(authActions.logoutSuccess())
// });

export default connect(mapStateToProps)(Homepage);
// export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));