import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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
})


class ActionBtn extends PureComponent {

    handleClick = (index) => {
        this.props.handleAction(index)
    }

    render() {
        const { classes, type, disabled, index, text } = this.props
        return (
            <Button 
                size="small"
                type={type} 
                className={text==="cancel" ? classes.cancelBtn : classes.btn} 
                onClick={() => {text==="submit" ? null : this.handleClick(index)} }
                disabled={disabled}
            >
                {text}
            </Button>
        )
    }
}

ActionBtn.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(ActionBtn);