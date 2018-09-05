import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import bannerImg from '../img/dashboardBannnerImageSmall.PNG';

const styles = ({
    card: { 
        display: 'flex',
        boxShadow: 'none',
        border: '2px solid #eeeeee',
        position: "relative",
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1, 0, auto',
    },
    bannerText: {
        position: 'relative',
        left: -200,
        padding: 10,

    },
    cover: {
        height: 200,
        width: 563,
    },

    bannerButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        color: "#ffffff",
        backgroundColor: "#2d404b",


        '&:hover': {
            backgroundColor: "#28353d",
        },
        hover: {},
    },
});

class DashboardBanner extends Component {  

    render () {

        const { classes } = this.props
        
        const { authenticated } = this.props;
        //console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};

        return (
                <div>
                    <Card className={classes.card}>
                        <CardMedia
                            className={classes.cover}
                            image={bannerImg}
                        />                       
                        <CardContent className={classes.content}>

                            <Typography variant="display1" noWrap className={classes.bannerText}>
                                Patient Engagement Solutions
                            </Typography>

                            <Typography variant="display1" noWrap className={classes.bannerText}>
                                for Parkinson's Disease
                            </Typography>

                        </CardContent>

                        <Typography align="right">
                            <Button color="inherit" className={classes.bannerButton}>Learn More</Button>
                        </Typography>

                    </Card>
                </div >
        );
    }
}


export default withStyles(styles)(DashboardBanner)