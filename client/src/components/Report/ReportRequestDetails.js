import React, { PureComponent } from 'react';
import { startCase } from 'lodash'
import moment from 'moment';
import { Grid, Typography }from '@material-ui/core';

export default class ReportRequestDetails extends PureComponent {

    render () {
        const { episode } = this.props
        return (
            <Grid container spacing={24} style={{paddingTop: "10px"}}>
                <Grid item xs={4}>
                    <Typography variant="body2">Diary card requested by: </Typography>
                    <Typography variant="body2">Report date: </Typography> 
                    <Typography variant="body2">Report to: </Typography> 

                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body2">{startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`) }</Typography>
                    <Typography variant="body2">{moment().format("MMM Do YYYY")}</Typography>
                    <Typography variant="body2">(1)&nbsp;{startCase(`Dr. ${episode.primary_provider_firstname} ${episode.primary_provider_lastname}`) }</Typography>
                    <Typography variant="body2">(2)&nbsp;{startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`) }</Typography>
                    {/* map function for other report tos here */}
            
                </Grid>
            </Grid>
        )
    }
};

