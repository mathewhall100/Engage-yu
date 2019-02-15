import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import ActionBtn from '../Buttons/actionBtn'
import { selectConsoleTitle, providerAction } from '../../actions/index'
import providerAPI from "../../utils/provider.js";
import Dialog from '../Dialogs/simpleDialog';
import CallBack from '../Callback'
import HrStyled from '../commons/hrStyled'
import ProviderDetailsBar from './providerDetailsBar'


const styles = theme => ({
    root: {
        padding: "40px"
    },
})

class ProviderRemove extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Remove provider"});
    }

    state = {
        removeSuccess: false,
        removeFailed: false,
    }

    handleRemove() {
        console.log("handleRemove: ")
        providerAPI.delete(this.props.provider._id)
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState ({removeSuccess: true})   // update success dialog
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({removeFailed: true}); // update failed dialog
        })
    }

    handlecancel = () => {
        this.props.history.push({
            pathname: 'admin/provider/find'
        })
    }


    render () {
        
        const { provider, classes } = this.props
        const { removeFailed, removeSuccess} = this.state

        return (
            <Card className={classes.root}>

                {provider && provider._id ? 
                    <React.Fragment>

                        <ProviderDetailsBar provider={provider} />

                        <br /> <hr /> <br />

                        <Typography variant="body1" gutterBottom>
                            Select 'Remove' to remove this provider from the list of providers held in the application. 'Cancel' to cancel.
                        </Typography>
                        <Typography variant="body1" gutterBottom color="error">
                            Note, this action cannot be undone. Removed providers can be added back by re-entering all their details via the 'new provider' page.
                        </Typography>

                        <br /> <HrStyled /> <br />
                                    
                        <span style={{marginRight: "15px"}}>
                            <ActionBtn type ="button" disabled={false} text="cancel" handleAction={this.handleCancel} />
                        </span>
                        <ActionBtn type="button" disabled={false} text="delete" handleAction={this.handledelete} />

                        {removeSuccess && <Dialog providerName={`Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`} />}
                        {removeFailed && <Dialog />} 

                    </React.Fragment>
                    :
                    <CallBack />
                }

                {removeSuccess && 
                    <Dialog 
                        title="Success!" 
                        text={`provider ${provider.firstname} ${provider.lastname} has been successfully deleted`}
                    />
                }
                {removeFailed && 
                    <Dialog 
                        title="Failed!" 
                        text={`A problem occurred and provider ${provider.firstname} ${provider.lastname}  could not be deleted at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.`} 
                    />
                }

            </Card>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, providerAction }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        provider: state.provider,
    }
};

ProviderRemove = withStyles(styles)(ProviderRemove)
ProviderRemove = connect(mapStateToProps, mapDispatchToProps)(ProviderRemove)
export default ProviderRemove;