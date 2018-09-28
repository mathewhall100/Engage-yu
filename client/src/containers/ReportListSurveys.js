import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startCase } from 'lodash'
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Panel from "../components/Panels/ReportExpansionPanel";



const styles = theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing.unit*2,
      paddingLeft: "20px",
    },
  });

class ReportPendingSurveys extends Component {

    state = {
        episodes: [],
        pending: [],
        active: [],
        review: [],
        actioned: [],
        archived: [],
        cancelled: [],

        morePanels: 0
    };


   async componentWillReceiveProps(nextProps) {
        //console.log("NextProps: ", nextProps)
        await this.setState({episodes: nextProps.patientData.episodes}) 
        //console.log("Episodes: ", this.state.episodes)
        this.setState({pending: this.state.episodes.filter(episode => episode.status === "pending") }) 
        this.setState({active: this.state.episodes.filter(episode => episode.status === "active") }) 
        this.setState({review: this.state.episodes.filter(episode => episode.status === "awaiting review") }) 
        this.setState({actioned: this.state.episodes.filter(episode => episode.status === "actioned") }) 
        this.setState({archived: this.state.episodes.filter(episode => episode.status === "archived") }) 
        this.setState({cancelled: this.state.episodes.filter(episode => episode.status === "cancelled") }) 
    };

    createPendingTableData = (data) => {
        console.log("creatependingData: ", data)

        let dataItems = [];
        let dataArray = [];
    
        data.map(episode => {
            dataItems = [ 
                episode._id,
                moment(episode.start_date).format("MMM Do YYYY"),
                moment(episode.end_date).format("MMM Do YYYY"),
               `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                `${episode.interval_mins} mins`, 
                episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`), 
            ]

           dataArray.push(dataItems)
        })
        //console.log("dataArray: ", dataArray)
        return dataArray
    }

    createActiveTableData = (data) => {
       // console.log("createActiveData: ", data)

        let dataItems = [];
        let dataArray = [];
    
        data.map(episode => {
            dataItems = [ 
                episode._id,
                moment(episode.start_date).format("MMM Do YYYY"),
                moment(episode.end_date).format("MMM Do YYYY"),
               `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                `${episode.interval_mins} mins`, 
                episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`),  
            ]

           dataArray.push(dataItems)
        })
        //console.log("dataArray: ", dataArray)
        return dataArray
    }

    createReviewTableData = (data) => {
        //console.log("createReviewData: ", data)

        let dataItems = [];
        let dataArray = [];
    
        data.map(episode => {
            dataItems = [ 
                episode._id,
                moment(episode.start_date).format("MMM Do YYYY"),
                moment(episode.end_date).format("MMM Do YYYY"),
               `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                `${episode.interval_mins} mins`, 
                episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`), 
            ]

           dataArray.push(dataItems)
        })
        //console.log("dataArray: ", dataArray)
        return dataArray
    }

    createActionedTableData = (data) => {
        //console.log("createActionedData: ", data)

        let dataItems = [];
        let dataArray = [];
    
        data.map(episode => {
            dataItems = [ 
                episode._id,
                moment(episode.start_date).format("MMM Do YYYY"),
                moment(episode.end_date).format("MMM Do YYYY"),
               `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                `${episode.interval_mins} mins`, 
                episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`), 
                startCase(`Dr. ${episode.reviewed_by}`), 
            ]

           dataArray.push(dataItems)
        })
        //console.log("dataArray: ", dataArray)
        return dataArray
    }

    createArchivedTableData = (data) => {
        //console.log("createArchivedData: ", data)

        let dataItems = [];
        let dataArray = [];
    
        data.map(episode => {
            dataItems = [ 
                episode._id,
                moment(episode.start_date).format("MMM Do YYYY"),
                moment(episode.end_date).format("MMM Do YYYY"),
               `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                `${episode.interval_mins} mins`, 
                episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`), 
                startCase(`Dr. ${episode.archived_by}`), 
            ]

           dataArray.push(dataItems)
        })
        //console.log("dataArray: ", dataArray)
        return dataArray
    }

    createCancelledTableData = (data) => {
        //console.log("createCancelledData: ", data)

        let dataItems = [];
        let dataArray = [];
    
        data.map(episode => {
            dataItems = [ 
                episode._id,
                moment(episode.start_date).format("MMM Do YYYY"),
                moment(episode.end_date).format("MMM Do YYYY"),
               `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                `${episode.interval_mins} mins`, 
                episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`),
                startCase(`Dr. ${episode.cancelled_by}`), 
            ]

           dataArray.push(dataItems)
        })
        //console.log("dataArray: ", dataArray)
        return dataArray
    }

    handleClickMore = () => {
        console.log("MorePanels: ", this.state.morePanels)
        this.setState({morePanels: this.state.morePanels ? 0 : 1})
    }
    

    render () {

        const { classes } = this.props;
       
        return (
            <div>

                {this.state.pending.length > 0 &&
                        <Panel
                            title = { `Pending (${this.state.pending.length})` }
                            tableHeadings = {[
                                { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
                                { id: 'end', numeric: false, disablePadding: false, label: 'End' },
                                { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
                                { id: 'interval', numeric: false, disablePadding: false, label: 'Interval' },
                                { id: 'questions', numeric: false, disablePadding: false, label: 'Questions' },
                                { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' },
                                
                            ]}
                            tableData = {this.createPendingTableData(this.state.pending)}

                            actions = {["view", "cancel"]}
                        />
                }

                {this.state.active.length > 0 &&
                        <Panel
                            title = { `Currently active (${this.state.active.length})` }
                            tableHeadings = {[
                                { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
                                { id: 'end', numeric: false, disablePadding: false, label: 'End' },
                                { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
                                { id: 'interval', numeric: false, disablePadding: false, label: 'Interval' },
                                { id: 'questions', numeric: false, disablePadding: false, label: 'Questions' },
                                { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' },   
                             
                            ]}
                            tableData = {this.createActiveTableData(this.state.active)}

                            actions = {["view", "cancel"]}
                        />
                }

                {this.state.review.length > 0 &&
                        <Panel 
                            title = { `Awaiting review (${this.state.review.length})` }
                            tableHeadings = {[
                                { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
                                { id: 'end', numeric: false, disablePadding: false, label: 'End' },
                                { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
                                { id: 'interval', numeric: false, disablePadding: false, label: 'Interval' },
                                { id: 'questions', numeric: false, disablePadding: false, label: 'Questions' },
                                { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' },
                                
                            ]}
                            tableData = {this.createReviewTableData(this.state.review)}

                            actions = {["view"]}
                        />
                }

                {this.state.actioned.length > 0 &&
                        <Panel
                            title = { `Reviewed & actioned (${this.state.actioned.length})` }
                            tableHeadings = {[
                                { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
                                { id: 'end', numeric: false, disablePadding: false, label: 'End' },
                                { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
                                { id: 'interval', numeric: false, disablePadding: false, label: 'Interval' },
                                { id: 'questions', numeric: false, disablePadding: false, label: 'Questions' },
                                { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' },
                                { id: 'reviewer', numeric: false, disablePadding: false, label: 'Reviewed By' },
                                
                            ]}
                            tableData = {this.createActionedTableData(this.state.actioned)}

                            actions = {["view", "archive"]}
                        />
                }

                <br />

                {this.state.morePanels ? <Button onClick={() => this.handleClickMore()}>Hide...</Button> : <Button onClick={() => this.handleClickMore()}>More...</Button>}

                {this.state.morePanels ?  
                
                    <div>

                        {this.state.archived.length > 0 && 
                                <Panel
                                    title = { `Archived (${this.state.archived.length})` }
                                    tableHeadings = {[
                                        { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
                                        { id: 'end', numeric: false, disablePadding: false, label: 'End' },
                                        { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
                                        { id: 'interval', numeric: false, disablePadding: false, label: 'Interval' },
                                        { id: 'questions', numeric: false, disablePadding: false, label: 'Questions' },
                                        { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' },
                                        { id: 'archiver', numeric: false, disablePadding: false, label: 'Archived By' },
                                        
                                    ]}
                                    tableData = {this.createArchivedTableData(this.state.archived)}

                                    actions = {["view"]}
                                />
                        } 

                        {this.state.cancelled.length > 0 && 
                                <Panel
                                    title = { `Cancelled (${this.state.cancelled.length})` }
                                    tableHeadings = {[
                                        { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
                                        { id: 'end', numeric: false, disablePadding: false, label: 'End' },
                                        { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
                                        { id: 'interval', numeric: false, disablePadding: false, label: 'Interval' },
                                        { id: 'questions', numeric: false, disablePadding: false, label: 'Questions' },
                                        { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' },
                                        { id: 'canceller', numeric: false, disablePadding: false, label: 'Cancelled By' },
                                        
                                    ]}
                                    tableData = {this.createCancelledTableData(this.state.cancelled)}

                                    actions = {["view"]}
                                />
                        }

                    </div> : null
                }
            </div>

        );
    }
}


ReportPendingSurveys.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  
  const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
  };
  ReportPendingSurveys = connect(mapStateToProps)(ReportPendingSurveys)
  ReportPendingSurveys = withStyles(styles, { withTheme: true })(ReportPendingSurveys)
  export default ReportPendingSurveys