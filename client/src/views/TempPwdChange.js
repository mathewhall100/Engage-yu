import React, { PureComponent, Fragment } from 'react' ;
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { startCase } from 'lodash'
import { withStyles, Typography } from '@material-ui/core';
import FormTextPassword from '../components/UI/Forms/formTextPassword';
import BtnAction from '../components/UI/Buttons/btnAction';
import BtnActionLnk from '../components/UI/Buttons/btnActionLnk';
import { validatePassword, validatePasswordsMatch } from '../logic/formValidations';
import * as AuthService from '../services/AuthService';
import authAPI from '../utils/auth';
import jwtDecode from 'jwt-decode';

const styles = theme => ({

})

class TempPwdChange extends PureComponent {

    componentDidMount() {
        const url = new URL(decodeURIComponent(window.location.href));
        const urlToken = url.search.slice(7)
        console.log("url: ", urlToken)
        const token =  jwtDecode(urlToken);
        console.log('token: ', token)
        this.setState({ userEmail: token.email})
        this.setState({ userId: token.sub})
        this.setState({ userName: `${startCase(token.firstname)} ${startCase(token.lastname)}` })
    }

    state = {
        userName: "",
        userEmail: "",
        userId: "",
        update: false,
        error: false
    }

    submit(values) {
        console.log("Submitted values: ", values)
        let accessToken = ""
        const { userId, userEmail } = this.state
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
    }

    render () {

        const { classes, handleSubmit, pristine} = this.props;
        const { userEmail, userName, update, error } = this.state;

        if (update) 
            return  <Fragment>
                <Typography variant="subtitle1" style={{color: "green"}} gutterBottom>
                    Password successfully updated
                </Typography>
                <BtnActionLnk url="/" text="login" />
            </Fragment>
               
            
        
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
                <Typography variant="h6" gutterBottom>
                    Welcome {userName}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Thnak you for logging on to Engage-Yu!
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Before accessing the application you must change your password from the temporary one currently asigned to you to a new secure password of your choice. Passwords must be 8 or more characters long and contain at least one number and one special character (!@#$%^&*). Longer passwords are more secure.
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Enter new password for <strong>{userEmail}</strong>
                </Typography>
            </Fragment>

        return(
            <Fragment>

                {!error ? <RenderMsg /> : <RenderErrorPwdMsg />}
                
                <br />

                <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                    <FormTextPassword name="password" label="New Password" width="320" variant="outlined"/>
                    <br /> 
                    <FormTextPassword name="passwordConfirm" label="Confirm new passsword" width="320" variant="outlined"/>
                    <br /> <br />
                    <BtnAction type="submit" marginRight={true} disabled={pristine} text="save changes" />
                </form>

         </Fragment>
        );
    }
}

const validate = (values) => {
    //console.log("Error values: ", values) 
    const errors = {};
    errors.password = validatePassword(values.password)
    errors.passwordConfirm = validatePasswordsMatch(values.password, values.passwordConfirm)
    //console.log("Errors: ", errors)
    return errors;
}

const formData = {
    form: 'ChangeTempPassswordForm', //unique identifier for this form 
    validate
}

TempPwdChange = withRouter(TempPwdChange)
TempPwdChange = reduxForm(formData)(TempPwdChange)
TempPwdChange = withStyles(styles)(TempPwdChange)
export default TempPwdChange