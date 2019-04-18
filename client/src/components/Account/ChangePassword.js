import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { withRouter } from 'react-router-dom';
import { withStyles, Typography } from '@material-ui/core';
import FormTextPassword from '../../components/UI/Forms/formTextPassword';
import BtnAction from '../../components/UI/Buttons/btnAction';
import { validatePassword, validatePasswordsMatch } from '../../logic/formValidations';
import * as AuthService from '../../services/AuthService';
import * as UserService from '../../services/UserService';
import authAPI from '../../utils/auth';

const styles = theme => ({

})


class AccountChangePassword extends Component {

    componentDidMount() {
        // save userEmail for use later
        this.setState({userEmail: AuthService.getEmail() })
    }

    state = {
        userEmail: "",
        update: false,
        error: false,
        submitted: false
    }

    submit(values) {
        console.log("Submitted values: ", values)
        let accessToken = ""
        authAPI.getAPIAccessToken()
        .then(result => {
            //console.log("result: ", result) 
            accessToken = result.data.access_token
            authAPI.passwordChange({
                userId: UserService.getUserId(),
                newPassword: values.password,
                accessToken
            })
            .then(result => {
                //console.log("result: ", result)
                if (result.status === 200) {
                    console.log("Password successfully updated")
                    this.setState({update: true})
                }
            })
        })
        .catch(error => {
            console.log("Password update failed")
            console.log("Error: ", error)
            this.setState({error: true})
        })
    }

    handleCancel = () => {
        this.props.history.push({pathname: '/account'})
    }

    render() {
        const { classes, handleSubmit, pristine} = this.props;
        const { userEmail, update, error, submitted } = this.state;

        if (update) 
            return  <Typography variant="subtitle1" style={{color: "green"}} gutterBottom>
                Password successfully updated
            </Typography>
        
        const RenderErrorPwdMsg = () => 
            <Fragment>
                <Typography variant="subtitle1" style={{color: "red"}} gutterBottom>
                        Password update failed!
                    </Typography>
                    <br />
                    <Typography variant="subtitle1" gutterBottom>
                        This is most likey because it contained a common word or phrase or you reused one of your previous passwords. Try again with an original password that you have not used before. 
                    <br /> 
                </Typography>
            </Fragment>

        const RenderMsg = () => 
            <Typography variant="subtitle1" gutterBottom>
                Enter new password for <strong>{userEmail}</strong>
            </Typography>


        return (
            <Fragment>

                {!error ? <RenderMsg /> : <RenderErrorPwdMsg />}

                <form onSubmit={handleSubmit(this.submit.bind(this))}>
                    <FormTextPassword name="password" label="New Password" width="320" variant="outlined" helpText={true} />
                    <div style={{marginTop: "-12px"}}>
                        <FormTextPassword name="passwordConfirm" label="Confirm new passsword" width="320" variant="outlined" helpText={true} />
                    </div>
                    <br />
                    <BtnAction type="submit" marginRight={true} disabled={pristine} text="save changes" />
                </form>

         </Fragment>
        )
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
    form: 'ChangePassswordForm', //unique identifier for this form 
    validate
}

AccountChangePassword = withRouter(AccountChangePassword)
AccountChangePassword = reduxForm(formData)(AccountChangePassword)
AccountChangePassword = withStyles(styles)(AccountChangePassword)
export default AccountChangePassword