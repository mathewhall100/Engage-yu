import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from './AppBar';
import AppNav from './AppNav';
import AppSearch from './AppSearch';
import Dashboard from './Dashboard';
import ConsoleRoutes from './ConsoleRoutes';

const styles = theme => ({
    root: { flexGrow: 1 },
    paper: { 
        padding: theme.spacing.unit *2,
        color: theme.palette.text.secondary,
    },
});

class Admin extends Component { 
    constructor(props) {
        super(props);
    } 
    
   
    render () {

        const { classes } = this.props;
        const { authenticated } = this.props;
        console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <AppBar />
                    <br />
                    <AppNav />         
                    <br />
                    <AppSearch/>
                    <br />
                    <ConsoleRoutes />
                </div >
            </React.Fragment>
        );
    }
}

export default connect(null,null,null, {pure:false}) (withStyles(styles)(Admin))