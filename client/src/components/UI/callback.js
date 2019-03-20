import React from 'react';
import PropTypes from 'prop-types'
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: "50px 200px"
    },
    progress: {

    }
});

const Callback = (props) =>  {
    const { classes } = props 

    return(
        <div className={classes.root}>
            Loading...
            <br />
            <br />
            <CircularProgress className={classes.progress} color="primary" />
        </div>
    );
};

Callback.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Callback);