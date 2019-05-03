import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
    btn: {
        height: "32px",
        padding: "0 5px",
        marginLeft: "15px",
        float: "right",
        color: "#555",
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
    btnIcon: {
        margin: "0 4px 0 0px",
        position: "relative", top: "4px"
    }
});


const BtnGroup = (props) => {
    const {classes, btns,  _id } = props;

    return (
        btns.map((btn, idx) => {
            return (
                <Button 
                    key={idx} 
                    type={btn.type}
                    size="small" 
                    variant="outlined" 
                    className={btn.warning ? classes.warningBtn : classes.btn} 
                    onClick = {btn.type === "submit" ? null : () => props.handleBtns(btn.btn, _id)}
                    >
                        {btn.icon && <span className={classes.btnIcon}>{btn.icon}</span>} 
                        <span className={classes.btnText}>{btn.btn}</span>
                </Button>
            )
        })
    );
};

BtnGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    btns: PropTypes.array.isRequired, // array form [{type: type, btn: "text", icon: <icon component>}]
    _id: PropTypes.string,
    handleBtns: PropTypes.func.isRequired
};
  
export default  withStyles(styles)(BtnGroup);