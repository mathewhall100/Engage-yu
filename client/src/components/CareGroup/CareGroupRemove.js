import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import ActionBtn from '../Buttons/actionBtn'
import Dialog from '../Dialogs/SimpleDialog'
import CareGroupDetailsBar from './CareGroupDetailsBar'
import HrStyled from '../commons/hrStyled'
import CallBack from '../Callback'
import providerAPI from '../../utils/provider.js';
import provider_groupAPI from "../../utils/provider_group.js";
import { selectConsoleTitle } from '../../actions/index'


const styles = theme => ({
    root: {
        padding: "40px 40px"
    }
});


class CareGroupRemove extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Delete Care Group"});
        if (this.props.careGroup && this.props.careGroup._id ) {
            this.fetchProvidersByGroup(this.props.careGroup._id)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.careGroup !== this.props.careGroup ){
            this.fetchProvidersByGroup(this.props.careGroup._id)
        }
    }

    state = {
       success: false,
       failed: false,
       providerList: []
    }

    fetchProvidersByGroup(id) {
        let providerList = [];
        providerAPI.findAllByGroup(id)
            .then(res => {
                res.data.providerList.map(provider => {
                    providerList.push({
                        name: `Dr. ${startCase(provider.firstname)} ${startCase(provider.lastname)}`,
                        office: provider.office.name,
                        role: provider.role
                    })
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

        const { success, failed, providerList } = this.state
        const { classes, careGroup } = this.props

        return (
            <Card className={classes.root}> 

                {careGroup && careGroup._id ? 
                    <React.Fragment>

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
                                    <ActionBtn type ="button" disabled={false} text="cancel" handleAction={this.handleCancel} />
                                </span>
                                <ActionBtn type="button" disabled={false} text="delete" handleAction={this.handledelete} />
                            </React.Fragment> 
                        }

                    </React.Fragment>
                    :
                    <CallBack /> 
                }

                {success && 
                    <Dialog 
                        title="Success!" 
                        text={`Care group '${careGroup.group_name}' has been successfully deleted`}
                    />
                }
                {failed && 
                    <Dialog 
                        title="Failed!" 
                        text={`A problem occurred and care group '${careGroup.group_name}' could not be deleted at this time. Please check that this is an appropriate action and try again if required. If the problem persists, contact the system administrator.`} 
                    />
                }
                
            </Card> 
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        careGroup: state.careGroup,
    }
};

CareGroupRemove = withStyles(styles)(CareGroupRemove)
CareGroupRemove = connect(mapStateToProps, mapDispatchToProps)(CareGroupRemove)
export default CareGroupRemove