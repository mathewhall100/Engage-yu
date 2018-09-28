import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    backbtn: {
        backgroundColor: "#eeeeee",
        marginRight: "40px",
        float: "right",
        textDecoration: "none",
        borderRadius: "5px",
    },
  });

class ReportPatientDetails extends Component {

    render () {

        const { classes } = this.props;
       
        return (
            <Paper className={classes.root}>
                <Typography variant="subheading">
                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                        <Typography variant="caption">Patient name</Typography>
                            {startCase(this.props.patientInfo.firstname)} {startCase(this.props.patientInfo.lastname)}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">Hospital number:</Typography>
                            {this.props.patientInfo.hospital_id}
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">DOB</Typography>
                            {this.props.patientInfo.dob}
                        </Grid>
                        <Grid item xs={3}>
                        <Link to='/admin' className={classes.backbtn}><Button className={classes.cancelBtn}>Back</Button></Link>
                        </Grid>
                    </Grid>
                </Typography>
            </Paper>
        );
    }
}


ReportPatientDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        user: state.user
    }
  };
  ReportPatientDetails = connect(mapStateToProps)(ReportPatientDetails)
  ReportPatientDetails = withStyles(styles, { withTheme: true })(ReportPatientDetails)
  export default ReportPatientDetails