import React, { PureComponent }  from 'react';
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
})

class BtnSmall extends PureComponent {

    handleBtnClick = (index) => {
        //console.log("handleBtnClick: ", text)
        this.props.handleBtn(index)
    }

    render() {
        const { classes, type, text, disabled, index } = this.props
        return (
            <Button 
                type={type} 
                variant="outlined"
                size="small" 
                className={classes.root} 
                disabled={disabled} 
                onClick={() => type === "submit" ? null : this.handleBtnClick(index)}
            >
                {text}
            </Button>
        )
    }
}


BtnSmall.propTypes = {
    classes: PropTypes.object.isRequired,
  
};
  
export default withStyles(styles)(BtnSmall);
