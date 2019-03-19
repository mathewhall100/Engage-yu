import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, Button} from '@material-ui/core';


const styles = (theme) => ({
    btn: { 
        padding: "4px 5px",
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

class BtnLink extends PureComponent {

    render() {
        const {classes, url, text } = this.props
        return (
            <Button variant="outlined" size="small" className={classes.btn} component={Link} to={url}>{text}</Button>
        )
    }
}

BtnLink.propTypes = {
    classes: PropTypes.object.isRequired,
  
  };
  
  export default  withStyles(styles)(BtnLink);