import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = () => ({
    cancelBtn: {
        float: "right",
        marginLeft: "20px",
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
    },
    otherBtn: {
        float: "right",
        marginLeft: "20px",
        padding: "5px",
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {}
    },
});


const BtnActionGroup = (props) => {
    const { classes, row, actions, disabled=false } = props;
    
    const handleActionBtn = (btn, row) => {props.handleActionBtn(btn, row)};
    const btns = ["cancel", "archive", "view"];

    return (
        <span>
            {btns.map(btn => {
                return (actions.includes(btn) && 
                    <Button key={btn}
                        type="button"
                        size="small" 
                        className={btn==="cancel" ? classes.cancelBtn : classes.otherBtn} 
                        onClick={() => handleActionBtn(btn, row)}
                        disabled={disabled}
                    >
                        {btn}
                    </Button>
                )      
            }) }
        </span>
    );
};

BtnActionGroup.propTypes = {
    classes: PropTypes.object.isRequired, 
    row: PropTypes.object.isRequired,
    actions: PropTypes.array.isRequired,
    disabled: PropTypes.bool,
    handleActionBtn: PropTypes.func.isRequired,
};
  
export default  withStyles(styles)(BtnActionGroup);