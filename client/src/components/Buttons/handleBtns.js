import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const styles = theme => ({
    btn: {
        height: "32px",
        marginLeft: "15px",
        padding: "0 5px",
        float: "right",color: "#555",
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",  
        '&:hover': {
            backgroundColor: "#dddddd",
            color: theme.palette.primary.dark
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    btnIcon: {
        margin: "0 4px 0 0px",
        position: "relative", top: "4px"
    }

  });

class HandleBtns extends PureComponent {

    render() {
        const {classes, btns,  _id } = this.props
        return (
            btns.map((btn, idx) => {
                return (
                    <Button key={idx} size="small" variant="outlined" className={classes.btn} onClick={() => this.props.handleActionBtns(btn.btn, _id)}>
                        {btn.icon && <span className={classes.btnIcon}>{btn.icon}</span>} 
                        <span className={classes.btnText}>{btn.btn}</span>
                    </Button>
                )
            })
        )
    }
}

HandleBtns.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(HandleBtns);