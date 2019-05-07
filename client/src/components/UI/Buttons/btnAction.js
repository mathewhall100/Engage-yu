import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button} from '@material-ui/core';

const styles = (theme) => ({
     btn: {
        padding: "5px",
        color: "#ffffff",
        borderRadius: "5px",
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
        borderRadius: "5px",
        backgroundColor: theme.palette.primary.main, //"#c62828",
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


const BtnAction = (props) => {
    const { classes, text, type="button", disabled=false, marginRight=false, warning=false, index=null } = props;

    const handleClick = (index) => {props.handleAction(index)};
    
    return  (
        <Button 
            size="small"
            type={type} 
            className={warning ? classes.warningBtn : classes.btn} 
            onClick={() => type==="submit" ? null : handleClick(index) }
            style={{marginRight: marginRight ? "15px" : 0}}
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

BtnAction.propTypes = {
    classes: PropTypes.object.isRequired, 
    text: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
    ]),
    index: PropTypes.string,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    warning: PropTypes.bool,
    marginRight: PropTypes.bool,
    handleAction: PropTypes.func,
};
  
export default  withStyles(styles)(BtnAction);