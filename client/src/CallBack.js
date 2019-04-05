import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: "100%",
        minHeight:"200px",
        position: "relative",
    },
    center: {
        position: "absolute", 
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    progress: {
        marginLeft: "20px", 
    }
});



class Callback extends Component {
    

    componentDidMount() {
         this.countdown = setInterval(() => this.setState({displaySpinner: false}), 5000)
    }

    componentWillUnmount() {
        clearInterval(this.countdown)
    }

    state = {
        displaySpinner: true
    }
    
    render () {
        const { classes, text="" } = this.props
        const { displaySpinner } = this.state

        if (displaySpinner) 
            return <div className={classes.root}>
                <div className={classes.center}>
                    <Typography variant="h6">Loading provider profile...</Typography>
                    <br />
                    <br />
                    <CircularProgress size={32} className={classes.progress} color="primary" />
                </div>
            </div>

        else 
            return <div className={classes.root}>
                <div className={classes.center}>
                    <Typography variant="h6">Sorry!</Typography>
                    <Typography variant="subtitle1">Loading/saving data operation has timed out.</Typography>
                </div>
            </div>
    };
}

Callback.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Callback);