import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import { fetchQuestions } from '../../actions/PatientAction';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PatientConsoleRoutes from './PatientConsoleRoutes';
import _ from 'lodash';


import { patientListItems, patientDashboardListItem } from "./ConsoleMenuListItems"
import { Drawer } from '@material-ui/core';

const drawerWidth = 300;

const styles = theme => ({
    root: {
        flexGrow: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        width: '100%',
    },

    appBar: {
        position: 'absolute',
        marginLeft: drawerWidth,
        zIndex: theme.zIndex.toolbar + 1,
        boxShadow: "none",
        borderBottom: '2px solid #eeeeee',
        backgroundColor: theme.palette.background.default,
        [theme.breakpoints.up('md')]: {
            width: `calc(100% - ${drawerWidth}px)`,
        },

    },

    navIconHide: {
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },

    drawerPaper: {
        width: drawerWidth,
        [theme.breakpoints.up('md')]: {
            position: 'relative',
        },
    },

    toolbar: theme.mixins.toolbar,

    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    
    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
    checked: {},
    formControl: {
        margin: theme.spacing.unit * 3,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
    consoleTitle : {
        display : "block",
    }
});

class PatientConsole extends Component {
    state = {
        mobileOpen : false,
        defaultQuestion : '',
        customQuestions : '',
        left : false,
    };
    componentWillMount() {
        this.props.fetchQuestions();
    }
    handleDrawerToggle = () => {
        this.setState(state => ({
            mobileOpen : !state.mobileOpen
        }));
    }
    toggleDrawer = (side, open) => () => {
        this.setState({
            [side]: open,
        });
    };

    render() {
        const { classes,  auth, } = this.props;
        const drawer = (
            <div style={{fontSize : 11}}>
                <div className={classes.toolbar} />
                <List>{patientListItems}</List>
            </div>
        );
        return(
            <div className={classes.root}>
                <AppBar className={classes.appBar}>
                    <Toolbar>
                        <IconButton 
                            color="darkGrey"
                            aria-label="Open Drawer"
                            onClick = {this.handleDrawerToggle}
                            className={classes.navIconHide}
                        >
                            <MenuIcon/>
                            </IconButton>
                    </Toolbar>
                </AppBar>
                <Hidden mdUp>
                    <Drawer
                        variant="temporary"
                        open={this.state.mobileOpen}
                        onClick={this.toggleDrawer('left', true)}
                        classes = {{ 
                            paper: classes.drawerPaper,
                        }}
                        
                    >
                        {drawer}
                    </Drawer>
                </Hidden>

                <Hidden smDown implementation='css'>
                    <Drawer open={this.state.left} onClose={this.toggleDrawer('left', false)}>
                        <div
                            tabIndex={0}
                            role="button"
                            onClick={this.toggleDrawer('left', false)}
                            onKeyDown={this.toggleDrawer('left', false)}
                        >
                            {drawer}
                        </div>
                    </Drawer>
                    
                </Hidden>
                <main className={classes.content}>
                    {auth.isAuthenticated && auth.profile.name ?
                        <div className={classes.consoleTitle}>
                            <Typography variant="title" noWrap>
                                Welcome {auth.profile.name}
                                <Button onClick={this.toggleDrawer('left', true)}>Menu</Button>
                            </Typography>
                        </div>
                        : null
                    }
                    <PatientConsoleRoutes {...this.props} />
                    
                    
                </main>

            </div>
        )
    }
}
PatientConsole.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, { fetchQuestions })(withStyles(styles)(PatientConsole))