import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { Redirect } from 'react-router-dom';
import { authActions } from '../reducers/modules/auth';
import * as AuthService from '../services/AuthService';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme =>({
    root: {
        flexGrow: 1,
        backgroundColor: "#2d404b",
    }, 
    toolbar: {
        width: "100%",
    },
    logoText: {
        margin: "4px 0 0 12px"
    },
    text: {
        marginTop: "12px",
    },
    avatar: {
        verticalAlign: "middle", 
        borderRadius: "50%",
        margin: "0 20px",
    },
    menuButton: {
        margin: "4px 0 0 10px",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        hover: {},
    },
    appBarBtns: {
        float: 'right',
        marginRight: "10px"
    }
});

class TopBar extends Component {  
    state = {
        redirect : false,
    }

    handleLogin = () => {
        AuthService.login();
        this.props.loginRequest();
    };

    handleLogout = () => {
        this.props.logoutSuccess();
        AuthService.logout(); // careful, this is a static method
        this.setState({redirect : true});
    };

    render () {
        
        const { isAuthenticated, profile } = this.props.auth;
        const { classes } = this.props;
        const { redirect } = this.state;

        if (redirect) {
            const url = `/`;
            return <Redirect to={url} />;
        }

        // If logged in successfully (isAuthenticated=true) 
        // Also displays user profile if present (profile=true)
        const RenderAppBarAuthUser = (props) => {
            return (
                <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>

                    <Typography variant="h5" color="inherit" className={classes.logoText}>Engage-Yu!</Typography>

                    <div>
                        <Typography variant="subtitle2"  align="right" color="inherit" inline className={classes.text}>
                            Care Group: &nbsp;&nbsp;{startCase(localStorage.getItem("provider_group_name"))}
                        </Typography> 

                        <Typography variant="subtitle2" inline color="inherit" >
                            {profile ? 
                                <span>
                                    <img src={profile.picture} height="45px" alt="profile" className={classes.avatar}/> 
                                    Welcome, &nbsp;&nbsp;Dr. {startCase(localStorage.getItem("provider_first_name"))} {startCase(localStorage.getItem("provider_last_name"))} 
                                </span>
                                :
                                <span>Error: this user has no profile</span>
                            }  
                        </Typography>
                    </div>

                    <div className={classes.appBarBtns}>
                        <Button color="inherit" className={classes.menuButton}>Help</Button>
                        <Button color="inherit" className={classes.menuButton}>Settings</Button>
                        <Button color="inherit" className={classes.menuButton} onClick={this.handleLogout}>Logout</Button> 
                    </div>

                </div>
           
            )
        }
        
        // If not logged in 
        const RenderAppBarGuest = (props) => {
            return (
                <Grid container spacing={24}>

                    <Grid item xs={10}>
                        <Typography variant="h5" color="inherit" >Engage-Yu!</Typography>
                    </Grid>
                    
                    <Grid item xs={2}>
                        <Button color="inherit" className={classes.menuButton}>FAQ</Button>
                        <Button color="inherit" className={classes.menuButton} onClick={this.handleLogin}>Login</Button> 
                    </Grid>

               </Grid>
            )
        }

        // Topbar return (checks authentication status and displays appropriate appbar)
        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary" >
                    <Toolbar>
                        { isAuthenticated ? <RenderAppBarAuthUser /> : <RenderAppBarGuest /> }
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false}) (withStyles(styles) (TopBar));