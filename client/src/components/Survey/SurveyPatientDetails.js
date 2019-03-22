import React, { PureComponent } from 'react'
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card'
import DetailsBar from '../UI/detailsBar'
import CallBack from '../UI/callback'


class SurveyPatientDetails extends PureComponent {
   
    render () { 
        const { patientInfo, error, loading } = this.props

        const getPatientDetails = (patientInfo) => {
            return [
                {caption: "For patient", text: `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`},
                {caption: "Hospital number", text: patientInfo.hospital_id},
                {caption: "DOB", text: patientInfo.dob},
                {caption: "btn", text: "close", url: "find"}
            ]
        };

        
        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !patientInfo || !patientInfo._id ) {
            return <CallBack />
        }


        return(
            <Card style={{padding: "0 20px 0 40px"}}>
                <br />
                <DetailsBar items={getPatientDetails(patientInfo)} />
                <br />
            </Card>
        )
    }

}

SurveyPatientDetails.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        error: state.patient.error,
        loading: state.patient.loading
    }
};

SurveyPatientDetails = connect(mapStateToProps)(SurveyPatientDetails)
export default SurveyPatientDetails