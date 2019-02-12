import React, { PureComponent } from 'react';
import { Link} from 'react-router-dom';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
     btn: {
        marginLeft: "15px",
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

    handleActionBtn = (index) => {
        this.props.handleActionBtn(index)
    }

    render() {
        const { classes, disabled, url, text } = this.props
        return (
            <Button 
                size="small"
                type="button"
                className={text==="cancel" ? classes.cancelBtn : classes.btn} 
                component={Link}
                to={url}
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