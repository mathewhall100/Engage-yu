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
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import Divider from '@material-ui/core/Divider';

import ListItems from "../components/ConsoleMenuListItems";
import ConsoleTitle from './ConsoleTitle';
import ConsoleRoutes from '../routes/ConsoleRoutes';


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
		[theme.breakpoints.up('lg')]: {
			width: `calc(100% - ${drawerWidth}px)`,
		},

	},
	navIconHide: {
		[theme.breakpoints.up('lg')]: {
			display: 'none',
		},
	},
	drawerPaper: {
		width: drawerWidth,
		[theme.breakpoints.up('lg')]: {
			position: 'relative',
		},
	},
	content: {
		flexGrow: 1,
		backgroundColor: theme.palette.background.default,
		padding: theme.spacing.unit*3,
		paddingTop: "64px",
		[theme.breakpoints.only('md')]: {
			marginRight: "20px",
		},
	},
	arrowIconStyles: {
		marginBottom: "-12px",
		padding: 0,
		fontSize: "56px",
		color: theme.palette.primary.main,
		'&:hover': {
			color: theme.palette.primary.dark,
			cursor: "pointer"
		}
	}
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
				const { classes } = this.props;
				const { mobileOpen } = this.state;

				const RenderListHead = () => {
					if (mobileOpen) 
						return <div align="right" >
							<ArrowLeftIcon className={classes.arrowIconStyles} onClick={this.handleDrawerToggle}/>
						</div>
					return <div style={{marginTop: 9}} />

				};
		
				const drawer = (
					<React.Fragment>
						<RenderListHead />
						<List>
							<ListItems />
						</List>
					</React.Fragment>
				);
		
				return (
					<div className={classes.root}>
						
						<AppBar className={classes.appBar}>
							<Toolbar>

								<IconButton aria-label="Open drawer" onClick={this.handleDrawerToggle} className={classes.navIconHide}>
									<MenuIcon color="primary"/>
								</IconButton>

								<ConsoleTitle />
							
							</Toolbar> 
						</AppBar>

						<Hidden lgUp>
							<Drawer variant="temporary" open={this.state.mobileOpen} onClose={this.handleDrawerToggle} classes={{paper: classes.drawerPaper}}>
								{drawer}
							</Drawer>
						</Hidden>

						<Hidden mdDown implementation="css">
							<Drawer variant="permanent" open classes={{paper: classes.drawerPaper}} >
								{drawer}
							</Drawer>
							<Divider />
						</Hidden>

						<main className={classes.content}>
							<ConsoleRoutes />
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