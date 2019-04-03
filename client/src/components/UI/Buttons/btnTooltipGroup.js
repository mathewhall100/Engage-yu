import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Tooltip} from '@material-ui/core';

const styles = (theme) => ({
    btn: {
        marginLeft: "15px", 
        padding: "5px 8px",
        color: "#555",
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        float: "right",
        '&:hover': {
            backgroundColor: theme.palette.secondary.dark,
            cursor: 'pointer'
        },
        '&:disabled': {
            color: 'grey',
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
});


const BtnTooltipGroup = (props) => {
    const { classes, btns } = props;

    const handleBtnClick = (btn) => {props.handleBtns(btn)};
    
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
    );
};

BtnTooltipGroup.propTypes = {
    classes: PropTypes.object.isRequired,
    btns: PropTypes.array.isRequired,
  
};
  
export default  withStyles(styles)(BtnTooltipGroup);