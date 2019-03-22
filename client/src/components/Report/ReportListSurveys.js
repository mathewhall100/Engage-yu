import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import moment from 'moment';
import Button from '@material-ui/core/Button'
import ReportPanel from './ReportPanel';

const panels = [
    {status: "pending", actions: ["view", "cancel"]},
    {status: "active", actions: ["view", "cancel"]},
    {status: "awaiting review", actions: ["view"]},
    {status: "actioned", actions: ["view", "archive"]},
    {status: "archived", actions: ["view"]},
    {status: "cancelled", actions: ["view"]},
];


class ReportListSurveys extends Component { 
    
    componentDidMount() {
        if (this.props.patientData && this.props.patientData.episodes) {
            this.setState({episodes: this.props.patientData.episodes}, () => this.displayPanels(this.state.episodes) )
        } 
     };

    componentWillReceiveProps(nextProps) {
        if (this.props.patientData !== nextProps.patientData) {
            this.setState({episodes: nextProps.patientData.episodes}, () => this.displayPanels(this.state.episodes) )
        }
    };

    state = {
        episodes: [],
        panelStatus: [],
        morePanels: false,
    };

    displayPanels = (episodes) => {
        this.setState({panelStatus : panels.map(p => episodes.filter(episode => episode.status === p.status).length)}, () => console.log(this.state.panelStatus))
    }

    createTableData = (data) => {
          return data.map((episode, index) => {
              return {
                "id": index,
                "_id": episode._id,
                "start": moment(episode.start_date).format("MMM Do YYYY"),
                "end": moment(episode.end_date).format("MMM Do YYYY"),
                "timeframe": `${episode.start_time.slice(0,2)}:${episode.start_time.slice(-2)} - ${episode.end_time.slice(0,2)}:${episode.end_time.slice(-2)}`,
                "interval": `${episode.interval_mins} mins`, 
                "questions": episode.questions.length === 1 ? `${episode.questions.length} question` : `${episode.questions.length} questions`,
                "requested by": startCase(`Dr. ${episode.requesting_provider_firstname} ${episode.requesting_provider_lastname}`),
                "reviewed by": "TBA", 
                "archived by": "TBA", 
                "cancelled by": "TBA"
            }
        })
    };

    handleAction = (btn, row) => {
        console.log("Action btn clicked: episode id: ", btn, " : ", row)
        switch (btn) {
            case "view":
                this.props.changeEpisode(row._id)
                break;
            case "cancel":
                break;
            case "archive":
                break;
            default: return null;
        }
    };

    render () {
        const { episodes, panelStatus, morePanels } = this.state

        return (
            <React.Fragment>

                {panelStatus.slice(0,4).map((panel, idx) => {
                    return (
                        <ReportPanel key={idx}
                            summary = { `${startCase(panels[idx].status)} (${panel})` }
                            tableHeadings = {["start", "end", "timeframe", "interval", "questions", "requested by"].concat(idx===3 ? ["archived by"] : [])}
                            tableData = {this.createTableData(episodes.filter(episode => episode.status === panels[idx].status )) }
                            lastCellRightAlign={true}
                            lastCellHeading={"Actions"}
                            lastCellData = {["report actions", panels[idx].actions]}
                            handleActionBtn = {this.handleAction}
                        />
                    )
                }) }

                <br />

                {(panelStatus[4] || panelStatus[5])  && 
                    <Button onClick={() => this.setState({morePanels: !this.state.morePanels}) }>
                        {morePanels ? "Hide..." : "Show more..." }
                    </Button>} 

                <br /><br />
                
                {morePanels === true && 
                    <React.Fragment>
                        
                        <ReportPanel
                            summary = { `Archived (${panelStatus[4]})` }
                            tableHeadings = {["start", "end", "timeframe", "interval", "questions", "requested by", "reviewed by", "archived by"]}
                            tableData = {this.createTableData(episodes.filter(episode => episode.status === "archived"))}
                            lastCellRightAlign={true}
                            lastCellHeading="Actions"
                            lastCellData = {["report actions", panels[4].actions]}
                            handleActionBtn = {this.handleAction}
                        /> 
                    
                        <ReportPanel
                            summary = { `Cancelled (${panelStatus[5]})` }
                            tableHeadings = {["start", "end", "timeframe", "interval", "questions", "requested by", "cancelled by"]}
                            tableData = {this.createTableData(episodes.filter(episode => episode.status === "cancelled"))}
                            lastCellRightAlign={true}
                            lastCellHeading="Actions"
                            lastCellData = {["report actions", panels[5].actions]}
                            handleActionBtn = {this.handleAction}
                        />

                    </React.Fragment>
                }
                
            </React.Fragment>
        );
    }
};


const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading
    }
};

ReportListSurveys = connect(mapStateToProps)(ReportListSurveys)
export default ReportListSurveys;