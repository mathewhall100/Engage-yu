import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { authActions } from '../../actions/auth';
import * as AuthService from '../../services/AuthService';
import { withStyles, Typography }  from '@material-ui/core';
import FormText from '../UI/Forms/formText';
import BtnAction from '../UI/Buttons/btnAction';
import LoginBanner from './LoginBanner'

const styles = theme => ({

    bannerTitle: {
        marginBottom: "60px",
        fontWeight: "bold",
        fontSize: "62px",
        color: theme.palette.primary.main
    },
    forgotPwd: {
        float: 'right',
        marginTop: "-4px",
        color: "#555",
        '&:hover': {
            color: theme.palette.primary.dark,
            cursor: "pointer"
        },
    },
    bannerTextBox: {
        float: "right",
    }
});


class Login extends Component {

    state = {
        loginFail: false,
        errorMsg: "",
    }

    submit(values) {
        console.log("Submitted values: ", values)
        const loginFailed = this.loginFailed
        AuthService.webAuth.login({
            realm: "Engage-Yu",
            email: values.email,
            password: values.password,
            responseType: "token id_token"
        }, function (err) {
            if (err) {
                console.log("error!", err)
                loginFailed(err)
            }; 
            return null
        });
    }

    loginFailed = (error) => {
        console.log("loginFailed: ", error)
        let errorMsg = ""
        switch (error.code) {
            case "access_denied":
                errorMsg = "Incorrect email or password";
                break;
            case "too_many_attempts":
                errorMsg = "Too many failed login attempts. Account blocked";
                break;
            default: errorMsg = "Login Failed"
        }
        this.setState({errorMsg: errorMsg}, () => this.setState({loginFail: true}) )
        this.props.reset('LoginForm')
    };

    handleForgetPwd = () => {
        this.props.history.push({pathname: "/login/pwdreset"})
    }

    render () {
        const { classes, handleSubmit, pristine, loginForm } = this.props;
        const { loginFail, errorMsg } = this.state;

        const RenderBannerTitle = () => 
             <Typography noWrap className={classes.bannerTitle}>Engage-Yu!</Typography>

        const RenderErrorMsg = (props) => 
            <Typography variant="subtitle2" color="error">{props.errorMsg}</Typography>


        return(
            <LoginBanner >
                <div className={classes.bannerTextBox}>

                    <RenderBannerTitle/>

                    {loginFail && !loginForm.values ?  <RenderErrorMsg errorMsg={errorMsg}/> : <br />}

                    <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                        <div style={{marginBottom: "-10px"}}>
                            <FormText type="text" name="email" label="Email" variant="outlined" width="320" helpText={false} />
                        </div>
                        <div style={{marginBottom: "10px"}}>
                            <FormText type="password" name="password" label="Password" variant="outlined" width="320" helpText={false}/>
                        </div>
                        
                        <BtnAction type="submit" disabled={pristine} text="login" />
                        <Typography variant="subtitle2" inline className={classes.forgotPwd} onClick={() => this.handleForgetPwd()}>Forgot password?</Typography>
                    </form>

                </div>
            </LoginBanner>
        );
    }
}

const formData = {
	form: 'LoginForm', //unique identifier for this form
}

const mapDispatchToProps = dispatch => ({
    logoutSuccess: () => dispatch(authActions.logoutSuccess()),
});

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        loginForm: state.form.LoginForm //Make form state available in component
    }
};

Login = reduxForm(formData)(Login)
Login = withStyles(styles)(Login)
Login = withRouter(Login);
Login = connect(mapStateToProps, mapDispatchToProps)(Login);
export default Login;