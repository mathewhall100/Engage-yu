import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CancelIcon from '@material-ui/icons/Cancel'
import bannerImg from '../img/dashboardBannnerImageSmall.PNG';

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
        position: "absolute", bottom: 10, right: 10,
        color: theme.palette.common.white,
        backgroundColor: theme.palette.primary.main,
        '&:hover': {
            backgroundColor: theme.palette.primary.dark,
        },
        hover: {},
    },
    closeButton: {
        position: "absolute", top: 8, right: -8,
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#ffffff"
        }
    },
    cancelIconStyles: {
        color: theme.palette.error.main,
        fontSize: "30px",
        '&:hover': {
            color: theme.palette.error.dark,
        }
    }
});

class DashboardBanner extends Component {  

    handleCloseBanner = () => {
        this.props.toggleBanner()
    }

    render () {
        const { classes } = this.props

        return (
            <React.Fragment>
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
                        
                        <Button disableRipple className={classes.closeButton} onClick={() => this.handleCloseBanner()}>
                            <CancelIcon className={classes.cancelIconStyles}/>
                        </Button>
                        <Button className={classes.bannerButton}>Learn More</Button>

                 </Card> 
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(DashboardBanner)