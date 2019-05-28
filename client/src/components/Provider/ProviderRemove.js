import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { withStyles, Card, Typography } from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import DialogCustom from '../UI/Dialogs/dialogCustom';
import CallBack from '../UI/callback'
import HrStyled from '../UI/hrStyled'
import FormText from '../UI/Forms/formText'
import { selectConsoleTitle } from '../../actions'
import providerAPI from "../../utils/provider";
import ProviderDetailsBar from './ProviderDetailsBar'
import ProviderName from '../UI/providerName'


const styles = () => ({
    root: {
        padding: "40px"
    },
})

class ProviderRemove extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Remove Provider", menuIndex: 6}));
    }

    state = {
        success: false,
        failed: false,
    }

    submit = (values) => {
        console.log(values)
        if (values.lastname.toLowerCase().trim() === this.props.provider.lastname.toLowerCase().trim()) {
            providerAPI.delete(this.props.provider._id)
            .then(res => {
                console.log("result: ", res.data)
                this.setState ({success: true})   // update success dialog
            })
            .catch(err => {
                console.log(err)
                console.log(err.response)
                this.setState({failed: true}); // update failed dialog
            })
        } else this.props.reset("Confirmform")
    }

    handleCancel = () => {
        this.props.history.push({
            pathname: '/admin/provider/find'
        })
    }

  
    render () {
        const { provider, error, loading, classes, handleSubmit } = this.props
        const { failed, success} = this.state  

        const texts=["Select 'Remove' to remove this provider from the list of providers held in the application. 'Cancel' to cancel.",
                     "Note, this action cannot be undone. Removed providers can be added back by re-entering all their details via the 'new provider' page."]
        
        if (error) {
            return <Typography variant="subtitle1">"Provider cannot be deleted at this time. This may be temporary, so please try again later"/></Typography>
        }

        if (loading || !(provider && provider._id)) {
            return <CallBack fallBackText="Provider cannot be deleted at this time. This may be temporary, so please try again later"/>
        }


        return (
            <Card className={classes.root}>

                <ProviderDetailsBar provider={provider} />

                <Typography variant="subtitle1" gutterBottom>{texts[0]}</Typography>
                <Typography variant="subtitle1" gutterBottom color="error">{texts[1]}</Typography>

                <br /> <HrStyled /> <br />

                <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                <span style={{ marginRight: "20px"}}> 
                    <FormText type="text" name="lastname" label="Enter provider lastname to remove" variant="outlined" width="320" helpText={false} />
                </span>
                <span style={{position: "relative", top: "38px"}}>
                    <BtnAction type="submit" disabled={false} text="remove" marginRight={true} warning={true} />
                    <BtnAction type ="button" disabled={false} text="cancel" marginRight={true} handleAction={this.handleCancel} />
                </span>
                </form>
                
                {success && 
                    <DialogCustom title="Success!" width="600px">
                        <Typography variant="subtitle1">
                            <ProviderName 
                                title={provider.title}
                                firstname={provider.firstname} 
                                lastname={provider.lastname} 
                            /> 
                            successfully removed from the application.
                        </Typography>
                        <br /><br />
                        <BtnAction text="close" style={{float: "right"}} handleAction={this.handleCancel} />
                    </DialogCustom>
                }

                {failed && 
                    <DialogCustom title="Failed!" width="600px">
                        <Typography variant="subtitle1">
                            A problem occurred and provider '
                            <ProviderName 
                                title={provider.title} 
                                firstname={provider.firstname} 
                                lastname={provider.lastname} 
                            />
                            ' could not be removed at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.
                        </Typography>
                        <br /><br />
                        <BtnAction text="close" handleAction={this.handleCancel} />
                        <br/>
                    </DialogCustom>
                }
            
            </Card>
        );
    }
}

const formData = {
	form: 'ConfirmForm', //unique identifier for this form
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        provider: state.provider.provider,
        loading: state.provider.loading,
        error: state.provider.error,
    }
};

ProviderRemove = withStyles(styles)(ProviderRemove)
ProviderRemove = reduxForm(formData)(ProviderRemove)
ProviderRemove = connect(mapStateToProps)(ProviderRemove)
export default ProviderRemove;