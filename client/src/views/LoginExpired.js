import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withStyles, Dialog, DialogContent, Typography} from '@material-ui/core';
import FormBox from '../components/UI/Forms/formBox'
import BtnAction from '../components/UI/Buttons/btnAction'
import { authActions } from '../actions/auth';
import * as AuthService from '../services/AuthService';
import * as LocalStorage from '../localStorage'

const styles = (theme) => ({
    root: {
        height: "100vh",
        width: "100%",
        backgroundColor: theme.palette.primary.main,
    },
    center: {
        color: "white",
    }
})

class LoginExpired extends Component {

    componentDidMount() {
        // save userEmail for re-login
        let profile = AuthService.getProfile()
        this.setState({userEmail: profile.email ? profile.email : profile.name})
        profile = ""
        // clear local storage
        LocalStorage.clearLocalStorage()
        // start countdown to logout
        this.counter = setInterval(() => {
            const count = this.calcCount()
            if (!count) this.stopCount()
        }, 1000);
        //save the current location to local storage
        // const currentLocn = window.location.href;
        // localStorage.setItem("return_location", currentLocn)
    }

   componentWillUnmount() {
       clearInterval(this.counter)
   }

    state = {
        open: true,
        counter: 30,
        userEmail: "",
        redirect: false
    };

    submit(values) {
        // save the current location to local storage
        const currentLocn = window.location.href;
        localStorage.setItem("return_location", currentLocn)
        // authenticate user
        const handleLogout = this.handleLogout;
        AuthService.webAuth.login({ 
            realm: "Engage-Yu",
            email: this.state.userEmail,
            password: values.password,
            responseType: "token id_token"
        }, function (error) {
            if (error) {
                console.log("error: ", error);
                return handleLogout(error); 
            } 

        })
    }
    
    calcCount() {
        this.setState({counter: this.state.counter - 1})
        return this.state.counter
    }

    stopCount() {
        clearInterval(this.counter)
        this.handleLogout()
    }    
    
    handleLogout = () => {
        // set auth.isAuthenticated to false and auth.loggedOut to true
        // remove return_location from local storage
        // redirect to homepage
        this.props.logoutSuccess()
        localStorage.removeItem("return_location")
        this.setState({redirect: true})
    };


    render () {
        const { classes, pristine, handleSubmit } = this.props
        const { counter, redirect } = this.state

        if (redirect) {
            const url = `/`;
            return <Redirect to={url} />;
        }

        return (
            <div className={classes.root}>
                <Dialog
                    open={this.state.open}
                    disableBackdropClick 
                    onClose={this.handleClose}
                    aria-labelledby="dialog-title"
                    >
                        <DialogContent className={classes.center}>
                            <Typography variant='h6'>SESSION EXPIRED!</Typography>
                            <br />
                            <Typography variant="subtitle1">Enter your password to login again or click logout to logout fully</Typography>
                            <br/>
                            
                            <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                                <FormBox name="password" label="Password" rows="1"/>
                                <br />
                                <BtnAction type="submit" marginRight={true} disabled={pristine} text="resume" />
                                <BtnAction type="button" text="logout" handleAction={() => this.handleLogout()}/>
                                <Typography variant="subtitle2" inline style={{float: "right", marginTop: "16px"}}>Logout in {counter} seconds</Typography>
                            </form>

                        </DialogContent>	
                </Dialog>
            </div>
        )
    }
}  

const formData = {
	form: 'loginForm', //unique identifier for this form
	// validate    
}

const mapDispatchToProps = dispatch => ({
    logoutSuccess: () => dispatch(authActions.logoutSuccess()),
});

LoginExpired = reduxForm(formData)(LoginExpired)
LoginExpired = connect(null, mapDispatchToProps)(LoginExpired);
LoginExpired = withStyles(styles)(LoginExpired);
export default LoginExpired;
