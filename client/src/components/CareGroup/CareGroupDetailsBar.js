import React, { PureComponent } from 'react'
import DetailsBar from '../Textblocks/detailsBar'
import { startCase } from 'lodash';
import moment from 'moment';

export default class careGroupDetailsBar extends PureComponent {

    render () {
        const { careGroup } = this.props
        const careGroupDetails = [
            {spacing: 4, caption: "Care group name", text: startCase(careGroup.group_name)},
            {spacing: 3, caption: "Added by", text: `Dr. ${startCase(careGroup.added_by_name)}`},
            {spacing: 3, caption: "Date Added", text: moment(careGroup.date_added).format("MMM Do YYYY")},
            {spacing: 2, caption: "btn", text: "close", url: "find"}
        ];

        return(
            <DetailsBar items={careGroupDetails} />
        )
    }

}