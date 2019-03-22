import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withStyles, Card } from '@material-ui/core';
import ProviderSelect from '../UI/Forms/FormProviderSelect'
import FormFind from "../UI/Forms/formFind"
import { selectConsoleTitle } from '../../actions'
import ProviderDetails from './ProviderDetails'


const styles = () => ({
    root: {
        padding: "20px 20px 10px 20px",
        minHeight: "120px"
    },
});  


class ProviderFind extends Component {  
    
    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Find Provider"}));
    };
    
    state = {
        userGroupId: localStorage.getItem("provider_id"),
        providerList: [],
        displayDetails: false,
    }

    closeProviderDetails = () => {
        this.setState({displayDetails: false})
        this.props.reset("ProviderSelectForm")
    }

    submit(values) {
        console.log("Submitted values: ", values);
        if (values.provider && values.provider[0] ) {
            this.setState({
                providerId: values.provider[0],
                displayDetails: !this.state.displayDetails
            })
        }
    };

    render () {
        const { displayDetails, providerId } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props
        
        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <FormFind 
                        title="Select provider:"
                        select={<ProviderSelect />}
                        url='/admin/provider/add'
                        btn="add new provider"
                        pristine={pristine}
                        submitting={submitting}
                    />
                </form>
                { displayDetails && <ProviderDetails  providerId={providerId} handleClose={this.closeProviderDetails}/> }
            </Card>
        )
    }
}


const formData = {
    form: 'ProviderSelectForm' //unique identifier for this form 
}

ProviderFind = reduxForm(formData)(ProviderFind)
ProviderFind = withStyles(styles)(ProviderFind)
export default ProviderFind