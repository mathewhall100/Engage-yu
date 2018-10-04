import React, { Component } from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Console from './Console';


const styles = theme => ({
    root: { flexGrow: 1 },
    backgroundColor: "#f3f3f3",
});


class Admin extends Component { 
    
    render () {

        const { classes } = this.props;

        return (
            <React.Fragment>
                <CssBaseline />
                <div className={classes.root}>

                        <Console />  

                </div >
            </React.Fragment>
        );
    }
}

export default connect(null,null,null, {pure:false}) (withStyles(styles)(Admin))