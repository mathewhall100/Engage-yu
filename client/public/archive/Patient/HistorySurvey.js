import React, { Component } from 'react';
import moment from 'moment';
import { Redirect, withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import _ from 'lodash';
import { Dialog } from '@material-ui/core';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const styles = theme => ({
    historyRoot: {
        width: '100%',
        display: 'inline',
    },
    button: {
        margin: theme.spacing.unit,
        
    },
    historyExpansionCol : {
        display: 'block',
    },
    input: {
        display: 'none',
    },
    hyperLink : {
        textDecoration : 'none',
    },
    panelSummary : {
        display: 'flowRoot',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    column: {
        flexBasis: '50%',
    },
});

class HistorySurvey extends Component {
    state = {
        open : false,
        redirect : false,
        episode : '',
        entry : '',
    }
    handleOpen = (episode, entry) => {
        console.log("in handle open : ")
        this.setState({ 
            open: true ,
            episode,
            entry,
        });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    renderAllEpisodesRow = (episodes, classes) =>{
        console.log("Rendering all episodes ", episodes)
        
        return(
            episodes.map((epi, index) => {

                let newObj = _.mapKeys(epi.records, 'record_number');
                let closestTime = Infinity, closest;
                let beforeMoment= []; 
                console.log(newObj);
                newObj = _.filter(newObj, (o) => {
                    console.log("Scheduled date time : " + moment(o.scheduled_datetime).format("YYYY-MM-DDTHH:mm") + " and now : " + moment(moment().ISO_8601));

                    return (o.valid === false && moment(o.scheduled_datetime, "YYYY-MM-DDTHH:mm").isSame(moment(), 'd') && moment(moment().ISO_8601).add(4, "hour").isAfter(moment(o.scheduled_datetime, "YYYY-MM-DDTHH:mm")));
                });
                console.log("new obj : ", newObj);
                newObj.forEach((d) => {
                    if (moment(d.scheduled_datetime).isBefore(moment()))  {
                        console.log("here", d.scheduled_datetime)
                        beforeMoment.push(d.scheduled_datetime);
                        console.log("before moment :", beforeMoment);
                    }
                })
                console.log("Before moment : ", beforeMoment);
                return(
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <div className={classes.column}>
                                <Typography className={classes.heading}>Episode {epi.episode_number} </Typography>
                            </div>
                            <div className={classes.column}>
                                <Typography className={classes.secondaryHeading}>({moment(epi.start_date).format("MM-DD-YYYY")} to {moment(epi.end_date).format("MM-DD-YYYY")})</Typography>
                            </div>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes.panelSummary}>
                            <Typography className={classes.historyExpansionCol}>
                            {epi.records.map( item => {
                                /* */
                                return (
                                    [<Typography>
                                        {item.valid === false ? 
                                            [beforeMoment.includes(item.scheduled_datetime) ?
                                                <Button variant='outlined' color='secondary' onClick={ () => this.handleOpen(epi.episode_number, item.record_number)} className={classes.button}>
                                                    <Icon aria-label="Edit" >
                                                        <EditIcon />
                                                    </Icon>
                                                    Edit Record {item.record_number} ({moment(item.scheduled_datetime).format("MM-DD-YYYY hh:mma")})
                                                </Button>
                                                : 
                                                <Button variant='outlined' className={classes.button}>
                                                <Icon aria-label="Warning">
                                                    <WarningIcon />
                                                </Icon>
                                                    Record {item.record_number} ({moment(item.scheduled_datetime).format("MM-DD-YYYY hh:mma")})
                                            </Button>
                                            ]
                                        : 
                                            <Button variant='outlined' color='primary' onClick={() => this.handleOpen(item.episode_number, item.record_number)}  className={classes.button}>
                                                <Icon aria-label="Check" >
                                                    <CheckIcon />
                                                </Icon>
                                                Record {item.record_number} ({moment(item.scheduled_datetime).format("MM-DD-YYYY hh:mma")})
                                            </Button>
                                    }
                                    </Typography>]
                                    
                                )
                            })
                            }
                            </Typography>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    )
                    
        })
        )
        
    }
    handleRedirect=(episode, entry)=> {
        this.setState({
            episode,
            entry,
            redirect : true
        }   )
    }

    render() {
        const { classes } = this.props;
        const { redirect, episode, entry } = this.state;
        if (redirect) {
            const url = `/patient/history/${episode}/${entry}`
            return <Redirect to={url} episode={this.state.episode} entry={this.state.entry} />;
        }
        console.log("history survey props : ", this.props);
        return(
            <div>
                <h1>Survey History</h1>
                <div className={classes.historyRoot}>
                    {this.props.patientData && this.props.patientData.episodes ? this.renderAllEpisodesRow(this.props.patientData.episodes, classes) : null}
                </div>
                <div>
                    <Dialog
                        title='Edit late entry?'
                        modal={false}
                        open={this.state.open}
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"Edit late entry?"}</DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                Proceed to edit this entry?  (Episode {this.state.episode? this.state.episode : null } entry {this.state.entry ? this.state.entry : null }) ?     
                            </DialogContentText>
                        </DialogContent>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={() => this.handleRedirect(this.state.episode, this.state.entry)} color="primary" autoFocus>
                            Proceed
                        </Button>   
                    </Dialog>
                </div>
                
            </div>
        );
    }
}
HistorySurvey.propTypes = {
    classes : PropTypes.object.isRequired,
};

HistorySurvey = connect(null)(HistorySurvey)
HistorySurvey = withRouter(HistorySurvey)

export default withStyles(styles)(HistorySurvey); 
