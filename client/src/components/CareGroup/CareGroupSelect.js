import React, {Component}from 'react'
import { startCase } from 'lodash'
import FormSelect from '../UI/Forms/formSelect'
import provider_groupAPI from "../../utils/provider_group.js";

export default class CareGroupSelect extends Component {

    state = {
        careGroups: []
    }
    
    componentDidMount() {
        // fetch all providers in provider group 
        provider_groupAPI.findAll()
        .then(res => {
            console.log("res.data: ", res.data);
            let careGroups = [];
            careGroups = res.data.map(group => {
                return {
                    value: [group._id, group.group_name],
                    text: `${startCase(group.group_name)}`,
                }
            })
            this.setState({careGroups})
            if (careGroups && careGroups.length > 0) this.setState({careGroups})
                else this.setState({careGroups: this.default()}) 
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({careGroups: this.default()}) 
        })
    };

    // return default list if empty/error
    default = () => {
        const defaultArray = [{
            value: [
                localStorage.getItem("user_provider_group_ref"),
                localStorage.getItem("user_provider_group_name") 
            ],
            text: `${startCase(localStorage.getItem("user_provider_group_name"))}`
            },{
            value: [
                "000000000000000000000000",
                ""
            ],
            text: "Other"
        }]
        return defaultArray;
    };

    render() {
        const { careGroups } = this.state
        const { width } = this.props
        return (
                <FormSelect name="caregroup" label="Select care group" width={width ? width : "215"} items={careGroups}/>
        )
    }
}