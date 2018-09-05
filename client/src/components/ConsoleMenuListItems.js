import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
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
    this.setState({ selectedIndex: index });
  };

  render() {

    return (

      <div>

        <ListItem 
          button
          component={Link} to='/admin/dashboard'
          selected={this.state.selectedIndex === 0}
          onClick={event => this.handleListItemClick(event, 0)}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>

        <Divider />
        <ListSubheader>My workflow</ListSubheader>

        <ListItem 
          button
          
          selected={this.state.selectedIndex === 1}
          onClick={event => this.handleListItemClick(event, 1)}>
          
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Find Patient" />
        </ListItem>

        <ListItem 
          button
          selected={this.state.selectedIndex === 2}
          onClick={event => this.handleListItemClick(event, 2)}
          >
          <ListItemIcon>
            <PollIcon />
          </ListItemIcon>
          <ListItemText primary="My Surveys" />
        </ListItem>

        <ListItem 
          button
          component={Link} to='/admin/enroll'
          selected={this.state.selectedIndex === 3}
          onClick={event => this.handleListItemClick(event, 3)}> 
          <ListItemIcon>
            <PersonAddIcon />
          </ListItemIcon>
          <ListItemText primary="Enroll Patient" />
        </ListItem>

        <ListItem 
          button
          selected={this.state.selectedIndex === 4}
          onClick={event => this.handleListItemClick(event, 4)}>
          <ListItemIcon>
            <ContactPhoneIcon />
          </ListItemIcon>
          <ListItemText primary="Contact Patient" />
        </ListItem>

        <Divider />
        <ListSubheader>Admin</ListSubheader>

        <ListItem 
          button
          selected={this.state.selectedIndex === 5}
          onClick={event => this.handleListItemClick(event, 5)}>
          <ListItemIcon>
            <WcIcon />
            </ListItemIcon>
          <ListItemText primary="Manage Patients" />
        </ListItem>

        <ListItem 
          button
          selected={this.state.selectedIndex === 6}
          onClick={event => this.handleListItemClick(event, 6)}>
          <ListItemIcon>
            <SupervisorAccountIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Providers" />
        </ListItem>

        <ListItem 
          button
          selected={this.state.selectedIndex === 7}
          onClick={event => this.handleListItemClick(event, 7)}>
          <ListItemIcon>
            <LibraryBooksIcon />
          </ListItemIcon>
          <ListItemText primary="Manage Surveys" />
        </ListItem>

        <Divider />
        <ListSubheader>Customise</ListSubheader>

        <ListItem 
          button
          selected={this.state.selectedIndex === 8}
          onClick={event => this.handleListItemClick(event, 8)}>
          
          <ListItemIcon>
            <BuildIcon />
          </ListItemIcon>
          <ListItemText primary="Custom Questions" />
        </ListItem>

      </div>
    )
  }
};
