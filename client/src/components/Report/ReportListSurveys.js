import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { startCase } from 'lodash'
import moment from 'moment';
import Button from '@material-ui/core/Button'
import ReportPanel from './ReportPanel';
import ProviderName from '../UI/providerName'
import ReportStatusUpdateDialog from './ReportStatusUpdateDialog'

const panels = [
    {status: "pending", actions: ["view", "cancel"]},
    {status: "active", actions: ["view", "cancel"]},
    {status: "awaiting review", actions: ["view", "action"]},
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
        this.setState({dialogOpen: false})
    };

    state = {
        episodes: [],
        episode: {},
        panelStatus: [],
        morePanels: false,
        dialogOpen: false
    };

    displayPanels = (episodes) => {
        this.setState({panelStatus : panels.map(p => episodes.filter(episode => episode.status === p.status).length)})
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
                "requested by": episode.requesting_provider ? this.getProvider(episode.requesting_provider) : "n/a", // change to fuction so can be sorted
                "actioned by": episode.actioned && episode.actioned.actioned_by ? this.getProvider(episode.actioned.actioned_by) : "n/a", 
                "archived by": episode.archived && episode.archived.archived_by ? this.getProvider(episode.archived.archived_by) : "n/a", 
                "cancelled by": episode.cancelled && episode.cancelled.cancelled_by ? this.getProvider(episode.cancelled.cancelled_by) : "n/a", 
                "messages": episode.messages
            }
        })
    };

    getProvider = (provider) => {
        return <ProviderName 
                    title={provider.title} 
                    firstname={provider.firstname} 
                    lastname={provider.lastname} 
                />
    }

    handleAction = (btn, row) => {
        switch (btn) {
            case "view":
                this.props.changeEpisode(row._id)
                break;
            case "cancel":
                this.setState({newStatus: "cancelled"})
                break;
            case "action":
                this.setState({newStatus: "actioned"})
                break;
            case "archive":
                this.setState({newStatus: "archived"})
                break;
            default: return null;
        }
        if (btn !== "view") {
            this.setState({episode: row})
            this.setState({dialogOpen: false},
                () => this.setState({dialogOpen: true})
            )
        }
    };

    handleDialogClose = () => {
        this.setState({dialogOpen: false})
    }

    render () {
        const { episodes, panelStatus, morePanels, dialogOpen } = this.state
        const { patientInfo, patientData, currentEpisode } = this.props

        return (
            <Fragment>

                {panelStatus.slice(0,4).map((panel, idx) => {
                    return (
                        <ReportPanel key={idx}
                            activeEpisode={currentEpisode}
                            summary = { `${startCase(panels[idx].status)} (${panel})` }
                            patient = {`${patientInfo.firstname} ${patientInfo.lastname}` }
                            tableHeadings = {["start", "end", "timeframe", "interval", "questions", "requested by"].concat(idx===3 ? ["actioned by"] : [])}
                            tableData = {this.createTableData(episodes.filter(episode => episode.status === panels[idx].status )) }
                            lastCellHeading={"Actions"}
                            lastCellData = {panels[idx].actions}
                            handleActionBtn = {this.handleAction}
                        />
                    )
                }) }

                <br />

                {(panelStatus[4] > 0 || panelStatus[5] > 0)  && 
                    <Button onClick={() => this.setState({morePanels: !this.state.morePanels}) }>
                        {morePanels ? "Hide..." : "Show more..." }
                    </Button>} 

                <br /><br />
                
                {morePanels === true && 
                    <Fragment>
                        
                        <ReportPanel
                            activeEpisode={currentEpisode}
                            summary = { `Archived (${panelStatus[4]})` }
                            tableHeadings = {["start", "end", "timeframe", "interval", "questions", "requested by", "actioned by", "archived by"]}
                            tableData = {this.createTableData(episodes.filter(episode => episode.status === "archived"))}
                            lastCellHeading="Actions"
                            lastCellData = {panels[4].actions}
                            handleActionBtn = {this.handleAction}
                        /> 
                    
                        <ReportPanel
                            activeEpisode={currentEpisode}
                            summary = { `Cancelled (${panelStatus[5]})` }
                            tableHeadings = {["start", "end", "timeframe", "interval", "questions", "requested by", "cancelled by"]}
                            tableData = {this.createTableData(episodes.filter(episode => episode.status === "cancelled"))}
                            lastCellHeading="Actions"
                            lastCellData = {panels[5].actions}
                            handleActionBtn = {this.handleAction}
                        />

                    </Fragment>
                }

                {dialogOpen && 
                    <ReportStatusUpdateDialog 
                        patientId={patientInfo._id} 
                        patientDataId={patientData._id} 
                        episode={this.state.episode} 
                        newStatus={this.state.newStatus}
                        handleDialogClose={this.handleDialogClose}
                    /> 
                }
                
            </Fragment>
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