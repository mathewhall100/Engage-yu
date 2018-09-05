import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { authActions } from '../reducers/modules/auth';
import * as AuthService from '../services/AuthService';

const styles = theme =>({
    root: {
        flexGrow: 1,
    }, 

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#28353d",
        },
        hover: {},
    },
});

class TopBar extends Component {  
    
    handleLoginClick = () => {
        AuthService.login();
        this.props.loginRequest();
    };

    handleLogoutClick = () => {
        this.props.logoutSuccess();
        AuthService.logout(); // careful, this is a static method
        <Redirect to ='/' />
    };

    renderProfile(profile, isAuthenticated) {
        console.log("profile : ", profile);
        return(
            profile && isAuthenticated ?
                <p><img src={profile.picture} height="40px" alt="profile" style={{verticalAlign: "middle"}} /> Welcome! {profile.name} </p>
            : null
        );
    }

    render () {
        console.log("Auth props : ", this.props);
        const { isAuthenticated, profile } = this.props.auth;
        console.log("Profile : ", JSON.stringify(profile))
        
        // if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!isAuthenticated ) {return <Redirect to='/' />};

        const { classes } = this.props;

        return (
                <div className="classes.root">

                    <AppBar position="static">
                        <ToolBar style={{backgroundColor: "#2d404b"}}>
                            <Typography variant="display1" color="inherit" align="left" className={classes.flex}>
                                Engage-Yu!
                            </Typography>

                            <Typography variant="subheading" color="inherit" align="center" className={classes.flex}>
                                Care Group: The Cleveland Practice
                            </Typography>

                            <Typography variant="Body2" color="inherit" align="right" className={classes.welcomeText}>
                            {this.renderProfile(profile, isAuthenticated)}
                                 {/* [this.props.profile.given_name this.props.profile.family_name] */}
                            </Typography>
                            <Button color="inherit" className={classes.menuButton}>Help</Button>
                            {!isAuthenticated ? 
                            (
                                <Button color="inherit" className={classes.menuButton} onClick={this.handleLoginClick}>Login</Button>
                            ):
                            (
                                <Button color="inherit" className={classes.menuButton} onClick={this.handleLogoutClick}>Logout</Button>
                            )
                            }
                            

                            
                        </ToolBar>
                    </AppBar>

                </div >
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    history: PropTypes.shape({
        push: PropTypes.func.isRequired
    }).isRequired,
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        error: PropTypes.object
    }).isRequired,
    loginRequest: PropTypes.func.isRequired,
    logoutSuccess: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
    loginRequest: () => dispatch(authActions.loginRequest()),
    logoutSuccess: () => dispatch(authActions.logoutSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps,null, {pure:false}) (withStyles(styles) (TopBar));