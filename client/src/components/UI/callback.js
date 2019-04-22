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
        const { classes, noSpin=false, text="", fallbackTitle=null, fallbackText=null } = this.props
        const { displaySpinner } = this.state

        if (!noSpin && displaySpinner) 
            return <div className={classes.root}>
                        <div className={classes.center}>
                            <Typography variant="h6">{text}</Typography>
                            <br />
                            <br />
                            <CircularProgress size={32} className={classes.progress} color="primary" />
                        </div>
                    </div>

        else if (fallbackTitle || fallbackText) 
            return <div className={classes.root}>
                    <div className={classes.center}>
                        <Typography variant="h6">{fallbackTitle}</Typography>
                        <br />
                        <Typography variant="subtitle1">{fallbackText}</Typography>
                    </div>
                </div>

        else return <div className={classes.root}>
                        <div className={classes.center}>
                            <Typography variant="h6">There isn't any data to display.</Typography>
                            <br />
                            <Typography variant="subtitle1">Try refeshing the browser or using the main menu to reselect a patient.</Typography>
                        </div>
                    </div>
    };
}

Callback.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string,
    fallbackTitle: PropTypes.string,
    fallBacktext: PropTypes.string,
    noSpin: PropTypes.boolean
};

export default withStyles(styles)(Callback);