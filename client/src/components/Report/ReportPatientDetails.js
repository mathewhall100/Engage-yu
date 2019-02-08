import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import PatientDetailsBar from '../Textblocks/patientDetailsBar';

const styles = theme => ({
    detailsContainer: {
        width: "100%",
        marginTop: theme.spacing.unit*2,
        paddingLeft: "20px",
        marginBottom: "30px"
    },
})


class ReportPatientDetails extends Component {

    render () {

        const { classes, patientInfo} = this.props;
        const infoItems = [
            { caption: "Patient name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}` },
            { caption: "Hospital number", text: patientInfo.hospital_id },
            { caption: "DOB", text: patientInfo.dob },
        ];
       
        return (
            <Paper className={classes.detailsContainer}>    
                <PatientDetailsBar items={infoItems} closeBtn={true} url='/admin/find' />
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
    }
  };

  ReportPatientDetails = connect(mapStateToProps)(ReportPatientDetails)
  ReportPatientDetails = withStyles(styles, { withTheme: true })(ReportPatientDetails)
  export default ReportPatientDetails