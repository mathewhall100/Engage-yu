import React, { PureComponent } from 'react'
import DetailsBar from '../components/Textblocks/detailsBar'
import { startCase } from 'lodash';
import moment from 'moment';

export default class providerDetailsBar extends PureComponent {

    render () {
        const { provider } = this.props
        const providerDetails = [
            {caption: "Provider name", text: `${startCase(provider.firstname)} ${startCase(provider.lastname)}`},
            {caption: "Role", text: startCase(provider.role)},
            {caption: "Care group", text: startCase(provider.provider_group_name)},
            {caption: "Added", text: moment(provider.date_added).format("MMM Do YYYY")},
            {caption: "btn", text: "close", url: "find"}
        ];

        return(
            <React.Fragment>
                <DetailsBar items={providerDetails} />
                <br /> <hr /> <br /> <br />
            </React.Fragment>
        )
    }

}