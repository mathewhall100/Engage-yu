import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import bannerImg from '../img/dashboardBannnerImage.PNG';
import mobileOnly from '../img/mobileOnly.PNG';
import patientMobile from '../img/patientMobile.PNG'
import doctorPatient from '../img/doctorPatient.PNG'
import appleStoreIconImage from '../img/appleStoreIconImage.PNG';
import playStoreIconImage from '../img/playStoreIconImage.PNG';
import { CardHeader } from '@material-ui/core';

import SKHeadShot from '../img/SK.jpg'
import MHHeadShot from '../img/MH.jpg'
import Github from "../img/githubIcon.png";
import LinkedIn from "../img/linkedinIcon.png";

const styles = theme => ({
    layout: {
        width: 'auto',
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(1280 + theme.spacing.unit * 3 * 2)]: {
        maxWidth: 1480,
            marginLeft: theme.spacing.unit * 3,
            marginRight: theme.spacing.unit * 3,
        },
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        paddingTop: "10px",
        paddingBottom: "10px"
      },
    bannerDiv: {
        height: "480px",
        width: "auto",
        backgroundColor: "#eeeeee",
        marginTop: "-2px",
        backgroundImage: `url(${bannerImg})`,
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        borderRadius: "4px"
    },
    bannerTextBox: {
        marginTop: "100px",
        float: "right",
    },
    bannerTitle: {
        fontWeight: "bold",
        fontSize: "96px",
        color: theme.palette.primary.main
    },
    bannerText: {
        fontSize: '45.5px',
        color: "#28353d"
    },
    sectionTitle: {
        padding: "40px",
        fontWeight: "bold",
        textAlign: "center",
        color: "#28353d"
    },
    firstText: {
        lineHeight: "35px",
        textAlign: "center",
        color: "#28353d"
    },
    card: {
        borderColor: "white"
    },
    media: {
    },
    cardHeader: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "32px",
        padding: "20px",
        backgroundColor: "#eeeeee"
    },
    cardHeader2: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "32px",
    },
    cardContentTitle: {
        textAlign: "center"
    },
    cardLearnMoreBtn: {
        backgroundColor: "#dddddd",
    },
    cardContentText: {
        textAlign: "justify"
    },
    cardBtn: {
        textAlign: "center",
        backgroundColor: "black",
        color: "white",
        fontSize: "15px",
        lineHeight: "20px",
        width: "380px",
        height: "60px",
        padding: "10px",
        margin: "20px"

    },
    cardImgBtns: {
        width: "180px",
        height: "60px",
        margin: "20px",
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
        borderRadius: "4px"
    },
    cardImage: {
        width: "300px",
        height: "310px",
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover", 
    },
    aboutUsCenter: {

    },
    headshot: {
        maxWidth: "200px",
        borderRadius: "50%",
        display: "block",
    },
    footer: {
        backgroundColor: "#28353d",
        color: "white",
        marginTop: theme.spacing.unit * 8,
        padding: `${theme.spacing.unit * 6}px 0`,
      },
});


//  
class HomeContent extends Component {



    render () {
        const { classes } = this.props;

        const sections = [
            'Home',
            'Mission',
            'Products',
            'How it works',
            'Benefits',
            'mHealth',
            'About Us',
            'Contact',
          ];

          
          
        return(
            <div className={classes.layout}>

                <Toolbar variant="dense" className={classes.toolbarSecondary}>
                        {sections.map(section => (
                        <Typography component="h3" color="inherit" noWrap key={section}>
                            {section}
                        </Typography>
                    ))}
                </Toolbar>

                <div className={classes.bannerDiv}>

                        <div className={classes.bannerTextBox}>

                            <Typography noWrap className={classes.bannerTitle} >
                                Engage-Yu!
                            </Typography>
                            <hr />
                            <Typography noWrap className={classes.bannerText}>
                                for Parkinson's Disease
                            </Typography> 
                            <hr />

                        </div>
                </div>

                <br />

                <Typography component="h1" className={classes.sectionTitle}>
                    Mission
                </Typography>
                <Typography component="h3" className={classes.firstText}>
                    Parkinson's disease is complex disorder with diverse symptoms which change throughout the day, between days and with timing and dose of each medication. For both patients with Parkinson's disease and their physicians it is a challenge to keep track, gather and respond to all this symptom information sufficiently well to offer the best care. Engage-Yu mission is to provide easy to use but powerful tools to enhance communication between Parkinson's patients and their physicians so that the right information is available at the right times to make the right care decisions. 
                </Typography>
                <br />

                <div> 
                    <br />
                    <hr />
                    <Typography component="h1" className={classes.sectionTitle}>
                        Products
                    </Typography>

                    <Grid container spacing={24}>
                        <Grid item md={4}>

                            <Card className={classes.card}>
                            
                                <div className={classes.cardHeader}>
                                    YU-MOBILE
                                </div>

                                <div style={{padding: "50px"}}>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        image={mobileOnly}
                                        title="Mobile"
                                        />
                                </div>
                                <CardContent>
                                    <Typography variant="subheading" className={classes.cardContentText}>
                                        Set up diary cards to record your symptoms over short or long periods of time then use the information summaries as a concise and handy reminder when you next talk to your physician. Its easy and discreet and helps you give your physician the data they really want to best manage your disease. <Button size="small" className={classes.cardLearnMoreBtn}>Learn more</Button>
                                    </Typography>
                                </CardContent>
                               
                                <CardActions>
                                    <div> 
                                        <br />
                                        <Button style={{backgroundImage: `url(${appleStoreIconImage})`}} className={classes.cardImgBtns}> </Button>
                                        <Button style={{backgroundImage: `url(${playStoreIconImage})`}} className={classes.cardImgBtns}> </Button>
                                    </div>
                                    
                                </CardActions>

                            </Card>
                        
                        </Grid>

                        <Grid item md={4}>

                            <Card className={classes.card}>

                                <div className={classes.cardHeader}>
                                    YU-MOBILE PLUS
                                </div>

                                <div style={{padding: "50px"}}>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        image={mobileOnly}
                                        title="Mobile"
                                        />
                                </div>
                                <CardContent>
                                    <Typography variant="subheading" className={classes.cardContentText}>
                                        Set up diary cards to record your symptoms over short periods of time then send symptom reports directly to your healthcare providers electronic health record (EHR) for review by your physician. Use before clinic appointments or whenever you need to tell your physician about new or changing symptoms. <Button size="small" className={classes.cardLearnMoreBtn}>Learn more</Button>
                                    </Typography>
                                </CardContent>
                            
                                <CardActions>
                                    <div> 
                                        <br />
                                        <Button size="small" className={classes.cardBtn}>Find out whether your provider integrates with the Engage-Yu mobile+ app</Button>
                                    </div>
                                    
                                </CardActions>

                            </Card>

                        </Grid>

                        <Grid item md={4}>

                            <Card className={classes.card}>

                                <div className={classes.cardHeader}>
                                    YU-CMS
                                </div>

                                <div style={{padding: "50px"}}>
                                    <CardMedia
                                        component="img"
                                        className={classes.media}
                                        image={mobileOnly}
                                        title="Mobile"
                                        />
                                </div>
                                <CardContent>
                                    <Typography variant="subheading" className={classes.cardContentText}>
                                       A full content management system for providers and provider institutions to manage remote symptom reporting in their Parkinson's patients. Set customizable symptom diary cards for patients to complete remotely then review results in real time in the office or clinic.  Get the data you want to best manage your patients when and where you need it. <Button size="small" className={classes.cardLearnMoreBtn}>Learn more</Button>
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <div> 
                                        <Button size="small" className={classes.cardBtn}>Contact us for full details and pricing</Button>
                                    </div>
                                    
                                </CardActions>

                            </Card>

                        </Grid>

                        <Grid item md={12}>
                  
                            <Typography component="h1" className={classes.sectionTitle}>
                                Benefits
                            </Typography>
                        </Grid>

                        <Grid  item md={6}>
                        
                            <Card style={{display: "flex", marginTop: "-20px"}}>

                                <div style={{backgroundImage: `url(${patientMobile})`}} className={classes.cardImage}></div>

                                <CardContent style={{width: "66%"}}>
                                    <div className={classes.cardHeader2}>
                                        For Patients
                                    </div>
                                    <Typography variant="title" className={classes.cardContentText}>
                                        <ul>
                                            <li>
                                                <p>Easier communication of complicated symptoms</p>
                                            </li>
                                            <li>
                                                <p>More accurate medication adjustments</p> 
                                            </li>
                                            <li>
                                                <p>Better ongoing disease management</p>
                                            </li>
                                            <li>
                                                <p>Fewer unwanted medication effects</p>
                                            </li>
                                        </ul>
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>

                        <Grid  item md={6}>
                            <Card style={{display: "flex", marginTop: "-20px"}}>

                                <div style={{backgroundImage: `url(${doctorPatient})`}} className={classes.cardImage}></div>

                                <CardContent style={{width: "66%"}}>
                                    <div className={classes.cardHeader2}>
                                        For Providers
                                    </div>
                                    <Typography variant="title" className={classes.cardContentText}>
                                        <ul>
                                            <li>
                                                <p>More accurate, granular symptom data to inform best management</p>
                                            </li>
                                            <li>
                                                <p>Time saved from difficult history taking</p> 
                                            </li>
                                            <li>
                                                <p>Healthier, more engaged patients</p>
                                            </li>
                                            <li>
                                                <p>Potentially reimburseable income</p>
                                            </li>
                                        </ul>
                                    </Typography>
                                </CardContent>

                            </Card>
                        </Grid>

                         <Grid item md={12}>
                            <Typography component="h1" className={classes.sectionTitle}>
                                mHealth
                            </Typography>
                            <Typography component="h3" className={classes.firstText}>
                                Using mobile devices and technologies to provide health services is known as mHealth and is a major new trend in healthcare technology. The benefit of mobile health apps and solutions like engage-yu include improvement in health outcomes, lower error rates and savings in provider time while also reducing overall healthcare costs. With the widespread adoption of smartphones, mobile health apps are easily accessible to almost everyone and their use is increasing rapidly. The mHealth marketplace is predicted to grow from $28 billion in 2018 to over $100 billion by 2023 with more and more patients and providers turning to mHealth soloutions to increase quality and drive down costs.
                            </Typography>
                        </Grid>

                        

                        <Grid item md={12}><hr />
                            <Typography component="h1" className={classes.sectionTitle}>
                                About us
                            </Typography>
                        </Grid>

                        <Grid item md={6}>
                            <div style={{marginTop: "-40px"}}>
                                <h2 style={{textAlign: "center"}}>Dr. Mathew Hall </h2>
                                <img style={{marginLeft: "auto", marginRight: "auto"}} src={MHHeadShot} className={classes.headshot}  alt='Dr. Mathew Hall' />
                                <br/>
                                <div style={{textAlign: "center"}}>
                                    <a href='https://github.com/mathewhall100' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                                    <a href='http://www.linkedin.com/in/mathew-hall-100' target='_blank' rel="noopener noreferrer" ><img  src={LinkedIn} alt="LinkedIn" /></a>
                                </div>
                                <div style={{marginLeft: "auto", marginRight: "auto", maxWidth: "500px", textAlign: "justify"}}>
                                    <p>Full stack web developer with a 20yr background in medicine, biomedical research and medical education</p>
                                    <p>Looking to make a real difference through technology innovation in the medical and biomedical fields.</p>
                                </div> 
                            </div>

                        </Grid>

                        <Grid item md={6}>
                        <div style={{marginTop: "-40px"}}>
                                <h2 style={{textAlign: "center"}}>Shi-Kwan (SK) Tan</h2>
                                <img style={{marginLeft: "auto", marginRight: "auto"}} src={SKHeadShot} className={classes.headshot} alt='Shi-Kwan (SK) Tan' />
                                <br />
                                <div style={{textAlign: "center"}}>
                                    <a href='https://github.com/ShiKwan' target='_blank' rel="noopener noreferrer" ><img src={Github} alt="github" /></a>
                                    <a href='https://www.linkedin.com/in/shi-kwan-tan/' target='_blank' rel="noopener noreferrer" ><img src={LinkedIn} alt="LinkedIn" /></a>
                                </div>
                                <div style={{marginLeft: "auto", marginRight: "auto", maxWidth: "500px", textAlign: "justify"}}> 
                                    <p>Full stack application developer graduated from University of Kentucky with B.S. in Computer Science and M.S. in Natural Resources Economics.</p>
                                    <p>With a goal to develop applications with a great user experience and that bring a positive impact to society.</p>
                                </div>
                            </div>  
                        </Grid>

                    </Grid>

                     <footer className={classes.footer}>
                        <Typography align="center" gutterBottom>
                        Engage-Yu
                        </Typography>
                        <Typography align="center" color="textSecondary" component="p">
                         
                        </Typography>
                    </footer>

                </div>
            </div>
        );
    }
}

HomeContent = withStyles(styles)(HomeContent)
HomeContent = withRouter(HomeContent);
export default HomeContent;
