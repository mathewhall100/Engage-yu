import React, { PureComponent} from 'react'
import { startCase } from 'lodash';
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { complianceCalc } from '../../logic/reportFunctions';

const styles = () => ({
    root: {
        width: "100%",
        height: "130px",
        marginTop: "10px"
    }, 
})

const getCompliance = (episode) => {
    let color = "";
    const compliance = complianceCalc(episode);
    switch (true) {
        case ( compliance > 89):
            color = "green"
            break;
        case ( compliance > 69):
            color = "#ffc200"
            break;
        default: color = "red";
    }
    return (
        <span style={{color: color}}>
            &nbsp;&nbsp;({compliance}% compliance)
        </span>
    )
}


class ReportSurveyDetails extends PureComponent {

    render() {
        const { classes, episode } = this.props

        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={4}>
                        <Typography variant="body2">Dates:</Typography>
                        <Typography variant="body2">Timeframe:</Typography>
                        <Typography variant="body2">Status:</Typography>
                        <Typography variant="body2">Requested by:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography variant="body2">{`${ moment(episode.start_date).format("MMM Do YYYY")} - ${moment(episode.end_date).format("MMM Do YYYY") }`}</Typography> 
                        <Typography variant="body2">{`${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`}</Typography>

                        { episode.status === "active" && 
                            <Typography variant="body2">
                                Currently active 
                                {getCompliance(episode)}
                            </Typography> 
                        }

                        { episode.status === "pending" && 
                            <Typography variant="body2" color="error">
                                    Pending - awaiting first data.
                            </Typography> 
                        }

                        { episode.status !== "pending" && episode.status !== "active" && 
                            <Typography variant="body2">
                                {startCase(episode.status)}
                                {getCompliance(episode)}
                            </Typography> 
                        }

                        <Typography variant="body2">
                            Dr. {episode.requesting_provider_firstname} {episode.requesting_provider_lastname}
                        </Typography>

                    </Grid>
                    </Grid> 
            </div> 
        )
    };

};

ReportSurveyDetails.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(ReportSurveyDetails);