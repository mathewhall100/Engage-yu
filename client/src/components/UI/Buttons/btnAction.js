import React, { PureComponent } from 'react';
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
})


class BtnAction extends PureComponent {

    handleClick = (index) => {
        this.props.handleAction(index)
    }

    render() {
        const { classes, type, disabled, index, text } = this.props
        return (
            <Button 
                size="small"
                type={type} 
                className={text==="cancel" || text==="clear" ? classes.cancelBtn : classes.btn} 
                onClick={() => type==="submit" ? null : this.handleClick(index) }
                disabled={disabled}
            >
                {text}
            </Button>
        )
    }
}

BtnAction.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(BtnAction);