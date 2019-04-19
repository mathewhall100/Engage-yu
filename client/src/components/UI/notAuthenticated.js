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


class NotAuthenticated extends Component {
    
    render () {
        const { classes, text="" } = this.props

        return <div className={classes.root}>
            <div className={classes.center}>
                <Typography variant="h4" color="primary" gutterBottom >Whoops!</Typography>
                <br />
                <br />
                <Typography variant="h6">You are not authenticated to view this resource.</Typography>
            </div>
        </div>
    };
}

NotAuthenticated.propTypes = {
    classes: PropTypes.object.isRequired,
    text: PropTypes.string
};

export default withStyles(styles)(NotAuthenticated);