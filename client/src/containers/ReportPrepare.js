import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { times, startCase } from 'lodash';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit*2,
      marginBottom: "20px",
      paddingLeft: "20px"
    },
})


class ReportPrepare extends Component {

    componentDidMount() {
        const episodeId = this.props.match.params.id;
        let episodeArray = [];
        let episode = [];
        let records = [];

        if (this.props.patientData) {
            episodeArray = this.props.patientData.episodes.filter(e => e._id === episodeId) 
            episode = episodeArray[0]
            records = episode.records

            this.setState({ 
                episode: episode,
                records: records
            })
        } 
    }

    state = {
        episode: []
    }

    render () {

        const { episode, records } = this.state
        const { classes } = this.props
    
        return (

            <div>

                {episode && records ? null : <div>
                        Loading ... 
                </div> }

                {episode &&  records && <Paper className={classes.root}>

                    <Grid container spacing={24}>

                        <Grid item xs={6}> {this.props.patientInfo.firstname}
                        </Grid>
                            
                        <Grid item xs={6}> {episode.requesting_provider_firstname}
                        </Grid>

                        <Grid item xs={6}> {records.map((r, index) => {
                            return (
                                <div>
                                    {r.time}
                                </div>
                            )

                         }) }
                       
                        </Grid>
                            
                        <Grid item xs={6}> 4
                        </Grid>

                    </Grid>

                    <div className={classes.linksContainer}>
                        <Tooltip title ="Email report to provider and/or patient" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks}  onClick = {event => this.handleClickEmail(event)}>email</span>
                        </Tooltip>
                        <Tooltip title ="Send report to patients electronic health record" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} onClick = {event => this.handleClickEHR(event)}>Send to EHR</span>
                        </Tooltip>
                        <Tooltip title ="Close page" classes={{tooltip: classes.customWidth}} enterDelay={300}>
                                <span className={classes.navLinks} onClick = {event => this.handleClickBack(event)}>Close</span>
                        </Tooltip>
                    </div>

                </Paper> }
            </div>
        ); 
    }

           
}


// ReportPrepare.propTypes = {
//     classes: PropTypes.object.isRequired,
//   };
  
  const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,

        user: state.user
    }
  };
  ReportPrepare = connect(mapStateToProps)(ReportPrepare)
  ReportPrepare = withRouter(ReportPrepare)
  ReportPrepare = withStyles(styles, { withTheme: true })(ReportPrepare)
  export default ReportPrepare