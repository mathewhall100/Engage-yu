import React, { PureComponent, Fragment } from 'react';
import { isEmpty } from 'lodash'
import moment from 'moment';
import { Grid, Typography }from '@material-ui/core';
import ProviderName from '../UI/providerName'

export default class ReportRequestDetails extends PureComponent {

    render () {
        const { episode: { requesting_provider, report_to }  } = this.props

        return (
            <Grid container spacing={24} style={{paddingTop: "10px"}}>
                <Grid item xs={4}>
                    <Typography variant="body2">Report requested by: </Typography>
                    <Typography variant="body2">Report date: </Typography> 
                    <Typography variant="body2">Report to: </Typography> 

                </Grid>
                <Grid item xs={8}>
                    <Typography variant="body2">
                        <ProviderName 
                            title={requesting_provider.title} 
                            firstname={requesting_provider.firstname} 
                            lastname={requesting_provider.lastname} 
                        />
                    </Typography>
                    <Typography variant="body2">
                        {moment().format("MMM Do YYYY")}
                    </Typography>

                    {!isEmpty(report_to) ?
                        <Fragment>
                            {report_to.map((d, index) => {
                                return (
                                    d ? 
                                    <Typography variant="body2" key={index}>
                                        ({index+1})&nbsp;
                                        <ProviderName 
                                            title={d.title} 
                                            firstname={d.firstname} 
                                            lastname={d.lastname} 
                                        /> ({d.email})
                                    </Typography>
                                    : 
                                    null
                                )
                            }) }
                        </Fragment>
                        :
                        <Typography variant="body2">
                            None specified
                        </Typography>
                    }
            
                </Grid>
            </Grid>
        )
    }
};

