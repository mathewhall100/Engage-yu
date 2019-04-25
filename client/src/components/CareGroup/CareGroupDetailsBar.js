import React, { PureComponent } from 'react'
import { startCase } from 'lodash';
import moment from 'moment';
import DetailsBar from '../UI/detailsBar'
import ProviderName from '../UI/providerName'

export default class CareGroupDetailsBar extends PureComponent {

    render () {
        const { careGroup } = this.props
        const careGroupDetails = [
            {caption: "Care group name", text: startCase(careGroup.group_name)},
        {caption: "Added by", text: <ProviderName title={careGroup.added_by.title} firstname={careGroup.added_by.firstname} lastname={careGroup.added_by.lastname} />},
            {caption: "Date Added", text: moment(careGroup.date_added).format("MMM Do YYYY")},
            {caption: "btn", text: "close", url: "find"}
        ];

        return (
            <React.Fragment>
                <DetailsBar items={careGroupDetails} />
                <br /> <hr /> <br /> <br />
            </React.Fragment>
        )
    }

}