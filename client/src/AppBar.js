import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { withRouter, Redirect } from 'react-router-dom';
import { authActions } from './actions/auth';
import * as AuthService from './services/AuthService'
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import BtnAction from "./components/UI/Buttons/btnAction";
import ProviderName from './components/UI/providerName'


const styles = theme =>({
    root: {
        marginRight: "22px",
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        [theme.breakpoints.down('md')]: {
            marginLeft: "22px"
        }
    }, 
    toolbar: {
        width: "100%",
    },
    logoText: {
        marginTop: "4px"
    },
    text: {
        marginTop: "12px",
    },
    avatar: {
        verticalAlign: "middle", 
        borderRadius: "50%",
        margin: "0 20px",
    },
    appBarBtns: {
        float: 'right',
        margin: "8px -8px 0 0"
    }
});

class TopBar extends PureComponent {  

    state = {
        redirect : false,
    }

    handleHelp = () => {
        // this.props.history.push({pathname: '/help'}) --> when coded out
    }

    handleMyAccount = () => {
        this.props.history.push({pathname: '/account'})
    }
        
    handleLogout = () => {
        // set auth.isAuthenticated to false and auth.loggedOut to true
        AuthService.removeIdToken()
        this.setState({redirect: true})
    };

    render () {
        const { classes } = this.props;
        const { redirect } = this.state;
        const profile = JSON.parse(localStorage.getItem("auth_profile"))

        if (redirect) {
            const url = `/login`;
            return <Redirect to={url} />;
        }

        return (
            <div className={classes.root}>
                <AppBar position="static" color="primary">
                    <Toolbar >
                        <div style={{width: "100%", display: 'flex', flexDirection: 'row', justifyContent: "space-between"}}>

                        <Typography variant="h5" color="inherit" className={classes.logoText}>Engage-Yu!</Typography>

                        <div>
                            <Typography variant="subtitle2"  align="right" color="inherit" inline className={classes.text}>
                                Care Group: &nbsp;&nbsp;{startCase(localStorage.getItem("user_provider_group_name"))}
                            </Typography> 

                            <Typography variant="subtitle2" inline color="inherit" >
                                {profile ? 
                                    <span>
                                        <img src={profile.picture} height="45px" alt="profile" className={classes.avatar}/> 
                                        Welcome, &nbsp;&nbsp;
                                        <ProviderName 
                                            title={localStorage.getItem("user_provider_title")} 
                                            firstname={localStorage.getItem("user_provider_firstname")} 
                                            lastname={localStorage.getItem("user_provider_lastname")} 
                                        />
                                    </span>
                                    :
                                    <span>Error: this user has no profile</span>
                                }  
                            </Typography>
                        </div>

                        <div className={classes.appBarBtns}>
                            <BtnAction type="button" text="Help" marginRight={true} handleAction={this.handleHelp}/>
                            <BtnAction type="button" text="My Account" marginRight={true} handleAction={this.handleMyAccount} />
                            <BtnAction type="button" text="Logout" handleAction={this.handleLogout} />
                        </div>

                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        )
    }
}

TopBar.propTypes = {
    classes: PropTypes.object.isRequired,
    auth: PropTypes.shape({
        isAuthenticated: PropTypes.bool.isRequired,
        profile: PropTypes.object,
        error: PropTypes.object
    }).isRequired,
    logoutSuccess: PropTypes.func.isRequired
};

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
    logoutSuccess: () => dispatch(authActions.logoutSuccess()),
});

TopBar = connect(mapStateToProps, mapDispatchToProps, null, {pure:false})(TopBar)
TopBar = withStyles(styles)(TopBar);
TopBar = withRouter(TopBar)
export default TopBar