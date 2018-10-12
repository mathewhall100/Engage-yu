import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReportPatientDetails from '../containers/ReportPatientDetails';
import ReportDisplayData from '../containers/ReportDisplayData';
import ReportListSurveys from '../containers/ReportListSurveys';

import { selectConsoleTitle, fetchReportPatientData } from '../actions/index';

import ReportPrepare from '../containers/ReportPrepare';

class Report extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Report"});
        const params = this.props.match.params.id;
        this.props.fetchReportPatientData(params.slice(0, params.indexOf("&")))
        this.setState({episodeId: params.slice(params.indexOf("&")+1, params.length)})
    }
    

    state = {
        episodeId: "",
        displayPrepareReport: false
    }

    handleChangeEpisode = (id) => {
        console.log("New episode id: ", id)
        this.setState({episodeId: id})
    }

    handleReportPrep = (id) => {
        console.log("handleReportprep:", id)
        this.setState({episodeId: id})
        this.setState({displayPrepareReport: this.state.displayPrepareReport ? false : true})
    }

    render () {
        
        return (
            <div>
                {!this.state.displayPrepareReport && <div>
                    <ReportPatientDetails />
                    <br />     
                    <ReportDisplayData 
                        episodeId={this.state.episodeId} 
                        handleReportPrep={this.handleReportPrep} 
                    />
                    <br />
                    <ReportListSurveys changeEpisode={this.handleChangeEpisode} />
                </div> }

                {this.state.displayPrepareReport && <div>
                    <ReportPrepare episodeId={this.state.episodeId} handleClickBack={this.handleReportPrep} />
                </div> }



            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchReportPatientData }, dispatch);
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

Report = connect(mapStateToProps, mapDispatchToProps)(Report)
Report = withRouter(Report)
export default Report;
