import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import DetailsBar from '../components/Textblocks/detailsBar';

const styles = theme => ({
    detailsContainer: {
        width: "100%",
        marginTop: "4px",
        padding: "10px 20px",
        marginBottom: "30px"
    },
})


class ReportPatientDetails extends Component {

    render () {

        const { classes, patientInfo} = this.props;
        const patientDetails = [
            {caption: "Patient name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`},
            {caption: "Hospital number", text: patientInfo.hospital_id},
            {caption: "DOB", text: patientInfo.dob},
            {caption: "btn", text: "close", url: '/admin/find'}
        ];
       
        return (
            <Paper className={classes.detailsContainer}>    
                <DetailsBar items={patientDetails} />
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