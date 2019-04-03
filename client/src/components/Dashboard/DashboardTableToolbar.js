import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Toolbar, Typography,  Tooltip, IconButton} from '@material-ui/core';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormMultipleSelectWithChips from '../UI/Forms/formMultipleSelectWithChips';


const toolbarStyles = theme => ({
	root: {
	  paddingRight: theme.spacing.unit,
	},
	spacer: {
	  flex: '1',
	},
	selects: {
	  margin: "16px 40px 0 0",
	},
	title: {
	  flex: '0 0 auto',
	},
	navLinks: {
	  marginRight: "20px",
	  textDecoration: "underline",
	  color: "#666666",
	  fontWeight: 400,
	  '&:hover': {
		color: theme.palette.primary.main,
		cursor: "pointer",
		fontWeight: 500,
		marginRight: "18.5px"
	  },
	},
	customWidth: {
		maxWidth: "100px",
	},
	filterIconPosn: {
		marginLeft: "8px"
	},
	filterIconBox: {
		margin: "28px 16px 0 0",
	},
		filterIconStyles: {
		fontSize: "32px",
	},
});


class DashboardTableToolbar extends Component {  

	componentDidMount() {
		this.setState({navLinksSwitch: this.props.navLinksSwitch})
	}
	
	state = {
		navLinksFilter: "",
		navLinksSwitch: ""
	}
	  
	handleNavLinksFilter = (filter) => {
		this.setState({navLinksSwitch: filter})
		this.props.navLinksFilter(filter)
	}

	handleStatusFilter = filter => {
		this.props.statusFilter(filter)
	}

	handleCheckedFilter = () => {
		this.props.checkedFilter()
	}

	render() { 

		const { classes, initialStatus } = this.props;
		const { navLinksSwitch } = this.state

		const multipleSelectMenuItems = ["active", "awaiting review", "pending"]

		const navLinks = [
			{tooltip: "Select diary cards requested by me", key: "requester",  text: "As requester"},
			{tooltip: "Select diary cards where I am the patient's primary provider", key: "rprovider",  text: "As primary provider"},
			{tooltip: "Select all diary cards where I am the requester or primary provider", key: "all",  text: "All"},
		]

		 const getNavLinkStyles = (navLinksSwitch, navKey) => {
			if (navLinksSwitch === navKey) {return {color: "#000000", fontWeight: 500}}
		}

		const RenderNavLink = (props) => 
			<Tooltip title={props.tooltip} classes={{tooltip: classes.customWidth}} >
				<Typography variant="body2" inline
					className={classes.navLinks} 
					style={getNavLinkStyles(navLinksSwitch, props.navKey)} 
					onClick = {() => this.handleNavLinksFilter(props.navKey)}>
						{props.text}
				</Typography> 
			</Tooltip>
	
		return (
			<Toolbar className={classes.root}>
				<div className={classes.title}>

					<span>
						<Typography variant="h6" gutterBottom>
							My Active Diary Cards
						</Typography>
						<Typography variant="caption">
							{ navLinks.map((navLink, idx) => {
								return (
									<RenderNavLink 
										key={idx}
										tooltip={navLink.tooltip}
										navKey={navLink.key}
										text={navLink.text}
									/>
								)
							}) }
						</Typography>
					</span>

				</div>
		
				<div className={classes.spacer} />
	
				<span className={classes.selects}>
					<FormMultipleSelectWithChips menuItems={multipleSelectMenuItems} selectStatus={this.handleStatusFilter} initialStatus={initialStatus}/>
				</span>

				<div className={classes.filterIconBox}>
					<Typography variant="caption" >Filter checked</Typography>
					<IconButton aria-label="Filter list" className={classes.filterIconPosn} onClick = {() => this.handleCheckedFilter()}>
						<FilterListIcon className={classes.filterIconStyles}/>
					</IconButton>
				</div>
		
			</Toolbar>
			);
		}
	};

DashboardTableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
};
  
DashboardTableToolbar = withStyles(toolbarStyles)(DashboardTableToolbar)
export default DashboardTableToolbar
