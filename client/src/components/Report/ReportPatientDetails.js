import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper'
import DetailsBar from '../Textblocks/detailsBar';

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
        const patientDetails = [
            {spacing: 3, caption: "Patient name", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`},
            {spacing: 3, caption: "Hospital number", text: patientInfo.hospital_id},
            {spacing: 3, caption: "DOB", text: patientInfo.dob},
            {spacing: 3, caption: "btn", text: "close", url: '/admin/find'}
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