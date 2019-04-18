import React, { Component } from 'react';
import { withStyles } from '@material-ui/core'
import LoginAppBar from '../components/Login/LoginAppBar';
import LoginLogin from '../components/Login/Login';
import LoginFooter from '../components/Login/LoginFooter';

const styles =(theme) => ({
    root: { 
        minWidth: "1160px",
        minHeight: "98vh",
        position: "relative",
        backgroundColor: theme.palette.primary.dark,
        background: "linear-gradient(to bottom, #2d404b, #1a242b)", //#28353d
        overflow: "hidden",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: "80px"
    }
})

class Login extends Component {

    render () {
        const { classes, location } = this.props        

        return(
            <div className={classes.root}>
                <LoginAppBar />
                {/* note need to pass 'location' as a prop to avoid update blocking by react router - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking */}
                <LoginLogin location={location}/> 
                <div className={classes.footer}>
                    <LoginFooter />
                </div>
            </div>
        );
    }
}

Login = withStyles(styles)(Login);
export default Login;
