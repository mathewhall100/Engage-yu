import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Typography from '@material-ui/core/Typography'
import DashboardIcon from '@material-ui/icons/Dashboard';
import SearchIcon from '@material-ui/icons/Search';
import PollIcon from '@material-ui/icons/Poll';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import WcIcon from '@material-ui/icons/Wc';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BuildIcon from '@material-ui/icons/Build';
import Divider from '@material-ui/core/Divider';


export default class ListItems extends Component {

	state = {
		selectedIndex: 0,
	}

	handleListItemClick = (event, index) => {
		localStorage.setItem("patient_id", "")
		this.setState({ selectedIndex: index });
	};

	render() {

		const list = [
			{title: "Dashboard", icon: <DashboardIcon color="primary" />, lnk: "/admin/dashboard"},
			{title: "divider", text: "My workflow"},
			{title: "Find patient", icon: <SearchIcon color="primary" />, lnk: "/admin/find"},
			{title: "Enroll new patient", icon: <PersonAddIcon color="primary" />, lnk: "/admin/enroll"},
			{title: "Custom questions", icon: <BuildIcon color="primary" />, lnk: "/admin/dashboard"},
			{title: "divider", text: "Admin"},
			{title: "Manage providers", icon: <SupervisorAccountIcon color="primary" />, lnk: "/admin/provider"},
			{title: "Manage care groups", icon: <SupervisorAccountIcon color="primary" />, lnk: "/admin/caregroup"}
		]

		// Render individual list item (navigation link in console menu)
		const RenderListItem = (props) => 
			<ListItem 
				button
				component={Link} to={`${props.lnk}`}
				selected={this.state.selectedIndex === props.idx}
				onClick={event => this.handleListItemClick(event, props.idx)}>
				<ListItemIcon>
					{props.icon}
				</ListItemIcon>
				<ListItemText primary={props.title}/>
			</ListItem>

		// ListItems return (renders console navigation items)
		return (
			<React.Fragment>

				{ list.map((item, idx) => {
						return (
							<React.Fragment key={idx}>
								{ item.title === "divider" ?
									<React.Fragment>
										<Divider />
										<ListSubheader>
											<Typography variant="button" color="primary">{item.text}</Typography>
										</ListSubheader>
									</React.Fragment>
								: <RenderListItem idx={idx} title={item.title} lnk={item.lnk} icon={item.icon} />  
								}
							</React.Fragment>
						)
				}) }

			</React.Fragment>
		)
	}
};

