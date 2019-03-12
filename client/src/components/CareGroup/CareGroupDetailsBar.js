import React, { PureComponent } from 'react'
import DetailsBar from '../Textblocks/detailsBar'
import { startCase } from 'lodash';
import moment from 'moment';

export default class careGroupDetailsBar extends PureComponent {

    render () {
        const { careGroup } = this.props
        const careGroupDetails = [
            {caption: "Care group name", text: startCase(careGroup.group_name)},
            {caption: "Added by", text: `Dr. ${startCase(careGroup.added_by_name)}`},
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