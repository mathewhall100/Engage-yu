import React from 'react';
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


const BtnLink = (props) => {

    const {classes, url, text } = props;

    return (
        <Button variant="outlined" size="small" className={classes.btn} component={Link} to={url}>{text}</Button>
    );
};

BtnLink.propTypes = {
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
};
  
export default  withStyles(styles)(BtnLink);