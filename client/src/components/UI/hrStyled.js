import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        opacity: 0.2,
        color: theme.palette.primary.main
    }
});

const HrStyled = (props) =>  {
    const {classes } = props;
    return  <hr className={classes.root} />
};

HrStyled.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HrStyled);