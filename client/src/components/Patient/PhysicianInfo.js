import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchProviderInfo } from '../../actions/PatientAction';
import classnames from 'classnames';
import ExploreIcon from '@material-ui/icons/Explore';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIcon from '@material-ui/icons/Phone';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
    card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class PhysicianInfo extends Component {  
    componentDidMount(){
        this.props.fetchProviderInfo();
    }
    handleExpandClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    state = { expanded: false };

    render () {
        const { classes } = this.props;
        const { physicianInfo } = this.props.patientData

        console.log("physician info props : ", physicianInfo);
        return (
                <div>
                    My Provider Details
                    

                    <Card className={classes.card}>
                        <CardHeader
                        avatar={
                            <Avatar aria-label="Recipe" className={classes.avatar}>
                                {physicianInfo && physicianInfo.firstname && physicianInfo.lastname ? physicianInfo.firstname.substring(0 , 1) + physicianInfo.lastname.substring(0, 1) : null} 
                            </Avatar>
                        }
                        action={
                            <IconButton>
                            <MoreVertIcon />
                            </IconButton>
                        }
                        title={physicianInfo && physicianInfo.firstname && physicianInfo.lastname ? physicianInfo.firstname + " " + physicianInfo.lastname : null} 
                        subheader={physicianInfo && physicianInfo.role ? physicianInfo.role : null }
                        />
                        <CardContent>
                        <Typography component="p">
                            <List component='nav'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <EmailIcon />
                                    </ListItemIcon>
                                    <ListItemText primary= {physicianInfo && physicianInfo.email ? physicianInfo.email : null } />
                                </ListItem>
                            </List>
                            <Divider />
                            <List component='p'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <ExploreIcon />
                                    </ListItemIcon>
                                    <ListItemText primary= {physicianInfo && 
                                                            physicianInfo.office && 
                                                            physicianInfo.office.address1 
                                                            ?  physicianInfo.office.address1 : null } 
                                                secondary= {
                                                    physicianInfo && 
                                                    physicianInfo.office 
                                                    ? physicianInfo.office.address2  + " " + physicianInfo.office.state + " " + physicianInfo.office.zip : null 

                                                }
                                    />
                                </ListItem>
                            </List>
                            <Divider />
                            <List component='p'>
                                <ListItem button>
                                    <ListItemIcon>
                                        <PhoneIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={physicianInfo &&
                                                           physicianInfo.phone &&
                                                           physicianInfo.phone[0].phone1 ?
                                                            physicianInfo.phone[0].phone1.number : null} 
                                                secondary={physicianInfo &&
                                                            physicianInfo.phone && 
                                                            physicianInfo.phone[0].phone1.phone ?
                                                            physicianInfo.phone[0].phone1.phone: null} />
                                </ListItem>
                            </List>
                        </Typography>
                        </CardContent>
                    </Card>
                </div >
        );
    }
}

PhysicianInfo.propTypes = {
    classes : PropTypes.object.isRequired,
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({fetchProviderInfo}, dispatch);
}
function mapStatToProps(state){
    return (state);
}

export default connect(mapStatToProps, mapDispatchToProps) (PhysicianInfo)
