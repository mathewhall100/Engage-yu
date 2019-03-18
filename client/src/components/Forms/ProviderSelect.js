import React, {Component}from 'react'
import providerAPI from "../../utils/provider.js";
import FormSelect from './FormSelect'
import { startCase } from 'lodash'

export default class ProviderSelect extends Component {

    state = {
        providers: []
    }
    
    componentDidMount() {
        // fetch all providers in provider group 
        let providers = [];
        providerAPI.findAllByGroup(localStorage.getItem("provider_group_id"))
        .then(res => {
            console.log("res.data: ", res.data);       
            providers = res.data.providerList.map(provider => {
                let val = [
                    provider._id, 
                    provider.firstname,
                    provider.lastname,
                    provider.provider_group_ref,
                    provider.provider_group_id,
                    provider.provider_group_name,
                ]
                return {
                    value: val,
                    text: `Dr ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                }
            })
            if (providers && providers.length > 0) this.setState({providers: providers})
                else this.setState({providers: this.defaultProviderList()}) 
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({providers: this.defaultProviderList()}) 
        })
    };

    // return default list if empty/error
    defaultProviderList = () => {
        const defaultArray = [{
            value: [
                localStorage.getItem("provider_firstname"),
                localStorage.getItem("provider_lastname"),
                localStorage.getItem("provider._id"),
                localStorage.getItem("provider_group_ref"),
                localStorage.getItem("provider_group_ref"),
                localStorage.getItem("provider_group_name") 
            ],
            text: `Dr ${startCase(localStorage.getItem("provider_first_name"))} ${startCase(localStorage.getItem("provider_last_name"))}`
            },{
            value: [
                "",
                "",
                "000000000000000000000000",
                "000000000000000000000000",
                "000000000000000000000000",
                ""
            ],
            text: "Other"
        }]
        return defaultArray;
    };

    render() {
        const { providers } = this.state
        return (
                <FormSelect name="provider" label="Primary Provider" width="200" items={providers}/>
        )
    }
}
