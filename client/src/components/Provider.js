import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reset, reduxForm } from 'redux-form';
import { startCase } from 'lodash'

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import FormSelect from './Forms/FormSelect'
import ProviderDetails from './ProviderDetails'
import ProviderEdit from './ProviderEdit'
import ProviderEditRole from './ProviderEditRole'
import ProviderEditGroup from './ProviderEditGroup'
import ProviderRemove from './ProviderRemove'
import ProviderEnrollForm from './ProviderEnrollForm'
import { selectConsoleTitle } from '../actions/index'
import providerAPI from "../utils/provider.js";

const styles = theme => ({
    submitBtn: {
        marginRight: 20,
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    Btn: {
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        hover: {},
    },
    cancelLnk: {
        textDecoration: "none",
    },

});  


class Provider extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Manage Provider"});

        let providerList = [];
        providerAPI.findAllByGroup(this.state.providerGroupId)
            .then(res => {
                console.log("res.data: " + JSON.stringify(res.data.providerList, null, 2 ));

                res.data.providerList.map((provider, index) => {
                    providerList.push({
                        value: provider._id,
                        text: `Dr ${startCase(provider.firstname)} ${startCase(provider.lastname)}`
                    })
                })
                this.setState({providerList: providerList})
                
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    };
    

    state = {
        // ProviderGroupId should be replaced with value in local storage
        providerGroupId: "5b846771f6d8b1d2fc8d45b2",
        providerList: [],

        displayDetails: false,
        editDetails: false,
        editRole: false,
        editGroup: false,
        removeprovider: false
    }

    submit(values) {
        console.log("Submitted values: ", values);
        this.setState({
            providerId: values.provider,
         })
        this.handleAction(1)
    };


    handleAction = (action) => {
        console.log("handleAction: ", action)
        let actionArray = [false,false,false,false,false];
        actionArray[action] = 1;

        this.setState({
            displayDetails: actionArray[1],
            editGroup: actionArray[2],
            editRole: actionArray[3],
            editDetails: actionArray[4],
            removeProvider: actionArray[5],
        })
    }

    render () {

        const { displayDetails, editDetails, editRole, editGroup, removeProvider, providerList, providerId } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props
        
        return (
                <div>
                    <Card style={{padding: "20px"}}>

                        <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <br />
                            <Grid container spacing={24} >
                                <Grid item xs={2}>
                                    Select existing provider: 
                                </Grid>

                                <Grid item xs={4}>
                                    <div style={{position: "relative", top: "-15px"}}>
                                        <FormSelect 
                                            name="provider" 
                                            label="Primary Provider"
                                            items={providerList}
                                        /> 
                                    </div>
                                </Grid>
                                <Grid item xs={1}>
                                        <Button size="small" type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                                    </Grid>
                                <Grid item xs={2}>
                                        <div style={{textAlign: "center", paddingTop: "10px"}}>
                                            or 
                                        </div>
                                </Grid>
                                <Grid item xs={3}>
                                   <Link to={"/admin/providerenroll"}><Button size="small" type="enroll" className={classes.Btn}>Enroll a new provider</Button></Link>
                                </Grid>
                            </Grid>
                        </form>
                    
                        <br />

                        { displayDetails && <ProviderDetails  providerId={providerId} handleAction={this.handleAction}/> }

                        { editDetails && <ProviderEdit handleAction={this.handleAction}/> }

                        { editRole && <ProviderEditRole handleAction={this.handleAction}/> }

                        { editGroup && <ProviderEditGroup handleAction={this.handleAction}/> }

                        { removeProvider && <ProviderRemove handleAction={this.handleAction}/> }

                    </Card>
                </div> 
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        user: state.user
    }
};

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

const formData = {
    form: 'ProviderSelectForm' //unique identifier for this form 
}

Provider = reduxForm(formData)(Provider)
Provider = withStyles(styles)(Provider)
Provider = connect(mapStateToProps, mapDispatchToProps) (Provider)
export default Provider