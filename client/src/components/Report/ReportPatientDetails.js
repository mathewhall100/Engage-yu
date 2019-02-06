import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import LinkBtn from '../Buttons/linkBtn'


const styles = theme => ({
    fwMedium: {
        fontWeight: 500,
      },
    backBtn: {
        margin: "6px 20px 0 0"
    }
  });

class ReportPatientDetails extends Component {

    render () {

        const { classes, patientInfo, closeBtn} = this.props;
        const info = [
            { caption: "Patient name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}` },
            { caption: "Hospital number", text: patientInfo.hospital_id },
            { caption: "DOB", text: patientInfo.dob },
        ];
       
        return (
            <Grid container spacing={24}>

                { info.map((info, idx) => {
                    return (
                        <Grid item xs={3} key={idx}>
                            <Typography variant="caption">{info.caption}</Typography>
                            <Typography variant="h6" className={classes.fwMedium}>{info.text}</Typography>
                        </Grid>
                    )
                })}

                <Grid item xs={3}>
                    {closeBtn && <Typography align="right" className={classes.backBtn} >
                        <LinkBtn url='/admin/find' />
                    </Typography> }
                </Grid>
                
            </Grid>
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
    }
  };

  ReportPatientDetails = connect(mapStateToProps)(ReportPatientDetails)
  ReportPatientDetails = withStyles(styles, { withTheme: true })(ReportPatientDetails)
  export default ReportPatientDetails