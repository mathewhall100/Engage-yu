import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Tooltip from '@material-ui/core/Tooltip';
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

class TooltipBtns extends PureComponent {

    handleBtnClick = (btn) => {
        //console.log("handleBtnClick: ", btn)
        this.props.handleActionBtns(btn)
    }

    render() {
        const {classes, btns } = this.props
        return (
            btns.map((btn, idx) => {
                return (
                    <Tooltip key={idx} title={btn.tooltip} enterDelay={300}>
                        <Button 
                            key={idx} 
                            size="small" 
                            variant="outlined" 
                            className={classes.btn} 
                            onClick={() => this.handleBtnClick(btn.text)}
                            >
                                {btn.text}
                        </Button>
                    </Tooltip>
                )
            })
        )
    }
}

TooltipBtns.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(TooltipBtns);