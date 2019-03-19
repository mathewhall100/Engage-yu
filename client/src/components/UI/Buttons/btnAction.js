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

  cancelBtn: {
        padding: "5px",
        color: "#ffffff",
        borderRadius: "5px",
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


const BtnAction = (props) => {

    const handleClick = (index) => {props.handleAction(index)};
    const { classes, text, type="button", disabled=false, index=null } = props;

    return  (
        <Button 
            size="small"
            type={type} 
            className={text==="cancel" || text==="clear" ? classes.cancelBtn : classes.btn} 
            onClick={() => type==="submit" ? null : handleClick(index) }
            disabled={disabled}
        >
            {text}
        </Button>
    );
};

BtnAction.propTypes = {
    classes: PropTypes.object.isRequired, 
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    disabled: PropTypes.bool,
    handleAction: PropTypes.func,
};
  
export default  withStyles(styles)(BtnAction);