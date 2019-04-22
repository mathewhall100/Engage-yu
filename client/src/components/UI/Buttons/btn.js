import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
    btn: {
        height: "32px",
        padding: "0 5px",
        marginLeft: "15px",
        float: "right",
        color: theme.palette.primary.main,
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",  
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#dddddd",
            color: theme.palette.primary.dark,
            cursor: 'pointer'
        },
        '&:disabled': {
            color: 'grey',
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
    warningBtn: {
        height: "32px",
        padding: "0 5px",
        marginLeft: "15px",
        float: "right",
        color: theme.palette.primary.main,
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",  
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#871c1c",
            color: "#FFF",
            cursor: 'pointer'
        },
        '&:disabled': {
            color: "grey",
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
});


const Btn = (props) => {
    const {classes, text, type="button", disabled=false, marginRight=false, warning=false, index=null} = props;

    return (
        <Button 
            size="small"
            type={type}
            variant="outlined" 
            className={warning ? classes.warningBtn : classes.btn} 
            style={{marginRight: marginRight ? "15px" : 0}}
            disabled={disabled}
            onClick = {type === "submit" ? null : () => props.handleBtn(index)}
            >
              {text}
        </Button>
    )
};

Btn.propTypes = {
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
    handleBtn: PropTypes.func,
};
  
export default  withStyles(styles)(Btn);