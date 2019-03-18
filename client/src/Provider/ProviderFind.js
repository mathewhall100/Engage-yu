import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withStyles, Card } from '@material-ui/core/';
import ProviderSelect from '../components/Forms/ProviderSelect'
import ProviderDetails from './ProviderDetails'
import { selectConsoleTitle } from '../actions/index'
import FindForm from "../components/Forms/FindForm"

const styles = () => ({
    root: {
        padding: "20px 20px 10px 20px",
        minHeight: "120px"
    },
});  


class ProviderFind extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Manage Provider"});
    };
    
    state = {
        userGroupId: localStorage.getItem("provider_id"),
        providerList: [],
        displayDetails: false,
    }

    closeProviderDetails = () => {
        console.log("close provider details")
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
                    <FindForm 
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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const formData = {
    form: 'ProviderSelectForm' //unique identifier for this form 
}

ProviderFind = reduxForm(formData)(ProviderFind)
ProviderFind = withStyles(styles)(ProviderFind)
ProviderFind = connect(null, mapDispatchToProps) (ProviderFind)
export default ProviderFind