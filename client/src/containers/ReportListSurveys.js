import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import moment from 'moment';
import Button from '@material-ui/core/Button'
import ReportPanel from '../components/Panels/ReportPanel';

const status = ["pending", "active", "awaiting review", "actioned", "archived", "cancelled"]
const tableHeadings = ["start", "end", "timeframe", "interval", "questions", "requested by", "reviewed by", "archived by", "cancelled by"]
const panelProps = [
    {status: "pending", slice: -3, actions: ["view", "cancel"]},
    {status: "active", slice: -3, actions: ["view", "cancel"]},
    {status: "awaiting review", slice: -3, actions: ["view"]},
    {status: "actioned", slice: -2, actions: ["view", "archive"]},
]

class ReportListSurveys extends Component {

    state = {
        episodes: [],
        panelStatus: [],
        morePanels: 0
    };

   componentWillReceiveProps(nextProps) {
        if (this.props.patientData !== [nextProps.patientData]) {
            this.setState({episodes: nextProps.patientData.episodes}, () => this.displayPanels(this.state.episodes) )
        }
    };

    displayPanels = (episodes) => {
        let panelStatus = []
        status.map((state, idx) => {
            panelStatus[idx] = episodes.filter(episode => episode.status === state).length
        })
        this.setState({panelStatus: panelStatus})
    }

    createTableData = (data) => {
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
                episode.reviewed_by ? dataItems.push(startCase(`Dr. ${episode.reviewed_by}`)) : null, 
                episode.archived_by ? dataItems.push(startCase(`Dr. ${episode.archived_by}`)) : null, 
                episode.cancelled_by ? dataItems.push(startCase(`Dr. ${episode.cancelled_by}`)) : null,
  
            dataArray.push(dataItems)
        })
        return dataArray
    }

    handleClickMore = () => {
        this.setState({morePanels: this.state.morePanels ? 0 : 1})
    }

    handleActionBtn = (btn, row) => {
        console.log("Action btn clicked: episode id: ", btn, " : ", row)
        switch (btn) {
            case "view":
            this.props.changeEpisode(row[0])
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

        const RenderShowMoreBtn = (props) => 
            <Button onClick={() => this.handleClickMore()} >
                {morePanels ? "Hide..." : "Show more" }
            </Button>
        

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
                                actions = {panelProps[idx].actions}
                                actionBtnAction = {this.handleActionBtn}
                            />
                        :  null 
                    )
                }) }

                <br />
                { (panelStatus[4] + panelStatus[5]) > 0 && <RenderShowMoreBtn /> } 
                <br />
                <br />

                { morePanels === 1 && <React.Fragment>
                    
                    { panelStatus[4] && <ReportPanel
                        summary = { `Archived (${panelStatus[4]})` }
                        tableHeadings = {tableHeadings[0,1,2,3,4,5,7]}
                        tableData = {this.createTableData(episodes.filter(episode => episode.status === "archived"))}
                        lastCellRightAlign={true}
                        lastCellHeading="Actions"
                        actions = {["view"]}
                        actionBtnAction = {this.handleActionBtn}
                    /> }

                    { panelStatus[5] && <ReportPanel
                        summary = { `Cancelled (${panelStatus[5]})` }
                        tableHeadings = {tableHeadings[0,1,2,3,4,5,8]}
                        tableData = {this.createTableData(episodes.filter(episode => episode.status === "cancelled"))}
                        lastCellRightAlign={true}
                        lastCellHeading="Actions"
                        actions = {["view"]}
                        actionBtnAction = {this.handleActionBtn}
                    /> }

                </React.Fragment> }
                
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientData: state.reportPatientData.reportPatientData,
    }
};

ReportListSurveys = connect(mapStateToProps)(ReportListSurveys)
export default ReportListSurveys