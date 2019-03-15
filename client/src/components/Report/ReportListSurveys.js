import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash'
import moment from 'moment';
import Button from '@material-ui/core/Button'
import ReportPanel from '../Panels/ReportPanel';
import { fetchReportPatientData } from '../../actions/index';


const status = ["pending", "active", "awaiting review", "actioned", "archived", "cancelled"]
const tableHeadings = ["start", "end", "timeframe", "interval", "questions", "requested by", "reviewed by", "reviewed by", "cancelled by", ]
const panelProps = [
    {status: "pending", slice: -3, actions: ["view", "cancel"]},
    {status: "active", slice: -3, actions: ["view", "cancel"]},
    {status: "awaiting review", slice: -3, actions: ["view"]},
    {status: "actioned", slice: -2, actions: ["view", "archive"]},
    {status: "archived", slice: -2, actions: ["view"]},
    {status: "cancelled", slice: -2, actions: ["view"]},
]

class ReportListSurveys extends Component { 
    
    componentDidMount() {
        console.log("ReportListSurveys: CDM")
        if (this.props.patientData && this.props.patientData.episodes) {
            this.setState({episodes: this.props.patientData.episodes}, 
                () => this.displayPanels(this.state.episodes) )
        } 
     };

    componentWillReceiveProps(nextProps) {
        console.log("ReportListSurveys: CWRP-nextprops: ", nextProps)
        if (this.props.patientData !== [nextProps.patientData]) {
            this.setState({episodes: nextProps.patientData.episodes}, 
                () => this.displayPanels(this.state.episodes) )
        }
    };

    state = {
        episodes: [],
        panelStatus: [],
        morePanels: 0,
    };

    displayPanels = (episodes) => {
        let panelStatus = []
        status.map((state, idx) => {
            panelStatus[idx] = episodes.filter(episode => episode.status === state).length
        })
        this.setState({panelStatus: panelStatus})
    }

    createTableData = (data) => {
          let dataArray = [];
          let counter = 0;
      
          data.map(episode => {
              counter += 1;
                let newDataObj = { 
                    "id": counter,
                    "_id": episode._id,
                    "start": moment(episode.start_date).format("MMM Do YYYY"),
                    "end": moment(episode.end_date).format("MMM Do YYYY"),
                    "timeframe": `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                    "interval": `${episode.interval_mins} mins`, 
                    "questions": episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                    "requested by": startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`),
                    "reviewed by": episode.reviewed_by ? newDataObj.push(startCase(`Dr. ${episode.reviewed_by}`)) : null, 
                    "archived by": episode.archived_by ? newDataObj.push(startCase(`Dr. ${episode.archived_by}`)) : null, 
                    "cancelled by": episode.cancelled_by ? newDataObj.push(startCase(`Dr. ${episode.cancelled_by}`)) : null,
                };
            dataArray.push(newDataObj)
        })
        return dataArray
    }

    handleClickMore = () => {
        this.setState({morePanels: this.state.morePanels ? 0 : 1})
    }

    handleAction = (btn, row) => {
        console.log("Action btn clicked: episode id: ", btn, " : ", row)
        switch (btn) {
            case "view":
            this.props.changeEpisode(row._id)
                break
            case "cancel":
                break
            case "archive":
                break
            default: 
                null
        }
    };

    render () {
        const { episodes, panelStatus, morePanels } = this.state

        return (
            <React.Fragment>

                { panelStatus.map((panel, idx) => {
                    return (
                        
                        panel > 0 ?
                            <ReportPanel key={idx}
                                summary = { `${startCase(panelProps[idx].status)} (${panel})` }
                                tableHeadings = {tableHeadings.slice(0, panelProps[idx].slice)}
                                tableData = {this.createTableData(episodes.filter(episode => episode.status === panelProps[idx].status )) }
                                lastCellRightAlign={true}
                                lastCellHeading={"Actions"}
                                lastCellData = {["report actions", panelProps[idx].actions]}
                                handleActionBtn = {this.handleAction}
                            />
                        :  null 
                    )
                }) }

                <br />

                { (panelStatus[4] + panelStatus[5]) > 0 && 
                    <Button onClick={() => this.handleClickMore()} >
                        {morePanels ? "Hide..." : "Show more" }
                    </Button> } 

                <br /><br />
                
                { morePanels === 1 && <React.Fragment>
                    
                    { panelStatus[4] && <ReportPanel
                        summary = { `Archived (${panelStatus[4]})` }
                        tableHeadings = {tableHeadings[0,1,2,3,4,5,6,8]}
                        tableData = {this.createTableData(episodes.filter(episode => episode.status === "archived"))}
                        lastCellRightAlign={true}
                        lastCellHeading="Actions"
                        actions = {["report actions", "view"]}
                        handleActionBtn = {this.handleAction}
                    /> }

                    { panelStatus[5] && <ReportPanel
                        summary = { `Cancelled (${panelStatus[5]})` }
                        tableHeadings = {tableHeadings[0,1,2,3,4,5,6,9]}
                        tableData = {this.createTableData(episodes.filter(episode => episode.status === "cancelled"))}
                        lastCellRightAlign={true}
                        lastCellHeading="Actions"
                        actions = {["report actions", "view"]}
                        handleActionBtn = {this.handleAction}
                    /> }

                </React.Fragment> }
                
            </React.Fragment>
        );
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchReportPatientData }, dispatch);
};

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientData: state.reportPatientData.reportPatientData,
    }
};

ReportListSurveys = connect(mapStateToProps, mapDispatchToProps)(ReportListSurveys)
export default ReportListSurveys;