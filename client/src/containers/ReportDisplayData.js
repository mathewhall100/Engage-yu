import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'

import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit*2,
      paddingLeft: "20px",
    },
  });

class ReportDisplayDetails extends Component {

    render () {

        const { classes } = this.props;
       
        return (
            <Paper className={classes.root}>
                <Typography variant="subheading">
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                        <Typography variant="caption">Patient name</Typography>
                            Diary Card: 
                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                        <Grid item xs={3}>

                        </Grid>
                    </Grid>
                </Typography>
            </Paper>
        );
    }
}


ReportDisplayDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,

        user: state.user
    }
  };
  ReportDisplayDetails = connect(mapStateToProps)(ReportDisplayDetails)
  ReportDisplayDetails = withStyles(styles, { withTheme: true })(ReportDisplayDetails)
  export default ReportDisplayDetails