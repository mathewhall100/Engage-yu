import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DiaryIcon from '@material-ui/icons/ListAlt';
import ReportIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import ContactIcon from '@material-ui/icons/ContactMail';
import HandleBtns from '../components/Buttons/handleBtns'

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
    }
})

class FindPatientDetails extends PureComponent {  

    findNumSurveys = (filter) => {
        if (this.props.patientData.length !== 0) {
            return this.props.patientData.episodes.filter(episode => episode.status === filter).length
        } else return null
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
            {caption: "", info: ""},
            {caption: "", info: ""}
        ];
        const infoV = [
             ["Email", "Contact phone", "Primary provider", "Care group"],
             [patientInfo.email, patientInfo.phone, startCase(`Dr. ${patientInfo.primary_provider_firstname} ${patientInfo.primary_provider_lastname}`), startCase(`${patientInfo.provider_group_name}`)],
             ["Active diary cards", "Pending diary cards", "Awaiting review", "Actioned"],
             [this.findNumSurveys("active"), this.findNumSurveys("pending"),this.findNumSurveys("awaiting review"), this.findNumSurveys("actioned")]
        ];
        const btns = [
            {btn: "contact", icon: <ContactIcon className={classes.handleBtnIcon} />},
            {btn: "edit", icon: <EditIcon className={classes.handleBtnIcon} />},
            {btn: "reports", icon: <ReportIcon className={classes.handleBtnIcon} />},
            {btn: "new diary card", icon: <DiaryIcon className={classes.handleBtnIcon} />}
        ];

        return (
        
            <Card className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h6" inline>{startCase(patientInfo.firstname)} {startCase(patientInfo.lastname)}</Typography>
                        <Typography align="right" inline>
                            <HandleBtns 
                                btns={[{btn: "close"}]} 
                                _id={patientInfo._id}
                                handleActionBtns={this.handleActionBtns}
                                />
                        </Typography>
                    </Grid>
                </Grid>

                <br />
                
                <Grid container spacing={24}>
                    {infoH.map((info, idx) => {
                        return (
                            <Grid item xs={2} key={idx}>
                                <Typography variant="caption">{info.caption}</Typography>
                                <Typography variant="subtitle1" className={classes.fwMedium}>{info.info}</Typography>
                            </Grid>
                        )
                    }) }
                </Grid>

                <br />

                <Grid container spacing={24}>
                    {infoV.map((iArray, index) => {
                        return (
                            <Grid item xs={index%2 ? 4 : 2} key={index}>
                                {iArray.map((i, idx) => {
                                    return (
                                        <Typography variant="subtitle1" key={idx} className={index%2 ? classes.fwMedium : null}>{i}</Typography>
                                    )
                                } )}
                            </Grid>
                        ) 
                    }) }    
                </Grid>

                <br /> <hr className={classes.hrStyled}/> <br />   
                <HandleBtns 
                    btns={btns} 
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
