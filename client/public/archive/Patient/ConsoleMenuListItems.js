import React from 'react';
import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ContactPhoneIcon from '@material-ui/icons/ContactPhone';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import WcIcon from '@material-ui/icons/Wc';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import BuildIcon from '@material-ui/icons/Build';


export const patientListItems = (
    <div>
        <ListSubheader>Patient Info</ListSubheader>
        <Link to='/patient' style={{ textDecoration: 'none', display: 'block' }}>
            <ListItem button>
                <ListItemIcon>
                    <AssessmentIcon />
                </ListItemIcon>
                <ListItemText primary='Survey' />
            </ListItem>
        </Link>
        <Link to='/patient/history' style={{ textDecoration: 'none', display: 'block' }}>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='History' />
            </ListItem>
        </Link>
        <Link to='/patient/report' style={{ textDecoration: 'none', display: 'block' }}>
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>
                <ListItemText primary='Report' />
            </ListItem>
        </Link>
        <Link to='/patient/physician' style={{ textDecoration: 'none', display: 'block' }}>
            <ListItem button>
                <ListItemIcon>
                    <ContactPhoneIcon />
                </ListItemIcon>
                <ListItemText primary='Physician' />
            </ListItem>
        </Link>
    </div>
);