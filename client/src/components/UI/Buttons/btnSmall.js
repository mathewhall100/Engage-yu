import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button} from '@material-ui/core';

const styles = theme => ({
    root: { 
        margin: "10px 0 0 20px",
        padding: "0 5px",
        backgroundColor: theme.palette.secondary.main,
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
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


const BtnSmall = (props) =>  {
    const { classes, index, text, type="button", disabled=false } = props;
    
    const handleBtnClick = (index) => {props.handleBtn(index)};

    return (
        <Button 
            type={type} 
            variant="outlined"
            size="small" 
            className={classes.root} 
            disabled={disabled} 
            onClick={() => type === "submit" ? null : handleBtnClick(index)}
        >
            {text}
        </Button>
    );
};

BtnSmall.propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string,
    text: PropTypes.string.isRequired,
    index: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]).isRequired,
    handleBtnClick: PropTypes.func,
    disabled: PropTypes.bool,
};
  
export default withStyles(styles)(BtnSmall);
