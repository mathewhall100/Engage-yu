import React, { Component } from 'react';
import moment from 'moment';
import connect from 'react-redux';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import WarningIcon from '@material-ui/icons/Warning';
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { withStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import {Link } from 'react-router-dom';
import _ from 'lodash';
import { Dialog } from '@material-ui/core';


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
    hyperLink : {
        textDecoration : 'none',
    }
});

class HistorySurvey extends Component {
    state = {
        open : false,
    }
    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };
    renderAllEpisodesRow = (episodes, classes) =>{
        console.log("Rendering all episodes ", episodes)
        
        return(
            episodes.map((epi, index) => {

                let newObj = _.mapKeys(epi.record, 'record_number');
                let closestTime = Infinity, closest;
                let beforeMoment= []; 
                console.log(newObj);
                newObj = _.filter(newObj, (o) => {
                    return (o.valid === false && moment(o.scheduled_datetime, "YYYY-MM-DDTHH:mm").isSame(moment(), 'd') && moment(o.scheduled_datetime, "YYYY-MM-DDTHH:mm").isBefore(moment()));
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
                    <React.Fragment>

                        <Link key={epi.episode_number} to={`/patient/history/${epi.episode_number}`} className={classes.hyperLink}><Button variant='outlined' className={classes.button}>Episode {epi.episode_number}</Button></Link>
                        <br/>
                        {epi.record.map( item => {
                            /* */
                            return (
                                [<Link key={epi.record_number} className={classes.hyperLink} to={`/patient/history/${epi.episode_number}/${item.record_number}`}>
                                    
                                    {item.valid === false ? 
                                        [beforeMoment.includes(item.scheduled_datetime) ?
                                            <Button variant='outlined' color='secondary' className={classes.button}>
                                                <Icon aria-label="Edit" >
                                                    <EditIcon />
                                                </Icon>
                                                Record {item.record_number}
                                            </Button>
                                            : 
                                        <Button variant='outlined' className={classes.button}>
                                            <Icon aria-label="Warning">
                                                <WarningIcon />
                                            </Icon>
                                            Record {item.record_number}
                                        </Button>
                                        ]
                                    : 
                                        <Button variant='outlined' color='primary' className={classes.button}>
                                            <Icon aria-label="Check" >
                                                <CheckIcon />
                                            </Icon>
                                            Record {item.record_number}
                                        </Button>
                                }
                                        
                                    
                                </Link>]
                                
                            )
                        })
                        }
                    </React.Fragment>
                    )
                    
        })
        )
        
    }
    render() {
        const { classes } = this.props;
        const actions = [
            <Button
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <Button
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onClick={this.handleClose}
            />,
        ];
        console.log("history survey props : ", this.props);
        return(
            <div>
                <h1>Survey History</h1>
                <div>
                    {this.props.patientData && this.props.patientData.episodes ? this.renderAllEpisodesRow(this.props.patientData.episodes, classes) : null}
                </div>
                <div>
                    <Dialog
                        title='Edit this entry?'
                        actions={actions}
                        modal={false}
                        open={this.state.open}

                    >
                        Edit this entry?
                    </Dialog>
                </div>
                
            </div>
        );
    }
}
HistorySurvey.propTypes = {
    classes : PropTypes.object.isRequired,
};

export default withStyles(styles)(HistorySurvey);