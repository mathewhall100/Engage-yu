import React, {Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
    },
});

class AfterSurvey extends Component {
    render(){
        const { classes } = this.props;
        return(
        <div className={classes.root} elevation={1}>
            <Typography variant='headline' component='h3'>
                    Thank you!
            </Typography>
            <Typography component='p'>
                You have completed the survey!
            </Typography>
            

        </div>
        );
    }
}

AfterSurvey.propTypes = {
    classes : PropTypes.object.isRequired,
}
export default withStyles(styles)(AfterSurvey);