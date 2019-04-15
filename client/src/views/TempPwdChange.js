import React, { PureComponent } from 'react' ;
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import authAPI from '../utils/auth';

export default class TempPwdChange extends PureComponent {

    handlePwdChanged = () => {
        console.log("handlePwdChnaged")
        let managementAccessToken = ""
        let userId = ""
        authAPI.getAPIAccessToken()
        .then(res => {
            console.log("result1: ", res) 
            managementAccessToken = res.data.access_token
            userId = this.props.location.state.userId,
            console.log("managementAccessToken: ", managementAccessToken)
            console.log("userId: ", userId)
            authAPI.passwordTypeUpdate({
                userId,
                managementAccessToken
            })
            .then(result => {
                console.log("result: ", result)
                if (result.status === 200) {
                    console.log("Password Type successfully updated")
                    this.setState({update: true})
                }
            })
        })
        .catch(error => {
            console.log("Password update failed")
            console.log("Err: ", error)
            this.setState({error: true})
        })
    }

    render () {

        return(
            <div>
                You must change your temporary password
                <Button onClick={() => this.handlePwdChanged()}>Change Pwd</Button>
            </div>
        );
    }
}