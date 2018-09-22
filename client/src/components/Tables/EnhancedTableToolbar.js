import React, { Component } from 'react';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FilterListIcon from '@material-ui/icons/FilterList';

import DashboardMultipleSelect from '../Forms/DashboardMultipleSelect';



const toolbarStyles = theme => ({
    root: {
      paddingRight: theme.spacing.unit,
    },
    spacer: {
      flex: '1',
    },
    actions: {
      color: "#666666",
      marginRight: "20px"
    },
    selects: {
      marginRight: "40px",
    },
    title: {
      flex: '0 0 auto',
    },
    navLinks: {
      marginRight: "20px",
      fontSize: "13px",
      textDecoration: "underline",
      color: "#000000",
      '&:hover': {
        cursor: "pointer",
        fontWeight: 500,
      },
    },
});



class EnhancedTableToolbar extends React.Component {  

    componentDidMount() {
        this.setState({navLinksSwitch: this.props.navLinksSwitch})
    }
    
    state = {
        navLinksFilter: "",
    }
      
    handleNavLinksFilter = (event, filter) => {
        console.log("FilterLink: ", filter)
        this.setState({navLinksSwitch: filter})
        this.props.navLinksFilter(filter)
    }

    handleStatusFilter = filter => {
        console.log("FilterStatus: ", filter)
        this.props.statusFilter(filter)
    }

    handleCheckedFilter = event => {
        console.log("FilterChecked: ", event)
        this.props.checkedFilter(event)
    }

    render() { 

         const { numSelected, classes } = this.props;
    
        return (

            <Toolbar className={classes.root}>
                <div className={classes.title}>

                    <span>
                        <Typography variant="title" id="tableTitle">
                            My Surveys.
                        </Typography>
                        <Typography variant="caption" id="tableTitle">
                                    <span className={classes.navLinks} style={{color: this.state.navLinksSwitch === "requester" ? "#000000" : "#888888"}} onClick = {event => this.handleNavLinksFilter(event, "requester")}>As requester</span>  
                            <span className={classes.navLinks} style={{color: this.state.navLinksSwitch === "provider" ? "#000000" : "#888888"}} onClick = {event => this.handleNavLinksFilter(event, "provider")}>As primary provider</span>
                            <span className={classes.navLinks} style={{color: this.state.navLinksSwitch === "all" ? "#000000" : "#888888"}} onClick = {event => this.handleNavLinksFilter(event, "all")}>All my surveys</span>
                        </Typography>
                    </span>

                </div>
        
                <div className={classes.spacer} />
        
                <span className={classes.actions}>Filter by status: </span>
                
                <span className={classes.selects}>
                    <DashboardMultipleSelect selectStatus={this.handleStatusFilter}/> 
                </span>
        
                <Tooltip title="Filter checked"> 
                    <IconButton aria-label="Filter list" onClick = {event => this.handleCheckedFilter(event)}>
                        <FilterListIcon />
                    </IconButton>
                </Tooltip> 
        
            </Toolbar>
            );
        }
    };

  EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
  };
  
  EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar)
  export default EnhancedTableToolbar
