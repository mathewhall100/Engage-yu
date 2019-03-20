import React from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = (theme) => ({
     btn: {
        padding: "5px",
        color: "#ffffff",
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {}
    },

  cancelBtn: {
        padding: "5px",
        color: "#ffffff",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {}
    }
});


const BtnActionLink = (props) => {
    const { classes, disabled=false, url, text } = props;

    return (
        <Button 
            size="small"
            type="button"
            className={text==="cancel" ? classes.cancelBtn : classes.btn} 
            component={Link}
            to={url}
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

BtnActionLink.propTypes = {
    classes: PropTypes.object.isRequired,
    disabled: PropTypes.bool,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
  
export default  withStyles(styles)(BtnActionLink);