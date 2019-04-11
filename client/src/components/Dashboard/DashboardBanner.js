import React, { Component, Fragment } from 'react';
// import PropTypes from 'prop-types';
import { withStyles, Card, CardContent, CardMedia, Typography } from '@material-ui/core';
import BtnClose from '../UI/Buttons/btnCloseIcon'
import BtnAction from '../UI/Buttons/btnAction'
import bannerImg from '../../img/dashboardBannnerImageSmall.PNG';

const styles = (theme) => ({
    card: { 
        display: 'flex',
        boxShadow: 'none',
        border: '2px solid #eeeeee',
        position: "relative"
    },    
    cover: {
        height: 200,
        width: 563,
    },
    content: {
        flex: '1, 0, auto',
    },
    bannerText: {
        position: 'relative', left: -200,
        padding: 10,
        color: theme.palette.grey[700],
    },
    bannerButton: {
        position: "absolute", bottom: 10, right: 12,
    },
    closeBtnPosn: {
        position: "absolute", top: 2, right: 12,
    }
});

class DashboardBanner extends Component {  

    closeBanner = () => {
        this.props.toggleBanner()
    }

    render () {
        const { classes } = this.props

        return (
            <Fragment>
                <Card className={classes.card}>

                    <CardMedia className={classes.cover} image={bannerImg} /> 

                        <CardContent className={classes.content}>
                            <Typography variant="h4" noWrap className={classes.bannerText}>
                                Patient Engagement Solutions
                            </Typography>
                            <Typography variant="h4" noWrap className={classes.bannerText}>
                                for Parkinson Disease
                            </Typography>
                        </CardContent>
                    
                    <div className={classes.closeBtnPosn}>
                        <BtnClose handleBtnClick={this.closeBanner}/>
                    </div>
                    <div className={classes.bannerButton}> 
                        <BtnAction text="Learn More" />
                    </div>

                </Card> 
            </Fragment >
        );
    }
}

export default withStyles(styles)(DashboardBanner)