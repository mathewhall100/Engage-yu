import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HandleBtns from './Buttons/handleBtns'

const styles = theme => ({
    root: {
        padding: "20px"
    },
    fwMedium: {
        fontWeight: 500,
      },
    hrStyled: {
        opacity: 0.1
    }
})

class FindPatientDetails extends Component {  

    findNumSurveys = (filter) => {
        //console.log("Patient Data: ", this.props.patientData.length)
        let surveys = [];
        if (this.props.patientData.length !== 0) {
            surveys = this.props.patientData.episodes.filter(episode => episode.status === filter)
            return surveys.length
        } else {return "Loading..."}
    }

    handleActionBtns = (btn, _id) => {
        this.props.handleActionBtns(btn, _id)
    }

    render () {
        
        const { patientInfo, classes } = this.props
        const infoH = [
            {caption: "Hospital number", info: patientInfo.hospital_id},
            {caption: "DOB", info: patientInfo.dob},
            {caption: "Enrolled", info: moment(patientInfo.date_enrolled).format("MMM Do YYYY")},
            {caption: "Status", info: patientInfo.status},
        ];
        const infoVLeft = [
            {caption: ["Email", "Contact phone", "Primary provider", "Care group"], info: [patientInfo.email, patientInfo.phone, startCase(`Dr. ${patientInfo.primary_provider_name}`), startCase(`${patientInfo.provider_group_name}`) ]},

        ];
        const infoVRight = [
            {caption: ["Active diary cards", "pending diary cards", "awaiting review"], info: [this.findNumSurveys("active"), this.findNumSurveys("pending"),this.findNumSurveys("awaiting review") ]},
        ];

        return (
        
            <Card className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h6" inline>
                            {startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}
                        </Typography>
                        <Typography align="right" inline>
                            <HandleBtns 
                                btns={["close"]} 
                                _id={patientInfo._id}
                                handleActionBtns={this.handleActionBtns}
                                />
                        </Typography>
                    </Grid>
                </Grid>

                <br />
                
                <Grid container spacing={24}>
                    { infoH.map((info, idx) => {
                        return (
                            <Grid item xs={3} key={idx}>
                                <Typography variant="caption">
                                    {info.caption}
                                </Typography>
                                <Typography variant="subtitle1" className={classes.fwMedium}>
                                    {info.info}
                                </Typography>
                            </Grid>
                        )
                    }) }
                </Grid>

                <br />

                <Grid container spacing={24}>
                    <Grid item xs={7}>
                        { infoVLeft.map((info, index) => {
                            return (
                                <Grid container spacing={24} key={index}>
                                    <Grid item xs={4}>
                                        { info.caption.map((caption, idx) => {
                                            return (
                                                <Typography variant="subtitle1" key={idx}>{caption}</Typography> 
                                            )
                                        }) }
                                    </Grid>
                                    <Grid item xs={8}>
                                        { info.info.map((info, idx) => {
                                            return (
                                                <Typography variant="subtitle1" className={classes.fwMedium} key={idx}>{info}</Typography> 
                                            )
                                        }) }
                                    </Grid>
                                    <br />
                                </Grid>
                            )
                        }) }
                    </Grid>
                    <Grid item xs={5}>
                    <Typography variant="subtitle1" className={classes.fwMedium} gutterBottom>Recent activity</Typography>
                        { infoVRight.map((info, index) => {
                            return (
                                <Grid container spacing={24} key={index}>
                                    <Grid item xs={6}>
                                        { info.caption.map((caption, idx) => {
                                            return (
                                                <Typography variant="subtitle1" style={{paddingLeft: "16px"}} key={idx}>{caption}</Typography> 
                                            )
                                        }) }
                                    </Grid>
                                    <Grid item xs={6}>
                                            { info.info.map((info, idx) => {
                                                return (
                                                    <Typography variant="subtitle1" className={classes.fwMedium} key={idx}>{info}</Typography> 
                                                )
                                            }) }
                                    </Grid>
                                    <br />
                                </Grid>
                            )
                        }) }
                    </Grid>
                </Grid>
                <br />        
                <hr className={classes.hrStyled}/>
                <br />

                <HandleBtns 
                    btns={["contact", "edit details", "view reports", "new survey"]} 
                    _id={patientInfo._id}
                    handleActionBtns={this.handleActionBtns}
                />
                <br />
            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
};

FindPatientDetails = connect(mapStateToProps)(FindPatientDetails)
FindPatientDetails = withStyles(styles)(FindPatientDetails)
export default FindPatientDetails;


