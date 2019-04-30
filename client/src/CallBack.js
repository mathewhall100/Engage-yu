import React, { Component } from 'react';
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles, Typography } from '@material-ui/core';

const styles = theme => ({
    root: {
        width: "100%",
        minHeight:"800px",
        position: "relative",
        color: theme.palette.primary.main
    },
    center: {
        position: "absolute", 
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    progress: {
        margin: "65px", 
    }
});


class CallBack extends Component {
    
    componentDidMount() {
         this.countdown = setInterval(() => this.setState({displaySpinner: false}), 30000)
    }

    componentWillUnmount() {
        clearInterval(this.countdown)
    }

    state = {
        displaySpinner: true
    }
    
    render () {
        const { classes } = this.props
        const { displaySpinner } = this.state

        if (displaySpinner) 
            return <div className={classes.root}>
                <div className={classes.center}>
                    <Typography variant="h6">Initializing application...</Typography>
                    <CircularProgress size={32} className={classes.progress} color="primary" />
                </div>
            </div>

         
        return <div className={classes.root}>
            <div className={classes.center}>
                <Typography variant="h6">Sorry!</Typography>
                <Typography variant="subtitle1">Application set up has timed out.</Typography>
            </div>
        </div>
    };
}

CallBack.propTypes = {
    classes: PropTypes.object.isRequired,
};

CallBack = withStyles(styles)(CallBack);
export default CallBack;