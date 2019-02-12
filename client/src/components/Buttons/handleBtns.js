import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

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

class HandleBtns extends PureComponent {

    handleBtnClick = (btn, _id) => {
        this.props.handleActionBtns(btn, _id)
    }

    render() {
        const {classes, btns, _id } = this.props
        return (
            btns.map(btn => {
                return (
                    <Button key={btn} size="small" variant="outlined" className={classes.btn} onClick={() => this.handleBtnClick(btn, _id)}>
                        {btn}
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