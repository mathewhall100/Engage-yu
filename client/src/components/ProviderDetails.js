import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Callback from './Callback'
import providerAPI from "../utils/provider.js";

const styles = theme => ({
    root: {
        padding: "20px"
    },
    textBold: {
        fontWeight: "bold",
      },
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginLeft: "20px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
})

class ProviderDetails extends Component {  

    
    componentDidMount() {
        let provider = [];
        providerAPI.findById(this.props.providerId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.setState({provider: res.data})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }

    componentWillReceiveProps(nextProps) {
        let provider = [];
        providerAPI.findById(nextProps.providerId)
            .then(res => {
                console.log("res.data: ", res.data);
                this.setState({provider: res.data})
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
        })
    }

    state = {
        provider: null
    }

    componentWillMount() {
    }

findNumPatients = () => {

}

findNumDiaryCreated = () => {

}

findNumDiaryReviewed = () => {

}


    render () {
        
        const { patientInfo, classes } = this.props
        const { provider } = this.state
        
        return (

            <div>
        
                <Card className={classes.root}>

                    { provider === null && < Callback /> }

                    { provider && <div>

                        <Grid container spacing={24}>
                            <Grid item xs={12}>
                                <Typography variant="title">
                                    <span>Dr.{startCase(provider.firstname)} {startCase(provider.lastname)} </span>
                                </Typography>
                            </Grid>
                        </Grid>

                        <br />

                        <Grid container spacing={24}>

                            <Grid item xs={4}>
                            <Typography variant="caption">
                                    Role
                                </Typography>
                                <Typography variant="subheading">
                                    <span  className={classes.textBold}>{provider.role}</span>
                                </Typography> 
                            </Grid>

                            <Grid item xs={4}>
                                <Typography variant="caption">
                                    Care Group
                                </Typography>
                                <Typography variant="subheading">
                                    <span className={classes.textBold}>{startCase(provider.provider_group_name)}</span>
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
                                <Typography variant="caption">
                                    Added
                                </Typography>
                                <Typography variant="subheading">
                                    <span  className={classes.textBold}>{moment(provider.date_added).format("MMM Do YYYY")}</span>
                                </Typography>
                            </Grid>

                            <Grid item xs={2}>
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
                                                            <td style={{width: "100px"}}>{phone.phone}</td>
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

                        <Grid container spacing={24}>
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
                        </Grid>
                    </div> }
                </Card>

                <br />

               { provider && <div>
                   <div styles={{float: "right"}}>
                        <Button size="small" className={classes.btn}>cancel</Button>
                        <Button size="small" className={classes.btn}>remove provider</Button> 
                        <Button size="small" className={classes.btn}>update care group</Button> 
                        <Button size="small" className={classes.btn}>edit details</Button>
                       
                    </div>
                </div> }
            </div> 
        );
    }
}


const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
};

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

ProviderDetails = connect(mapStateToProps)(ProviderDetails)
ProviderDetails = withStyles(styles)(ProviderDetails)
export default ProviderDetails;