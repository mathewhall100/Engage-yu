import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HandleBtns from '../Buttons/handleBtns'
import HrStyled from '../commons/hrStyled'
import Callback from '../Callback'
import { providerAction } from '../../actions/index'


import providerAPI from "../../utils/provider.js";

const styles = theme => ({
    root: {
        padding: "40px"
    },
    textBold: {
        fontWeight: "bold",
      },
})

class ProviderDetails extends Component {  
   
    
    componentDidMount() {
        providerAPI.findById(this.props.providerId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.props.providerAction(res.data);
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }

    state = {
    }

    // Event handlers
    handleAction = (action) => {
        switch(action) {
            case "remove provider":
                this.props.history.push({
                    pathname: '/admin/provider/remove',
                    state: {providerId: this.props.provider._id}
                })
                break;
            case "update details":
                this.props.history.push({
                    pathname: '/admin/provider/update',
                    state: {providerId: this.props.provider._id}
                })
                break;
            case "reassign care group":
                this.props.history.push({
                    pathname: '/admin/provider/updategroup',
                    state: {providerId: this.props.provider._id}
                })
                break;
            default: null
        }
    }


    render () {
        
        const { classes, provider } = this.props

        return (
            <Card className={classes.root}>

                { provider  ?
                    <React.Fragment>

                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                            <Typography variant="caption">Provider name</Typography>
                                <Typography variant="title">Dr.{startCase(provider.firstname)} {startCase(provider.lastname)}</Typography>
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={24}>
                            <Grid item xs={4}>
                                <Typography variant="caption">Role</Typography>
                                <Typography variant="subheading" className={classes.textBold}>{provider.role}</Typography> 
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="caption">Care group</Typography>
                                <Typography variant="subheading" className={classes.textBold}>{startCase(provider.provider_group_name)}</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <Typography variant="caption">Added</Typography>
                                <Typography variant="subheading" className={classes.textBold}>{moment(provider.date_added).format("MMM Do YYYY")}</Typography>
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                <Typography variant="subheading">
                                    <div>Email: </div>
                                    <br />
                                    <div>Phone:</div>
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subheading">
                                    <div>{provider.email}</div>
                                    <br />
                                    <div>
                                        <table>
                                            <tbody>
                                                {provider.phone.map((phone, index) => {
                                                    return (
                                                    <tr key={index}>
                                                            <td style={{width: "200px"}}>{phone.number} {phone.ext && <span>ext. {phone.ext}</span> }</td>
                                                            <td style={{width: "100px"}}>({phone.phone})</td>
                                                    </tr>
                                                    )
                                                }) }
                                            </tbody>
                                        </table>
                                    </div>
                                </Typography> 
                            </Grid>
                        </Grid> 

                        <br />

                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                <Typography variant="subheading">
                                    <div>Office: </div>
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subheading">
                                    <div>{startCase(provider.office.name)}</div>
                                    { provider.office.address1 && <div>{startCase(provider.office.addres12)}</div> }
                                    { provider.office.address2 && <div>{startCase(provider.office.address2)}</div> }
                                    <div>{startCase(provider.office.city)}</div> 
                                    <div>{startCase(provider.office.state)}</div>
                                    <div>{startCase(provider.office.zip)}</div>
                                </Typography>
                            </Grid>
                        </Grid>

                        <br />

                        {/* <Grid container spacing={24}>
                            <Grid item xs={4}>
                                <Typography variant="subheading">
                                    <div>Primary provider to: </div>
                                    <div>N<sup>o</sup> diary cards created: </div>
                                    <div>N<sup>o</sup> diary cards reviewed: </div>
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography variant="subheading">
                                    <div>{this.findNumPatients()}</div>
                                    <div>{this.findNumDiaryCreated()}</div>
                                    <div>{this.findNumDiaryReviewed()}</div> 
                                    <div></div>
                                </Typography>
                            </Grid>
                        </Grid> */}

                        <br />        
                        <HrStyled />
                        <br />

                        <HandleBtns 
                            btns={["remove provider", "reassign care group", "update details"]} 
                            _id={provider._id}
                            handleActionBtns={this.handleAction}
                        />   

                    </React.Fragment>

                    : 
                    
                    <Callback /> 
                }
            </Card>  
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ providerAction }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        provider: state.provider,
    }
};

ProviderDetails = withRouter(ProviderDetails)
ProviderDetails = connect(mapStateToProps, mapDispatchToProps)(ProviderDetails)
ProviderDetails = withStyles(styles)(ProviderDetails)
export default ProviderDetails;