import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import DiaryIcon from '@material-ui/icons/ListAlt';
import ReportIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import ContactIcon from '@material-ui/icons/ContactMail';
import BtnCloseIcon from '../UI/Buttons/btnCloseIcon';
import BtnGroup from '../UI/Buttons/btnGroup';

import CallBack from '../UI/callback'

const styles = () => ({
    root: {
        padding: "20px 40px"
    },
    fwMedium: {
        fontWeight: 500,
      },
    hrStyled: {
        opacity: 0.2
    },
    handleBtnIcon: {
        fontSize: "20px", 
    },
})

class PatientFindDetails extends PureComponent {  

    findNumSurveys = (filter) => {
        if (this.props.patientData && this.props.patientData.episodes) {
            return this.props.patientData.episodes.filter(episode => episode.status === filter).length
        } else return null
    }

    handleClose = () => {
        this.props.infoPanel("close")
    }

    render () {
        const { patientInfo, error, loading, classes } = this.props

        const getInfoH = (patientInfo) => { return [
            {caption: "Hospital number", info: patientInfo.hospital_id},
            {caption: "DOB", info: patientInfo.dob},
            {caption: "Enrolled", info: moment(patientInfo.date_enrolled).format("MMM Do YYYY")},
            {caption: "Status", info: patientInfo.status},
            {caption: "", info: ""},
            {caption: "", info: ""}
        ]};
        const getInfoV = (patientInfo) => {return [
             ["Email", "Contact phone", "Primary provider", "Care group"],
             [patientInfo.email, patientInfo.phone, startCase(`Dr. ${patientInfo.primary_provider_firstname} ${patientInfo.primary_provider_lastname}`), startCase(`${patientInfo.provider_group_name}`)],
             ["Active diary cards", "Pending diary cards", "Awaiting review", "Actioned"],
             [this.findNumSurveys("active"), this.findNumSurveys("pending"),this.findNumSurveys("awaiting review"), this.findNumSurveys("actioned")]
        ]};
        const btns = [
            {btn: "contact", type: "button", icon: <ContactIcon className={classes.handleBtnIcon} />},
            {btn: "edit", type: "button", icon: <EditIcon className={classes.handleBtnIcon} />},
            {btn: "reports", type: "button", icon: <ReportIcon className={classes.handleBtnIcon} />},
            {btn: "new diary card", type: "button", icon: <DiaryIcon className={classes.handleBtnIcon} />}
        ];

        if (error) {
            return <div>Error! {error}</div>
        }

        if (loading || !patientInfo._id) {
            return <CallBack />
        }

        return (
        
            <Card className={classes.root}>

                <Typography variant="h6" inline>{startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}</Typography>
                <BtnCloseIcon handleBtnClick={this.handleClose} />

                <br />
                
                <Grid container spacing={24}>
                    {getInfoH(patientInfo).map((info, idx) => {
                        return <Grid item xs={2} key={idx}>
                            <Typography variant="caption">{info.caption}</Typography>
                            <Typography variant="subtitle1" className={classes.fwMedium}>{info.info}</Typography>
                        </Grid>
                    }) }
                </Grid>

                <br />

                <Grid container spacing={24}>
                    {getInfoV(patientInfo).map((iArray, index) => {
                        return  <Grid item xs={index%2 ? 4 : 2} key={index}>
                            {iArray.map((i, idx) => {
                                return (
                                    <Typography variant="subtitle1" key={idx} className={index%2 ? classes.fwMedium : null}>{i}</Typography>
                                )
                            } )}
                        </Grid> 
                           
                    }) }    
                </Grid>

                <br /> <hr className={classes.hrStyled}/> <br />   
                <BtnGroup btns={btns} _id={patientInfo._id} handleActionBtns={this.props.handleActionBtn} />
                <br />

            </Card>
        );
    }
}


const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading,
        user: state.user
    }
};

PatientFindDetails = connect(mapStateToProps)(PatientFindDetails)
PatientFindDetails = withStyles(styles)(PatientFindDetails)
export default PatientFindDetails;
