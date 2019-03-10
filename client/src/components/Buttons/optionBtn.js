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

class OptionBtn extends PureComponent {

    handleBtnClick = (btn, _id) => {
        this.props.handleBtn(btn, _id)
    }

    render() {
        const {classes, text, id} = this.props
            return (
                <Button key={id} size="small" variant="outlined" className={classes.btn} onClick={() => this.handleBtnClick(id)}>
                    {text}
                </Button>
            )
    }
}

OptionBtn.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(OptionBtn);