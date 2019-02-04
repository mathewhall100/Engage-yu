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
import PatientActionBtns from '../components/Buttons/patientActionBtns'

const styles = theme => ({
    root: {
        padding: "20px"
    },
    fwMedium: {
        fontWeight: 500,
      },
    hrStyled: {
        opacity: 0.3
    }
})

class FindPatientDetails extends Component {  

    findCards = (filter) => {
        console.log("Patient Data: ", this.props.patientData.length)
        let cards = [];
        let tempArray = []
        if (this.props.patientData.length !== 0) {
            cards = this.props.patientData.episodes.filter(episode => episode.status === filter)
            console.log("cards: ", cards)
            return cards.length
        } else {return "Loading..."}
    }

    handleActionBtns = (btn, id) => {
        this.props.handleActionBtns(btn, id)
    }

    render () {
        
        const { patientInfo, patientData, classes } = this.props
        const infoH = [
            {caption: "Hospital number", info: patientInfo.hospital_id},
            {caption: "DOB", info: patientInfo.dob},
            {caption: "Enrolled", info: moment(patientInfo.date_enrolled).format("MMM Do YYYY")},
            {caption: "Status", info: patientInfo.status},
        ];
        const infoV = [
            {caption: ["Email", "Contact phone"], info: [patientInfo.email, patientInfo.phone ]},
            {caption: ["Primary provider", "Care group"], info: [startCase(`Dr. ${patientInfo.primary_provider_name}`), startCase(`${patientInfo.provider_group_name}`) ]},
            {caption: ["Active diary cards", "pending diary cards", "awaiting review"], info: [this.findCards("active"), this.findCards("pending"),this.findCards("awaiting review") ]},
        ];

        return (
        
            <Card className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h6" inline>
                            {startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}
                        </Typography>
                        <Typography align="right" inline>
                            <PatientActionBtns 
                                btns={["close"]} 
                                id={patientInfo._id}
                                handleActionBtns={this.handleActionBtns}
                                />
                        </Typography>
                    </Grid>
                </Grid>

                <br />
                
                <Grid container spacing={24}>
                    { infoH.map(info => {
                        return (
                            <Grid item xs={2}>
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

                { infoV.map(info => {
                    return (
                        <Grid container spacing={24}>
                            <Grid item xs={2}>
                                <Typography variant="subtitle1">
                                    { info.caption.map(caption => {
                                        return (
                                            <div>{caption}</div> 
                                        )
                                    }) }
                                </Typography>
                            </Grid>
                            <Grid item xs={10}>
                                <Typography variant="subtitle1" className={classes.fwMedium}>
                                    { info.info.map(info => {
                                        return (
                                            <div>{info}</div> 
                                        )
                                    }) }
                                </Typography>
                            </Grid>
                            <br />
                        </Grid>
                    )
                }) }

                <hr className={classes.hrStyled}/>
                <br />

                <PatientActionBtns 
                    btns={["contact", "edit details", "view reports", "new survey"]} 
                    id={patientInfo._id}
                    handleActionBtns={this.handleActionBtns}
                />
                <br />
            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
};

FindPatientDetails = connect(mapStateToProps)(FindPatientDetails)
FindPatientDetails = withStyles(styles)(FindPatientDetails)
export default FindPatientDetails;


