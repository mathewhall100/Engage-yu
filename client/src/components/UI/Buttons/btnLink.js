import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles, Button} from '@material-ui/core';

const styles = (theme) => ({
    btn: {
        height: "32px",
        padding: "0 5px",
        color: "#555",
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#dddddd",
            color: theme.palette.primary.dark,
            cursor: "pointer"
        },
        '&:disabled': {
            color: 'grey',
            cursor: 'disabled'
        },
        hover: {},
        disabled: {},
    },
});


const BtnLink = (props) => {
    const {classes, url, text, marginRight=false, marginLeft=true} = props;

    return (
        <Button 
            variant="outlined" 
            size="small" 
            className={classes.btn} 
            component={Link} to={url}
            style={{margin: marginRight ? "0 15px 0 0" : marginLeft ? "0 0 0 15px" : "0 0 0 0"}}
        >
            {text}
        
        </Button>
    );
};

BtnLink.propTypes = {
    classes: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    marginRight: PropTypes.bool,
    marginLeft: PropTypes.bool
};
  
export default  withStyles(styles)(BtnLink);