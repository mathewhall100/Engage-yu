import React, {Component}from 'react';
import providerAPI from "../../../utils/provider.js";
import FormSelect from './formSelect';
import { startCase } from 'lodash';

export default class FormProviderSelect extends Component {

    state = {
        providers: []
    };
    
    componentDidMount() {
        // fetch all providers in provider group 
        let providers = [];
        providerAPI.findAllByGroup(localStorage.getItem("user_provider_group_id"))
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
                ];
                return {
                    value: val,
                    text: `Dr ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                };
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
                localStorage.getItem("user_provider_firstname"),
                localStorage.getItem("user_provider_lastname"),
                localStorage.getItem("user_provider._id"),
                localStorage.getItem("user_provider_group_ref"),
                localStorage.getItem("user_provider_group_ref"),
                localStorage.getItem("user_provider_group_name") 
            ],
            text: `Dr ${startCase(localStorage.getItem("user_provider_firstname"))} ${startCase(localStorage.getItem("user_provider_lastname"))}`
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
        }];
        return defaultArray;
    };

    render() {
        const { providers } = this.state

        return (
            <FormSelect name="provider" label="Select provider" width="200" items={providers} value={providers[1]}/>
        );
    }
}
