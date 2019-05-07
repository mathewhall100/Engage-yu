import React, {Component}from 'react';
import { connect } from 'react-redux';
import FormSelect from './formSelect';
import ProviderName from '../providerName'
import { loadProvidersByCareGroup } from '../../../actions'

class FormProviderSelect extends Component {

    state = {
        providers: []
    };
    
    componentDidMount() {
        const id = localStorage.getItem("user_provider_group_id")
        this.props.dispatch(loadProvidersByCareGroup(id))
    }

    componentWillReceiveProps(nextProps) {
        let providers = [];
        if (nextProps.providers !== this.props.providers) {
            if (nextProps.providers && nextProps.providers.length > 0) this.setState({providers: nextProps.providers})
                else this.setState({providers: this.defaultProviderList()}) 
        } 
        if (nextProps.errorProviders) this.setState({providers: this.defaultProviderList() })
    }

    // return default list if empty/error
    defaultProviderList = () => {
        const defaultArray = [{
            value: [
                localStorage.getItem("user_provider._id"),
                localStorage.getItem("user_provider_title"),
                localStorage.getItem("user_provider_firstname"),
                localStorage.getItem("user_provider_lastname"),
                localStorage.getItem("user_provider_role"),
                localStorage.getItem("user_provider_group_id"),
                localStorage.getItem("user_provider_group_name") 
            ],
            text: <ProviderName title={""} firstname={localStorage.getItem("user_provider_firstname")} lastname={localStorage.getItem("user_provider_lastname")} />
            },{
            value: [
                "000000000000000000000000",
                "",
                "",
                "",
                "",
                "000000000000000000000000",
                "",
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

const mapStateToProps = (state) => {
    console.log("state: ", state)
    return {
         providers: state.providersByGroup.listProviders,
         loadingProviders: state.providersByGroup.loading,
         errorProviders: state.providersByGroup.error
    }
}

export default connect(mapStateToProps, null)(FormProviderSelect)

