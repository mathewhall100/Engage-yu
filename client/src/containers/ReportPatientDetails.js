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
      marginBottom: "10px"
    },
    backbtn: {
        backgroundColor: "#eeeeee",
        marginRight: "40px",
        float: "right",
        textDecoration: "none",
        borderRadius: "5px",
    },
    textBold: {
        fontWeight: "bold",
        fontSize: "17px"
    }
  });

class ReportPatientDetails extends Component {

    render () {

        const { classes } = this.props;
       
        return (
            <Paper className={classes.root}>

                    <Grid container spacing={24}>
                        <Grid item xs={3}>
                        <Typography variant="caption">Patient name</Typography>
                            <span className={classes.textBold}>{startCase(this.props.patientInfo.firstname)} {startCase(this.props.patientInfo.lastname)}</span>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">Hospital number:</Typography>
                            <span className={classes.textBold}>{this.props.patientInfo.hospital_id}</span>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography variant="caption">DOB</Typography>
                            <span className={classes.textBold}>{this.props.patientInfo.dob}</span>
                        </Grid>
                        <Grid item xs={3}>
                        <Link to='/admin' className={classes.backbtn}><Button className={classes.cancelBtn}>Back</Button></Link>
                        </Grid>
                        
                    </Grid>

            </Paper>
        );
    }
}


ReportPatientDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        user: state.user
    }
  };
  ReportPatientDetails = connect(mapStateToProps)(ReportPatientDetails)
  ReportPatientDetails = withStyles(styles, { withTheme: true })(ReportPatientDetails)
  export default ReportPatientDetails