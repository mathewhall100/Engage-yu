import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { authActions } from '../../actions/auth';
import * as AuthService from '../../services/AuthService';
import * as LocalStorage from '../../localStorage';
import { withStyles, Typography }  from '@material-ui/core';
import bannerImg from '../../img/dashboardBannnerImage.PNG';
import FormText from '../UI/Forms/formText';
import BtnAction from '../UI/Buttons/btnAction';
import HomePwdResetDialog from './HomePwdResetDialog';

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
    forgotPwd: {
        float: 'right',
        marginTop: "-4px",
        color: "#555",
        '&:hover': {
            color: theme.palette.primary.dark,
            cursor: "pointer"
        },
    }
});


class HomeContent extends Component {

    componentDidMount() {
        this.clearStore()
    }

    state = {
        loginFail: false,
        errorMsg: "",
        openDialog: false
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
        LocalStorage.clearStore();
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

    handleForgetPwd = () => {
        this.setState({openDialog: true})
    }

    render () {
        const { classes, handleSubmit, pristine, loginForm } = this.props;
        const { loginFail, errorMsg, openDialog } = this.state;

        const RenderBannerTxt = () => 
             <Typography noWrap className={classes.bannerTitle}>Engage-Yu!</Typography>

        const RenderErrorMsg = (props) => 
            <Typography variant="subtitle2" color="error">{props.errorMsg}</Typography>


        return(
            <Fragment>
                <div className={classes.bannerDiv}>
                    <div className={classes.bannerTextBox}>

                        <RenderBannerTxt/>

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
                </div>
                
                {openDialog && <HomePwdResetDialog />}
            
            </Fragment>
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

HomeContent = reduxForm(formData)(HomeContent)
HomeContent = withStyles(styles)(HomeContent)
HomeContent = withRouter(HomeContent);
HomeContent = connect(mapStateToProps, mapDispatchToProps)(HomeContent);
export default HomeContent;
