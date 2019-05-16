import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles, Button } from "@material-ui/core"
import { authenticationExpired } from '../../services/AuthService';
//import patient_dataAPI from '../../utils/patient_data'
import authAPI from '../../utils/auth'


const styles = (theme) => ({
    root: {
        margin: "0 24px 0 0", 
        borderTop: "2px solid", 
        borderColor: theme.palette.primary.dark,
        [theme.breakpoints.down('md')]: {
            marginLeft: "24px"
        }
    },
})

class Footer extends Component {

    // test = () => {
    //     console.log("test clicked")

    //     let patient_dataId = "5ca62fc08961572d7cf0f26d";
    //     let episodeId = "5ca62fdc8961572d7cf0f26f";
    //     let newRecord={
    //         "valid" : true,
    //         "late" : false,
    //         "data" : [],
    //         "record_number" : 100,
    //         "day" : 0,
    //         "time" : "1500",
    //         "scheduled_datetime" : "2019-04-05T15:00:00.051-04:00"
    //     }
    //     let recordNumber = 100 // to replace 

    //     patient_dataAPI.updateRecords(patient_dataId, {
    //         episode_id: episodeId,
    //         record_number: recordNumber,
    //         new_record: newRecord
    //     })
    //     .then(res => {
    //         console.log(res.data)
    //     })
    //     .catch(err => {
    //         console.log(err)
    //     })
    // }

    test = () => {
        const userId = "auth0|5cd24f76b9443a1085a4eac3"
        const updObj = {
            email: "henry@martins.com"
        }
        authAPI.update({userId, updObj})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err)
            console.log(err.response)
        })
    }


    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}> 
                <br />
                <Typography variant="subtitle1" align="center" color="primary"><span style={{fontSize: "20px"}}>&copy;</span> Engage-Yu 2019</Typography>
                <br />
                <Button onClick={() => {this.test()}} >test</Button>
            </div>
        )
    }
}
Footer = withStyles(styles, { withTheme: true })(Footer);
export default Footer

