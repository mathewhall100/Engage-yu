import React, { PureComponent } from 'react'
import { startCase, upperFirst } from 'lodash';
import moment from 'moment';
import ProviderName from '../UI/providerName';
import DetailsBar from '../UI/detailsBar'


export default class ProviderDetailsBar extends PureComponent {

    render () {
        const { provider } = this.props
        console.log("props : ", provider)
        const providerDetails = [
            {caption: "Provider name", text: <ProviderName title={provider.title} firstname={provider.firstname} lastname={provider.lastname} />},
            {caption: "Role", text: upperFirst(provider.provider_role.role)},
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