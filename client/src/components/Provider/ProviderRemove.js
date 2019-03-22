import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Card, Typography } from '@material-ui/core';
import BtnAction from '../UI/Buttons/btnAction'
import DialogGeneric from '../UI/Dialogs/dialogGeneric';
import CallBack from '../UI/callback'
import HrStyled from '../UI/hrStyled'
import { selectConsoleTitle } from '../../actions'
import providerAPI from "../../utils/provider.js";
import ProviderDetailsBar from './ProviderDetailsBar'


const styles = () => ({
    root: {
        padding: "40px"
    },
})

class ProviderRemove extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Remove Provider"}));
    }

    state = {
        success: false,
        failed: false,
    }

    handleRemove() {
        console.log("handleRemove: ")
        providerAPI.delete(this.props.provider._id)
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState ({success: true})   // update success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({failed: true}); // update failed dialog
        })
    }

    handleCancel = () => {
        this.props.history.push({
            pathname: '/admin/provider/find'
        })
    }

  
    render () {
        const { provider, error, loading, classes } = this.props
        const { failed, success} = this.state  

        const texts=["Select 'Remove' to remove this provider from the list of providers held in the application. 'Cancel' to cancel.",
                     "Note, this action cannot be undone. Removed providers can be added back by re-entering all their details via the 'new provider' page."]
        
        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !provider._id) {
            return <CallBack />
        }


        return (
            <Card className={classes.root}>

                <ProviderDetailsBar provider={provider} />

                <Typography variant="subtitle1" gutterBottom>{texts[0]}</Typography>
                <Typography variant="subtitle1" gutterBottom color="error">{texts[1]}</Typography>

                <br /> <HrStyled /> <br />
                            
                <span style={{marginRight: "15px"}}>
                    <BtnAction type ="button" disabled={false} text="cancel" handleAction={this.handleCancel} />
                </span>
                <BtnAction type="button" disabled={false} text="delete" handleAction={this.handledelete} />

                {success && 
                    <DialogGeneric 
                        title="Success!" 
                        text={`provider ${provider.firstname} ${provider.lastname} has been successfully deleted`}
                    />
                }

                {failed && 
                    <DialogGeneric
                        title="Failed!" 
                        text={`A problem occurred and provider ${provider.firstname} ${provider.lastname}  could not be deleted at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.`} 
                    />
                }
            
            </Card>
        );
    }
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
ProviderRemove = connect(mapStateToProps)(ProviderRemove)
export default ProviderRemove;