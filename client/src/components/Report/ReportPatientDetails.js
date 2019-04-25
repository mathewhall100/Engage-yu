import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import DetailsBar from '../UI/detailsBar';

const styles = theme => ({
    root: {
        paddingTop: "20px"
    },
})


class ReportPatientDetails extends Component {

    render () {

        const { classes, patientInfo } = this.props;
        const patientDetails = [
            {caption: "Patient name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`},
            {caption: "Hospital number", text: patientInfo.hospital_id},
            {caption: "DOB", text: patientInfo.dob},
            {caption: "btn", text: "close", url: localStorage.getItem("report_return_locn")},
            {caption: "btn", text: "full report", url: '/admin/reportfull'}
        ];
       
        return (
            <div className={classes.root}>
                <DetailsBar items={patientDetails}/> 
            </div>
        );
    }
}


ReportPatientDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        error: state.patient.error,
        loading: state.patient.loading
    }
  };

  ReportPatientDetails = connect(mapStateToProps)(ReportPatientDetails)
  ReportPatientDetails = withStyles(styles, { withTheme: true })(ReportPatientDetails)
  export default ReportPatientDetails