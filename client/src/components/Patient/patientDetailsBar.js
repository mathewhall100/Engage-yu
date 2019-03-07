import React, { PureComponent } from 'react'
import DetailsBar from '../Textblocks/detailsBar'
import { startCase } from 'lodash';
import moment from 'moment';

export default class providerDetailsBar extends PureComponent {

    render () {
        const { patient } = this.props
        const patientDetails = [
            {spacing: 3, caption: "Current name", text: `${startCase(patient.firstname)} ${startCase(patient.lastname)}`  },
            {spacing: 2, caption: "Hospital number", text: patient.hospital_id},
            {spacing: 2, caption: "DOB", text: patient.dob},
            {spacing: 2, caption: "Date enrolled", text: moment(patient.date_enrolled).format("MMM Do YYYY")},
            {spacing: 3, caption: "btn", text: "close", url: "/admin/find"}
        ];

        return(
            <React.Fragment>
                <DetailsBar items={patientDetails} />
                <br /> <hr /> <br /> <br />
            </React.Fragment>
        )
    }

}