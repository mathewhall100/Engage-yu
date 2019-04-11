import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { authActions } from '../../actions/auth';
import * as AuthService from '../../services/AuthService';
import * as LocalStorage from '../../localStorage';
import { withStyles, Typography }  from '@material-ui/core';
import bannerImg from '../../img/dashboardBannnerImage.PNG';
import FormBox from '../UI/Forms/formBox'
import BtnAction from '../UI/Buttons/btnAction'


const styles = theme => ({
    bannerDiv: {
        height: "460px",
        width: "1000px",
        padding: "40px",
        backgroundImage: `url(${bannerImg})`,
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        borderRadius: "8px",
        position: "absolute", 
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    bannerTextBox: {
        float: "right",
    },
    bannerTitle: {
        marginBottom: "70px",
        fontWeight: "bold",
        fontSize: "62px",
        color: theme.palette.primary.main
    },
});


class HomeContent extends Component {

    componentDidMount() {
        this.clearStore()
    }

    state = {
        loginFail: false,
        errorMsg: ""
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

    clearStore = async () => {
        // set is authenticated to false/loggedOut to true then clear local storage of all data (auth, user and persisted state)
        this.props.logoutSuccess()
        LocalStorage.clearLocalStorage();
        LocalStorage.purgeState()
        console.log("Store and local storage cleared")
    }

    loginFailed = (error) => {
        console.log("loginFailed: ", error)
        let errorMsg = ""
        if (error.code === "access_denied") {errorMsg = "Incorrect email or password"}
            else if (error.code === "too_many_attempts") {errorMsg = "Too many failed login attempts. Account blocked"}
            else errorMsg = "Login Failed"
        this.setState({errorMsg: errorMsg}, () => this.setState({loginFail: true}) )
        this.props.reset('LoginForm')
    };

    render () {
        const { classes, handleSubmit, pristine, loginForm } = this.props;
        const { loginFail, errorMsg } = this.state;

        const RenderBannerTxt = () => 
             <Typography noWrap className={classes.bannerTitle}>Engage-Yu!</Typography>

        const RenderErrorMsg = (props) => 
            <Typography variant="subtitle2" color="error">{props.errorMsg}</Typography>


        return(
            <div className={classes.bannerDiv}>
                <div className={classes.bannerTextBox}>

                    <RenderBannerTxt/>

                    {loginFail && !loginForm.values ?  <RenderErrorMsg errorMsg={errorMsg}/> : <br />}

                    <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                        <FormBox name="email" label="Email" rows="1"/>
                        <FormBox name="password" label="Password" rows="1"/>
                        <br />
                        <BtnAction type="submit" disabled={pristine} text="login" />
                    </form>

                </div>
            </div>
        );
    }
}

const formData = {
	form: 'LoginForm', //unique identifier for this form
	// validate    
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

HomeContent = reduxForm(formData)(HomeContent)
HomeContent = withStyles(styles)(HomeContent)
HomeContent = withRouter(HomeContent);
HomeContent = connect(mapStateToProps, mapDispatchToProps)(HomeContent);
export default HomeContent;
