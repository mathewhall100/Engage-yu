import React, { PureComponent } from 'react';
import { startCase } from 'lodash'
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class ReportRequestDetails extends PureComponent {

    render () {
        const { episode } = this.props
        return (
            <Grid container spacing={24} style={{paddingTop: "10px"}}>
                <Grid item xs={6}>
                    <Typography variant="body2">Diary card requested by: </Typography>
                    <Typography variant="body2">Report to: </Typography> 
                    <Typography variant="body2">Report date: </Typography> 
                    <Typography variant="body2">Report Requested by:  </Typography> 
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body2">{startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`) }</Typography>
                    <Typography variant="body2">{startCase(`Dr. ${episode.primary_provider_name}`) }</Typography>
                    <Typography variant="body2">{moment().format("MMM Do YYYY")}</Typography>
                    <Typography variant="body2">{startCase(`Dr. ${startCase(localStorage.getItem("provider_first_name"))} ${startCase(localStorage.getItem("provider_last_name"))} `)}</Typography>
                </Grid>
            </Grid>
        )
    }
};
