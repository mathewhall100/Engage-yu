import React, { Component } from 'react';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import MenuIcon from '@material-ui/icons/Menu';
import ListItems from "./ConsoleMenuListItems";
import ConsoleTitle from '../containers/ConsoleTitle';
import ConsoleRoutes from './ConsoleRoutes';

const drawerWidth = 255;

const styles = theme => ({

  root: {
    flexGrow: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },

  appBar: {
    position: 'absolute',
    marginLeft: -1 * drawerWidth,
    zIndex: theme.zIndex.drawer + 1,
    boxShadow: "none",
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
  //toolbar: theme.mixins.toolbar,
  toolbarCompensatePadding: {
    paddingTop: 40,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});


class Console extends Component { 

    state = {
        mobileOpen: false,
        consoleTitle: "Dashboard",
      };
    
      handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
      };
    
      render() {
        const { classes, theme } = this.props;
    
        const drawer = (
          <div style={{fontSize: 11}}>

            {/* <div className={classes.toolbar} />  */}
            <List>
              <ListItems />
            </List>

          </div>
        );
    
        return (
          <div className={classes.root}>

            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="Open drawer"
                  onClick={this.handleDrawerToggle}
                  className={classes.navIconHide}
                >
                <MenuIcon />
                </IconButton>
                <div className="classes.consoleTitle">
                  <Typography variant="title"  noWrap>
                    <ConsoleTitle />
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>

            <Hidden mdUp>
              <Drawer
                variant="temporary"
                open={this.state.mobileOpen}
                onClose={this.handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper,
                }}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>

            <Hidden smDown implementation="css">
              <Drawer
                variant="permanent"
                open
                classes={{
                  paper: classes.drawerPaper,
                }}
              >
                {drawer}
              </Drawer>
            </Hidden>

            <main className={classes.content}>
              <div className={classes.toolbarCompensatePadding}>

                <ConsoleRoutes />
                
              </div>
            </main>
          </div>
          
        );
    }
  };

Console.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default connect(null,null,null, {pure:false}) (withStyles(styles, {withTheme: true})(Console))