import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography } from "@material-ui/core";
import BtnActionLink from '../Buttons/btnActionLnk';
import BtnAction from '../Buttons/btnAction';

const styles = theme => ({
    root: {
        maxWidth: "920px",
        display: 'flex', 
        flexDirection: 'row'
    },
    textPosn: {
        margin: '20px 40px 0 40px'
    },
    selectPosn: {
        margin: "4px 40px 0 40px"
    },
    btn: {
        height: "26px", 
        margin: "20px 12px 20px 16px"
    }
});  

const FormFind = (props) =>  {
    const { classes, select, url, btn, submitting, pristine } = props;  //title

    return (
        <div className={classes.root}>   
            <span className={classes.selectPosn}>
                {select} 
            </span>
            <span className={classes.btn} >
                <BtnAction type="submit" disabled={submitting || pristine} text="submit" />
            </span>
            <Typography variant="h6" className={classes.textPosn}>or</Typography>
            <span className={classes.btn} >
                <BtnActionLink url={url} disabled={false} text={btn} />
            </span>
        </div>
    );
};

FormFind.propTypes = {
	classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    select: PropTypes.object.isRequired,
    url: PropTypes.string.isRequired,
    btn: PropTypes.string.isRequired,
    submitting: PropTypes.bool.isRequired,
    pristine: PropTypes.bool.isRequired,
};


export default withStyles(styles)(FormFind);