import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel'

const styles = (theme) => ({
    closeButton: {
        float: "right",
        '&:hover': {
            backgroundColor: "#FFF",
        },
    },
    cancelIconStyles: {
        position: 'relative', left: "20px",
        color: "#666",
        fontSize: '32px',
        '&:hover': {
            color: theme.palette.primary.main,
        },
    }
});


const BtnCloseIcon = (props) => {
    const { classes } = props;

    return  (
        <Button disableRipple className={classes.closeButton} onClick={() => props.handleBtnClick()}>
            <CancelIcon className={classes.cancelIconStyles} />
        </Button>
    );
};

BtnCloseIcon.propTypes = {
    classes: PropTypes.object.isRequired, 
    color: PropTypes.string,
    handleBtnClick: PropTypes.func,
};
  
export default  withStyles(styles)(BtnCloseIcon);