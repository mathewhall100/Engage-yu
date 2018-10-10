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

class FindPatientDetails extends Component {  

    
    
    componentDidMount() {
        
    }

    state = {
    }

    componentWillMount() {

    }


    render () {
        
        const { patientInfo, classes } = this.props
        
        return (
        
            <Card className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="title">
                            <span>{startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}</span>
                        </Typography>
                    </Grid>
                </Grid>

                <br />

                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Typography variant="caption">
                            Hospital number:
                        </Typography>
                        <Typography variant="subheading">
                            <span className={classes.textBold}>{patientInfo.hospital_id}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption">
                            DOB
                        </Typography>
                        <Typography variant="subheading">
                            <span  className={classes.textBold}>{patientInfo.dob}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant="caption">
                            Enrolled
                        </Typography>
                        <Typography variant="subheading">
                            <span  className={classes.textBold}>{moment(patientInfo.date_enrolled).format("MMM Do YYYY")}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={3}>
                    <Typography variant="caption">
                            Status
                        </Typography>
                        <Typography variant="subheading">
                            <span  className={classes.textBold}> {patientInfo.status}</span>
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                    </Grid>
                </Grid>

                <br />

                <Grid container spacing={24}>
                    <Grid item xs={2}>
                        <Typography variant="subheading">
                            <div>Email: </div> 
                            <div>Contact phone</div>
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subheading">
                            <div>{patientInfo.email}</div>
                            <div>{patientInfo.phone}</div>
                        </Typography>
                    </Grid>
                </Grid>

                <br />

                <Grid container spacing={24}>
                <Grid item xs={2}>
                        <Typography variant="subheading">
                            <div>Primary provider: </div>
                            <div>Care group:</div>
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subheading">
                            <div>{startCase(`Dr. ${patientInfo.primary_provider_name}`)}</div>
                            <div>{startCase(`${patientInfo.provider_group_name}`)}</div>
                        </Typography>
                    </Grid>
                </Grid>

                <br />

                <Grid container spacing={24}>
                <Grid item xs={2}>
                        <Typography variant="subheading">
                            <div>Active diary card: </div>
                            <div>Pending diary card: </div>
                            <div>Awaiting review: </div>
                        </Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="subheading">
                            <div></div>
                            <div></div>
                            <div></div>
                        </Typography>
                    </Grid>
                </Grid>

            </Card>
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

FindPatientDetails = connect(mapStateToProps)(FindPatientDetails)
FindPatientDetails = withStyles(styles)(FindPatientDetails)
export default FindPatientDetails;


