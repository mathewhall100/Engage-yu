import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    btn: { 
        marginLeft: '15px',
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        textDecoration: "none",
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

class PatientLinkBtn extends PureComponent {

    render() {
        const {classes, url, text } = this.props
        return (
            <Button variant="outlined" className={classes.btn} component={Link} to={url}>{text}</Button>
        )
    }
}

PatientLinkBtn.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(PatientLinkBtn);