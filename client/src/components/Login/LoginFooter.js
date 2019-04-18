import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'

class LoginFooter extends Component {
    render() {
        return (
            <Fragment>
                <Typography variant="subtitle1" align="center" color="secondary"><span style={{fontSize: "20px"}}>&copy;</span> Engage-Yu 2019</Typography>
                <Typography variant="subtitle1" align="center" color="secondary" gutterBottom>Patient engagement solutions for Parkinson disease.</Typography>
            </Fragment>
        )
    }
}

export default LoginFooter