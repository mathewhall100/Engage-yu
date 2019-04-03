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

    warningBtn: {
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
    const { classes, url, text, marginRight=false, warning=false, disabled=false, } = props;

    return (
        <Button 
            size="small"
            type="button"
            className={warning ? classes.warningBtn : classes.btn}
            style={{marginRight: marginRight ? "15px" : 0}} 
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
    marginRight: PropTypes.bool,
    warning: PropTypes.bool,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
};
  
export default  withStyles(styles)(BtnActionLink);