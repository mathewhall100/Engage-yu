import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Console from '../components/Console';
import Appbar from '../components/AppBar';


const styles = theme => ({
    root: { 
        flexGrow: 1 
    },
});


class Admin extends Component { 
    
    render () {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <Appbar />
                    <Console />  
                </div >
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Admin)