import React, { Component } from 'react' ;
import { withRouter } from 'react-router-dom';
import {  withStyles, Typography } from '@material-ui/core'
import BtnAction from '../UI/Buttons/btnAction'
import LoginBanner from './LoginBanner'

const styles = theme => ({
    center: {
        position: "absolute", 
        top: "55%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    }
})

class EmailNotVerified extends Component {
    componentDidMount() {
        console.log("CDM LoginNotFound")
    }

    render () {
        const { classes } = this.props

        const RenderBannerTitle = () => 
            <Typography variant="h4" color="primary" gutterBottom >Whoops! Page not Found</Typography>

        return(
            <LoginBanner backgroundImage={false}>
                <div className={classes.center}> 
                    <RenderBannerTitle />
                    <br />
                    <br />
                    <BtnAction text="return home" handleAction={() => this.props.history.push({pathname: "/login/form"}) } />
                </div>
            </LoginBanner>
        );
    }
}

EmailNotVerified = withRouter(EmailNotVerified)
export default withStyles(styles)(EmailNotVerified)