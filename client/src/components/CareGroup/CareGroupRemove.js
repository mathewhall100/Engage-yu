import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import { withStyles, Typography, Card } from '@material-ui/core'
import BtnAction from '../UI/Buttons/btnAction'
import DialogGeneric from '../UI/Dialogs/dialogGeneric'
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
        this.props.dispatch(selectConsoleTitle({title: "Delete Care Group"}));
        this.loadProvidersByGroup(this.props.careGroup._id)
    }

    state = {
       success: false,
       failed: false,
       providerList: []
    }

    loadProvidersByGroup(id) {
        let providerList = [];
        providerAPI.findAllByGroup(id)
            .then(res => {
                providerList = res.data.providerList.map(provider => {
                    return {
                        name: `Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                        office: provider.office.name,
                        role: provider.role
                    }
                })
                this.setState({providerList: providerList})
            })
            .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    handleDelete() {
        console.log("handleDelete: ", this.props.careGroup._id)
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

    handlecancel = () => {
        this.props.history.push({
            pathname: 'admin/caregroup/find'
        })
    }

    render () {
        const { classes, careGroup, error, loading } = this.props
        const { success, failed, providerList } = this.state
    
        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !careGroup._id ) {
            return <CallBack />
        }

        return (
            <Card className={classes.root}> 

                <CareGroupDetailsBar careGroup={careGroup} />

                { providerList.length ?
                    <React.Fragment>
                        <Typography variant="subtitle1" gutterBottom>
                            There are still {providerList.length} providers in this care group.
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom color='error'>
                            You cannot delete a care group with active providers. Please use the manage provider menu  to transfer all remaining providers to other care groups and then you can delete this care group from the application.
                        </Typography>
                    </React.Fragment>

                    :

                    <React.Fragment>
                        <Typography variant="subtitle1" gutterBottom>
                            Select 'delete' to delete this caregroup from the list of caregroups held in the application.
                        </Typography>
                        <Typography variant="subtitle1" gutterBottom color='error'>
                            Note, this action cannot be undone. deleted care groups can be re-added to the application by re-entering their details via the add care group page but all individual providers will need re-allocating to the newly added care group.
                        </Typography>
                    
                        <br /> <HrStyled /> <br />
                    
                        <span style={{marginRight: "15px"}}>
                            <BtnAction type ="button" disabled={false} text="cancel" handleAction={this.handleCancel} />
                        </span>
                        <BtnAction type="button" disabled={false} text="delete" handleAction={this.handledelete} />
                    </React.Fragment> 
                }


                {success && 
                    <DialogGeneric 
                        title="Success!" 
                        text={`Care group '${careGroup.group_name}' has been successfully deleted`}
                    />
                }
                {failed && 
                    <DialogGeneric
                        title="Failed!" 
                        text={`A problem occurred and care group '${careGroup.group_name}' could not be deleted at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.`} 
                    />
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