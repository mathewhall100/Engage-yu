import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { Redirect } from 'react-router-dom';
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
        width: 'auto'
    }, 
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
            [theme.breakpoints.up(1280 + theme.spacing.unit * 3 * 2)]: {
            maxWidth: 1280,
                marginLeft: theme.spacing.unit * 3,
                marginRight: theme.spacing.unit * 3,
            }
    },
    flex: {
        flexGrow: 1,
    },
    loseShadow: {
        boxShadow: "none"
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
    state = {
        redirect : false,
    }
    handleLoginClick = () => {
        AuthService.login();
        this.props.loginRequest();
    };

    handleLogoutClick = () => {
        this.props.logoutSuccess();
        AuthService.logout(); // careful, this is a static method
        this.setState({redirect : true});
    };

    renderProfile(profile, isAuthenticated) {
        return(
            profile && isAuthenticated ?
                <p><img src={profile.picture} height="40px" alt="profile" style={{verticalAlign: "middle", borderRadius: "50%"}} /> &nbsp;&nbsp;Welcome, &nbsp;&nbsp;Dr. {startCase(localStorage.getItem("provider_first_name"))} {startCase(localStorage.getItem("provider_last_name"))} </p>
            : null
        );
    }

    render () {
        
        const { isAuthenticated, profile } = this.props.auth;
        const { classes } = this.props;
        const { redirect } = this.state;
        if (redirect) {
            const url = `/`;
            return <Redirect to={url} />;
        }
        return (
                <div className={isAuthenticated ? classes.root : classes.layout}>

                    <AppBar position="static" className={isAuthenticated ? null : classes.loseShadow}>
                        <ToolBar style={{backgroundColor: "#2d404b" }}>
                            <Typography variant="display1" color="inherit" align="left" className={classes.flex}>
                                Engage-Yu!
                            </Typography>

                            {isAuthenticated && <Typography variant="subheading" color="inherit" align="center" className={classes.flex}>
                            Care Group: &nbsp;&nbsp;{startCase(localStorage.getItem("provider_group_name"))}
                             </Typography> }

                            <Typography variant="subheading" color="inherit" align="right" className={classes.welcomeText}>
                                {this.renderProfile(profile, isAuthenticated)}
                            </Typography>

                            <Button color="inherit" className={classes.menuButton}>Help</Button>

                            {!isAuthenticated ? 
                                ( <Button color="inherit" className={classes.menuButton} onClick={this.handleLoginClick}>Login</Button> )
                                :
                                ( <Button color="inherit" className={classes.menuButton} onClick={this.handleLogoutClick}>Logout</Button> )
                            }
                        </ToolBar>
                    </AppBar>

                </div >
        );
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    // history: PropTypes.shape({
    //     push: PropTypes.func.isRequired
    // }).isRequired,
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