import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = (theme) => ({
    link: { 
        textDecoration: "none",
    },
    btn: { 
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
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
        const {classes, url } = this.props
        return (
            <Link to={url} className={classes.link}><Button variant="outlined" className={classes.btn}>Back</Button></Link>
        )
    }
}

PatientLinkBtn.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(PatientLinkBtn);