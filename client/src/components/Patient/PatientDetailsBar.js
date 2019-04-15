import React, { PureComponent } from 'react'
import { startCase } from 'lodash';
import moment from 'moment';
import DetailsBar from '../UI/detailsBar'

export default class PatientDetailsBar extends PureComponent {

    render () {
        const { patient } = this.props
        const patientDetails = [
            {caption: "Current name", text: `${startCase(patient.firstname)} ${startCase(patient.lastname)}`  },
            {caption: "Hospital number", text: patient.hospital_id},
            {caption: "DOB", text: patient.dob},
            {caption: "Date enrolled", text: moment(patient.date_enrolled).format("MMM Do YYYY")},
            {caption: "btn", text: "close", url: "/admin/patient"}
        ];

        return(
            <React.Fragment>
                <DetailsBar items={patientDetails} />
                <br /> <hr /> <br /> <br />
            </React.Fragment>
        )
    }

}