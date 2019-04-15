import React, { PureComponent } from 'react' ;
import BtnActionLnk from '../components/UI/Buttons/btnActionLnk'

export default class NotFound extends PureComponent {
    render () {
        return(
            <div>
                <p>You must verify your email address before accessing the application.</p>
                <br />
                <p>Please look in your inbox for the verification email and follow the instructions to verify your email address.</p>
                <br />
                <p>If you do not see a verification email, this could be because:</p>
                <ol>
                    <li>You have not been registered to use the application> please check with your the application administrator in your care group to ensure they have registered you.</li>
                    <li>You have been registered, but have not received a verification email. Make sure you are looking in the correct email account and please check your junk/spam boxes as well as your inbox.</li>
                    <li>You had received a verification email, but you now can't find it. Ask your application administrator to send another one.</li>
                    <li>You had received a verification email, but it has now expired. Ask your application administrator to send another one.</li>
                    <li>You are sure you have been registerd but have not recieved a verification email. Pleas ask your application administartor to check your registartion and reregister you/resend a new email as required</li>
                    <li>Can't I just logon now and use the application then verify my email later?. Unfortuneately, email verification of all users is an importnat way we keep the application and patiet data it uses confidential and securwe, so all users must verify their email address before being able to access and use the application.</li>
                </ol>
                <br />
                <br />
                <BtnActionLnk text="return to login page" url="/" />
            </div>
        );
    }
}