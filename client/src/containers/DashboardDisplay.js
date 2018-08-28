import React, { Component } from 'react';
import { connect } from 'react-redux';

class PatientList extends Component {

    componentDidUpdate() {
        this.renderPatients(this.props.patients);
    }

    renderPatients(patientData) {
        console.log("Patient data: ", patientData)

        return (
            <tr key={patientData.hospital_id}>
                <td>{patientData.firstname}</td>
                <td>{patientData.lastname}</td>
                <td>{patientData.dob}</td>
                <td>{patientData.hospital_id}</td>
            </tr>
        );
    }

    render () {
        return (
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>DOB</th>
                        <th>hospital ID</th>
                    </tr>
                </thead>
                <tbody>
                    
                    {this.props.patients.map((patient) => patient.map(this.renderPatients))} 
                    {/* {this.props.patients.map((patient) => {
                        return (patient.map(this.renderPatients))
                        }) */}
                </tbody>
            </table>
        )
    }
}

function mapStateToProps({patients}) {
    return {patients} // => { patients: patients }
}

export default connect(mapStateToProps)(PatientList);