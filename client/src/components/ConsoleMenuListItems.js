import React from 'react';
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

export const dashboardListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
  </div>
);

export const workflowListItems = (
  <div>
    <ListSubheader>My workflow</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <SearchIcon />
      </ListItemIcon>
      <ListItemText primary="Find Patient" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PollIcon />
      </ListItemIcon>
      <ListItemText primary="My Surveys" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <PersonAddIcon />
      </ListItemIcon>
      <ListItemText primary="Enroll Patient" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <ContactPhoneIcon />
      </ListItemIcon>
      <ListItemText primary="Contact Patient" />
    </ListItem>
  </div>
);

export const adminListItems = (
  <div>
    <ListSubheader>Admin</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <WcIcon />
        </ListItemIcon>
      <ListItemText primary="Manage Patients" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Providers" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <LibraryBooksIcon />
      </ListItemIcon>
      <ListItemText primary="Manage Surveys" />
    </ListItem>
  </div>
);
export const customiseListItems = (
  <div>
    <ListSubheader>Customise</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <BuildIcon />
      </ListItemIcon>
      <ListItemText primary="Custom Questions" />
    </ListItem>
  </div>
);