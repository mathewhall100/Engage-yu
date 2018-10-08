import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';


const styles = theme => ({
    detailsText: {
        marginTop: "15px"
    },
    rightColumn: {
        paddingLeft: "20px"
    },
    bold: {
        fontWeight: "bold"
    },
})

class ReportDiaryCardDetails extends React.Component {

    componentDidMount() {
        this.setState({compliance: this.complianceCalc(this.props.episode)})
    }

    state = {
        compliance: 0
    }

    complianceCalc = (data) => {
       // console.log("completioncalc: ", data)
        let validCount = [];
        validCount = data.records.filter(record => record.valid === true)
        //console.log("validCount: ", validCount)
        return Math.round(validCount.length/data.expected_num_records*100)
    }


    render () {
        const { episode, classes } = this.props
        const { compliance } = this.state

        return (

            <div>

                <div className={classes.bold}>
                    Diary Card Details
                </div>

                {episode && <div>

                    <Typography variant="body2">
                        <div className={classes.detailsText}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Dates: </td>
                                        <td className={classes.rightColumn}>{`${ moment(episode.start_date).format("MMM Do YYYY")} to ${moment(episode.end_date).format("MMM Do YYYY") }`}</td>

                                    </tr>
                                    <tr>
                                        <td>Timeframe: </td>
                                        <td className={classes.rightColumn}> {`${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`} every {episode.interval_mins} minutes</td>
                                    
                                    </tr>
                                    <tr>
                                        <td>Current Status</td> 
                                        <td className={classes.rightColumn}>
                                            {episode.status}
                                            <span style={{ color: compliance > 90 ? "green" : compliance > 75 ? "#ffc200" : "red"}}> &nbsp;&nbsp;({compliance}% compliance)</span>
                                        </td> 
                                        </tr>
                                </tbody>
                            </table>
                        </div>
                    </Typography>
                </div> }
            </div>
        )
    }
}

ReportDiaryCardDetails = withStyles(styles, { withTheme: true })(ReportDiaryCardDetails)
export default ReportDiaryCardDetails
                