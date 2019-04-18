import React, { Component, } from 'react';
import { connect } from 'react-redux';
import { withStyles }  from '@material-ui/core';
import { authActions } from '../../actions/auth'
import LoginRoutes from '../../routes/LoginRoutes'
import * as LocalStorage from '../../localStorage';


const styles = theme => ({
    bannerDiv: {
        height: "460px",
        width: "1000px",
        position: "absolute", 
        top: "45%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    bannerTextBox: {
        float: "right",
    },
});


class Login extends Component {

    componentDidMount() {
        // purge all app data ready for fresh login/re-login
        this.purgeAppData()
    }

    purgeAppData = () => {
        // set isAuthenticated flag to false/loggedOut to true then clear local storage of all data (auth, user and persisted state)
        this.props.dispatch(authActions.logoutSuccess())
        LocalStorage.clearStore();
        console.log("Store and local storage cleared")
    }


    render () {
        const { classes } = this.props;

        return(
            <div className={classes.bannerDiv}>
                <LoginRoutes />
            </div>
        );
    }
}
Login = connect()(Login)
Login = withStyles(styles)(Login)
export default Login;
