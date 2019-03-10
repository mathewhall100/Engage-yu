import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card'
import DetailsBar from '../Textblocks/detailsBar'
import { startCase } from 'lodash';

class SurveyPatientDetails extends PureComponent {

    render () {

        const patientDetails = [
            {spacing: 3, caption: "For patient", text: `${startCase(this.props.patientInfo.firstname)} ${startCase(this.props.patientInfo.lastname)}`},
            {spacing: 2, caption: "Hospital number", text: this.props.patientInfo.hospital_id},
            {spacing: 3, caption: "DOB", text: this.props.patientInfo.dob},
            {spacing: 4, caption: "btn", text: "close", url: "find"}
        ];

        return(
            <Card style={{padding: "0 20px 0 40px"}}>
                <br />
                <DetailsBar items={patientDetails} />
                <br />
            </Card>
        )
    }

}

SurveyPatientDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
    }
};

SurveyPatientDetails = connect(mapStateToProps)(SurveyPatientDetails)
export default SurveyPatientDetails