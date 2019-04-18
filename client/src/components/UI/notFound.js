import React, { Component } from 'react';
import PropTypes from 'prop-types'
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


class NotFound extends Component {
    
    render () {
        const { classes, text="" } = this.props

        return <div className={classes.root}>
            <div className={classes.center}>
                <Typography variant="h4" align="center" color="primary" gutterBottom >Whoops! Page not Found</Typography>
                <br />
                <br />
                <Typography variant="h6">The requested page was not found. Please use the application menu to find what you need. </Typography>
            </div>
        </div>
    };
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string
};

export default withStyles(styles)(NotFound);