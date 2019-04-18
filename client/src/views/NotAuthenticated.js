import React, { Component } from 'react';
import { withStyles, Typography } from '@material-ui/core'
import LoginAppBar from '../components/Login/LoginAppBar';
import LoginFooter from '../components/Login/LoginFooter';
import BtnAction from '../components/UI/Buttons/btnAction';
import LoginBanner from '../components/Login/LoginBanner';

const styles =(theme) => ({
    root: { 
        minWidth: "1160px",
        minHeight: "98vh",
        position: "relative",
        backgroundColor: theme.palette.primary.dark,
        background: "linear-gradient(to bottom, #2d404b, #1a242b)", //#28353d
        overflow: "hidden",
    },
    bannerDiv: {
        height: "460px",
        width: "1000px",
        position: "absolute", 
        top: "45%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    center: {
        position: "absolute", 
        top: "55%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: "80px"
    }
})

class NotAuthenticated extends Component {

    render () {
        const { classes, location } = this.props  
        
        const RenderBannerTitle = () => 
            <Typography variant="h4" color="primary" gutterBottom >Whoops! You need to login to see this page!</Typography>

        return(
            <div className={classes.root}> 

                <LoginAppBar />

                <div className={classes.bannerDiv}>
                    {/* note need to pass 'location' as a prop to avoid update blocking by react router - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking */}
                    <LoginBanner backgroundImage={false}>
                        <div className={classes.center}> 
                            <RenderBannerTitle />
                            <br />
                            <br />
                            <BtnAction text="login" handleAction={() => this.props.history.push({pathname: "/login/form"}) } />
                        </div>
                    </LoginBanner> 
                </div> 

                <div className={classes.footer}>
                    <LoginFooter />
                </div>

            </div>
        );
    }
}

NotAuthenticated = withStyles(styles)(NotAuthenticated);
export default NotAuthenticated;