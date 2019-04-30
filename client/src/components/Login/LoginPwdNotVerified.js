import React, { PureComponent, Fragment } from 'react' ;
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { startCase } from 'lodash'
import { Typography } from '@material-ui/core/Typography';
import FormTextPassword from '../UI/Forms/formTextPassword';
import BtnAction from '../UI/Buttons/btnAction';
import BtnActionLnk from '../UI/Buttons/btnActionLnk';
import LoginBanner from './LoginBanner'
import * as val from '../../logic/formValidations'
import authAPI from '../../utils/auth';
import jwtDecode from 'jwt-decode';

class LoginPwdNotVerified extends PureComponent {

    componentDidMount() {
        const url = new URL(decodeURIComponent(window.location.href));
        const urlToken = url.search.slice(7)
        const token =  jwtDecode(urlToken);
        this.setState({ userEmail: token.email})
        this.setState({ userId: token.sub})
        this.setState({ userName: `${startCase(token.firstname)} ${startCase(token.lastname)}` })
    }

    state = {
        userName: "",
        userEmail: "",
        userId: "",
        update: false,
        error: false,
        submitted: false
    }

    submit(values) {
        console.log("Submitted values: ", values)
        const { password, passwordConfirm } = this.props.pwdForm.syncErrors;
        if (!password && !passwordConfirm) {
            let accessToken = ""
            const { userId } = this.state
            // get the auth0 management API access token
            authAPI.getAPIAccessToken()
            .then(res => {
                console.log("result: ", res) 
                accessToken = res.data.access_token
                // then send a password change request to auth0 via management API
                authAPI.passwordChange({
                    userId,
                    accessToken,
                    newPassword: values.password
                }) 
                .then(result1 => {
                    console.log("result1: ", result1) 
                    if (result1.status === 200) {
                        console.log("Password type successfully updated")
                    }
                    // if successful, send request to update user metadata to password: "valid"
                    authAPI.passwordTypeUpdate({
                        userId,
                        accessToken
                    })  
                    .then(result2 => {
                        console.log("result2: ", result2)
                        if (result2.status === 200) {
                            console.log("Password type successfully updated")
                            this.setState({update: true})
                        }   
                    })
                })
            })
            .catch(error => {
                console.log("Password update failed")
                console.log("Err: ", error)
                this.setState({error: true})
            })
        } else  {
            this.setState({submitted: true})
        }
    }

    render () {

        const { handleSubmit, pristine, submitting} = this.props;
        const { userEmail, update, error, submitted } = this.state;

        const RenderErrorPwdMsg = () => 
            <Fragment>
                <Typography variant="subtitle1" style={{color: "red"}} gutterBottom>
                    Password update failed!
                </Typography>
                <br />
                <Typography variant="subtitle1" gutterBottom>
                    Password must be 8 or more characters long and contain at least one number and one special character (!@#$%^&*). Ensure your password confirms to these rules and try again. If the problem persists contact the system administrator. 
                    <br /> 
                </Typography>
            </Fragment>

        const RenderMsg = () => 
            <Fragment>
                <Typography variant="h4" align="center" color="primary" gutterBottom >Welcome to Engage-Yu!</Typography>
                <br />
                <Typography variant="subtitle1" color="primary">
                    Before accessing the application you must change your password from the temporary one currently asigned to you to a new secure password of your choice. Passwords must be 8 or more characters long and contain at least one number and one special character (!@#$%^&*). Longer passwords are more secure.
                </Typography>
                <br /><br />
            </Fragment>


        return(
            <LoginBanner backgroundImage={false} >

                {update ? 
                    <Fragment>
                        <Typography variant="subtitle1" style={{color: "green"}} gutterBottom>
                            Password successfully updated
                        </Typography>
                        <br />
                        <BtnActionLnk url="/login" text="login" />
                    </Fragment>

                    : 

                    <Fragment>

                        {!error ? <RenderMsg /> : <RenderErrorPwdMsg />}

                        <Typography variant="subtitle1" color="primary">
                            Enter new password for <strong>{userEmail}</strong>
                        </Typography>
                        
                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                            <FormTextPassword name="password" label="Temporary password" variant="outlined" width="320" helpText={true} submitted={submitted}/>   
                            <div style={{marginTop: "-12px"}}>
                                <FormTextPassword name="passwordConfirm" label="Confirm new passsword" variant="outlined" width="320" helpText={true} submitted={submitted}/>
                            </div>
                            <br />
                            <BtnAction type="submit" marginRight={true} disabled={submitting || pristine } text="save changes" />
                        </form>

                    </Fragment>
                }

            </LoginBanner>
        );
    }
}

function validate(values) {
    console.log("Error values: ", values) 
    const errors = {};
    errors.password = val.validatePassword(values.password)
    errors.passwordConfirm = val.validatePasswordsMatch(values.password, values.passwordConfirm)
    console.log("Errors: ", errors)
    return errors;
}

const formData = {
    form: 'ChangeTempPwdForm', //unique identifier for this form 
    validate
}
const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        pwdForm: state.form.ChangeTempPwdForm
    }
};

LoginPwdNotVerified = reduxForm(formData)(LoginPwdNotVerified)
LoginPwdNotVerified = withRouter(LoginPwdNotVerified)
LoginPwdNotVerified = connect(mapStateToProps)(LoginPwdNotVerified)
export default LoginPwdNotVerified