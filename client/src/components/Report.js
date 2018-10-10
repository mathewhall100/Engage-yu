import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReportPatientDetails from '../containers/ReportPatientDetails';
import ReportDisplayData from '../containers/ReportDisplayData';
import ReportListSurveys from '../containers/ReportListSurveys';

import { selectConsoleTitle } from '../actions/index';
import { fetchPatientData } from '../actions/index';


class Report extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Report"});

        //const param = this.props.match.params.id
        // const patientId = param.slice(0, param.indexOf("&"))
        // this.props.fetchPatientData(patientId);

        // const episodeId = param.slice(param.indexOf("&")+1, param.length)
        // console.log("param ", param, " then ", episodeId)

        // this.setState({ episodeId: episodeId })

        this.setState({episodeId: this.props.match.params.id})
    }

    state = {
        episode: "",
    }

    handleChangeEpisode = (id) => {
        console.log("New episode id: ", id)
        this.setState({episodeId: id})
    }

    render () {
        
        return (
            <div>
                <ReportPatientDetails />
                <br />     
                <ReportDisplayData episodeId={this.state.episodeId} />
                <br />
                <ReportListSurveys changeEpisode={this.handleChangeEpisode} />
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchPatientData}, dispatch);
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

Report = connect(mapStateToProps, mapDispatchToProps) (Report)
Report = withRouter(Report)
export default Report;
