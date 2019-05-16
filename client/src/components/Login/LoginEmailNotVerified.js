import React, { Component } from 'react' ;
import { withRouter } from 'react-router'
import Typography from '@material-ui/core/Typography'
import BtnActionLnk from '../UI/Buttons/btnActionLnk'
import LoginBanner from './LoginBanner'

class EmailNotVerified extends Component {

    render () {

        const RenderBannerTitle = () => 
            <Typography variant="h4" align="center" color="primary" gutterBottom >
                Welcome to Engage-Yu!
            </Typography>

        return (
            <LoginBanner backgroundImage={false}>

                <RenderBannerTitle />

                    <br />

                    <Typography variant="subtitle1" color="primary" gutterBottom>We'd love to let you in to use the application but you have not yet verified your email addresss. Email verification is required prior to using the application so please look in your inbox for an email from us and follow the instructions to verify your email address.</Typography>
                    <br />
                    <Typography variant="subtitle1" color="primary" gutterBottom>If you do not see a verification email, this could be because:
                    <ul>
                        <li>You have not been registered to use the application. Please check with your the system administrator to ensure they have registered you.</li>
                        <li>You have been registered, but have not received a verification email. Make sure you are looking in the correct email account and please check your junk/spam boxes as well as your inbox.</li>
                        <li>You had received a verification email, but you now can't find it or it has expired. Please ask your system administrator to send another one.</li>
                    </ul>
                </Typography>

                <br /><br />

                <BtnActionLnk text="return to login page" url="form" />

            </LoginBanner>
        );
    }
}

EmailNotVerified = withRouter(EmailNotVerified)
export default EmailNotVerified