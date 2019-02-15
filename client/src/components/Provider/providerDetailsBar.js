import React, { PureComponent } from 'react'
import DetailsBar from '../Textblocks/detailsBar'
import { startCase } from 'lodash';
import moment from 'moment';

export default class providerDetailsBar extends PureComponent {

    render () {
        const { provider } = this.props
        const providerDetails = [
            {spacing: 3, caption: "Provider name", text: `${startCase(provider.firstname)} ${startCase(provider.lastname)}`},
            {spacing: 2, caption: "Role", text: startCase(provider.role)},
            {spacing: 3, caption: "Care group", text: startCase(provider.provider_group_name)},
            {spacing: 2, caption: "Added", text: moment(provider.date_added).format("MMM Do YYYY")},
            {spacing: 2, caption: "btn", text: "close", url: "find"}
        ];

        return(
            <React.Fragment>
                <DetailsBar items={providerDetails} />
                <br /> <hr /> <br />
            </React.Fragment>
        )
    }

}