import React, { Component, Fragment } from 'react' ;
import { withRouter } from 'react-router'
import { reduxForm } from 'redux-form';
import { withStyles, Typography } from '@material-ui/core'
import BtnAction from '../UI/Buttons/btnAction'
import FormText from '../UI/Forms/formText'
import LoginBanner from './LoginBanner'
import { validateEmail } from '../../logic/formValidations';
import authAPI from '../../utils/auth'


const styles = theme => ({
	textField: {
        width: "100%",
        }
})

class LoginPwdReset extends Component {

    state = {
        content: "form"
    }

	//Handle form submission and save message
	submit(values) {
        console.log("Submitted values: ", values);
        authAPI.passwordReset({
            email: values.email
        })
        .then(res => {
            console.log(res.data)
            this.setState({dialogContent: "sent"})
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.code === "401") {this.setState({dialogContent: "invalid"})}
				else this.setState({reset: "error"})
        })
		this.handleClose()
	}

	handleClose = () => {
		this.props.history.push({pathname: "/login/form"})
	};

    render() {

		const { classes, handleSubmit, pristine } = this.props;
		const { content } = this.state

		const RenderResetSent = () => 
			<Fragment>
				<Typography variant="subtitle2" gutterbottom>Email sent</Typography>
				<Typography variant="subtitle2" gutterbottom>Please check your inbox for a password reset emial and follow the instructions on the email to reset your password.</Typography>
			</Fragment>

		const RenderResetError= () => 
			<Fragment>
				<Typography variant="subtitle2" gutterbottom>An error occurred</Typography>
				<Typography variant="subtitle2" gutterbottom>Unfortuneately an error occurred and your password cannot be reset at this time.</Typography>
			</Fragment>

		const RenderAddressError = () => 
			<Fragment>
				<Typography variant="subtitle2" gutterbottom>Email not recognised</Typography>
				<Typography variant="subtitle2" gutterbottom>The email address entered was not recognised.</Typography>
			</Fragment>

        const RenderBannerTitle = () => 
            <Fragment>
                <Typography variant="h4" align="center" color="primary" gutterBottom >Engage-Yu!</Typography>
                <br />
                <Typography variant="h5" color="primary" gutterBottom >Password Reset</Typography>
            </Fragment>

		return (
            <LoginBanner backgroundImage={false} >
                <RenderBannerTitle />
                <br />

                {content === "form" && 
                    <content>
                        <Typography variant="subtitle2" gutterBottom>Enter the email address which you use to login in to to the application. If it matches, we will send an email with instructions on how to reset your password to this address.</Typography> 
                        <br />
                        <form className={classes.formContainer} noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                            <FormText
                            name="email"
                            label="Email"
                            variant="outlined"
                            width="320"
                            helpText={true}
                            />
                            <br />
                            {content === "form" && <BtnAction type="submit" disabled={pristine} text="reset" marginRight={true}/>}
                            <BtnAction text="cancel" handleAction={this.handleClose} warning={true}/>
                        </form>
                    </content>}

                {content === "sent"  && <RenderResetSent />}

                {content === "error"  && <RenderResetError />}

                {content === "invalid"  && <RenderAddressError />}

            </LoginBanner>
		);
	}
}

function validate(values) {
	console.log("Error values: ", values) 
	const errors = {}; // error accumulator
	errors.email = validateEmail(values.email, true)
	console.log("Errors: ", errors)
	return errors;
}


const formData = {
	form: 'PwdResetForm', //unique identifier for this form
	validate   
}

LoginPwdReset = withRouter(LoginPwdReset)
LoginPwdReset = reduxForm(formData)(LoginPwdReset)
LoginPwdReset = withStyles(styles, {withTheme: true})(LoginPwdReset)
export default LoginPwdReset;