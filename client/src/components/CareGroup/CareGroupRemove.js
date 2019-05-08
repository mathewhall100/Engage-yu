import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { withStyles, Typography, Card } from '@material-ui/core'
import BtnAction from '../UI/Buttons/btnAction'
import DialogCustom from '../UI/Dialogs/dialogCustom'
import HrStyled from '../UI/hrStyled'
import CallBack from '../UI/callback'
import providerAPI from '../../utils/provider.js';
import provider_groupAPI from "../../utils/provider_group.js";
import { selectConsoleTitle } from '../../actions/index'
import CareGroupDetailsBar from './CareGroupDetailsBar'


const styles = () => ({
    root: {
        padding: "40px 40px"
    }
});


class CareGroupRemove extends Component {  
    
    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Delete Care Group", menuIndex: 7}));
        this.loadProvidersByGroup(this.props.careGroup._id)
    }

    state = {
        numProvidersInCareGroup: 0,
        errorLoadingProviders: false,
        success: false,
        failed: false,
    }

    loadProvidersByGroup(id) {
        providerAPI.findAllByGroup(id)
            .then(res => {
                this.setState({numProvidersInCareGroup: res.data.providerList.length})
            })
            .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({errorLoadingProviders: true})
        })
    };

    handleDelete = () => {
        provider_groupAPI.remove(this.props.careGroup._id)
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
            pathname: '/admin/caregroup/find'
        })
    }

    handleClose = () => {
        this.setState({
            success: false,
            failed: false
        })
    }

    render () {
        const { classes, careGroup, error, loading } = this.props
        const { success, failed, numProvidersInCareGroup, errorLoadingProviders} = this.state

        const texts = [
            `There are still ${numProvidersInCareGroup} providers in this care group.`,
            `You cannot delete a care group with active providers. Please use the manage provider menu to transfer all remaining providers to other care groups and then you can delete this care group from the application.`,
            `Select 'delete' to delete this caregroup from the list of caregroups held in the application.`,
            `Note, this action cannot be undone. deleted care groups can be re-added to the application by re-entering their details via the add care group page but all individual providers will need re-allocating to the newly added care group.`
        ]
    
        if (error || errorLoadingProviders) {
            return <Typography variant="subtitle1">"Care group cannot be deleted at this time. This may be temporary, so please try again later"/></Typography>
        }

        if (loading || !(careGroup && careGroup._id)) {
            return <CallBack fallBackText="Care group cannot be deleted at this time. This may be temporary, so please try again later"/>
        }

        return (
            <Card className={classes.root}> 

                <CareGroupDetailsBar careGroup={careGroup} />

                {numProvidersInCareGroup ?
                    <Fragment>
                        <Typography variant="subtitle1" gutterBottom>{texts[0]}</Typography>
                        <Typography variant="subtitle1" gutterBottom color='error'>{texts[1]}</Typography>
                    </Fragment>
                    :
                    <Fragment>
                        <Typography variant="subtitle1" gutterBottom>{texts[2]}</Typography>
                        <Typography variant="subtitle1" gutterBottom color='error'>{texts[3]}</Typography>
                        <br /> <HrStyled /> <br />
                        <BtnAction type ="button" disabled={false} text="cancel" marginRight={true} handleAction={this.handleCancel} />
                        <BtnAction type="button" disabled={false} text="delete" warning={true} handleAction={this.handleDelete} />
                    </Fragment> 
                }

                {success && 
                    <DialogCustom title="Success!" width="600px">
                        <Typography variant="subtitle1">
                             Care group '{careGroup.group_name}' has been successfully deleted.
                        </Typography>
                        <br /><br />
                        <BtnAction text="close" handleAction={() => this.handleCancel()} />
                    </DialogCustom>
                }

                {failed && 
                    <DialogCustom title="Failed!" width="600px">
                        <Typography variant="subtitle1">
                            A problem occurred and care group '{careGroup.group_name}' could not be deleted at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.
                        </Typography>
                        <br /><br />
                        <BtnAction text="close" handleAction={() => this.handleClose()} />
                    </DialogCustom>
                }
                
            </Card> 
        );
    }
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        careGroup: state.careGroup.careGroup,
        loading: state.careGroup.loading,
        error: state.careGroup.error,
    }
};

CareGroupRemove = withStyles(styles)(CareGroupRemove)
CareGroupRemove = connect(mapStateToProps)(CareGroupRemove)
export default CareGroupRemove