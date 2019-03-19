import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Tooltip} from '@material-ui/core';

const styles = (theme) => ({
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        borderColor: theme.palette.primary.main,
        padding: "5px 8px",
        marginLeft: "15px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
});


const BtnTooltip = (props) => {

    const handleBtnClick = (btn) => {this.props.handleActionBtns(btn)};
    const { classes, btns } = props;

    return (
        btns.map((btn, idx) => {
            return (
                <Tooltip key={idx} title={btn.tooltip} enterDelay={300}>
                    <Button 
                        key={idx} 
                        size="small" 
                        variant="outlined" 
                        className={classes.btn} 
                        onClick={() => handleBtnClick(btn.text)}
                        >
                            {btn.text}
                    </Button>
                </Tooltip>
            );
        })
    )
};

BtnTooltip.propTypes = {
    classes: PropTypes.object.isRequired,
    btns: PropTypes.array.isRequired,
  
};
  
export default  withStyles(styles)(BtnTooltip);