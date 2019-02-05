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

        console.log("localstorage: ", localStorage.getItem("patient_id"))
        console.log("match.params", this.props.match.params)
        this.setState({episodeId: this.props.match.params.id}, () => console.log("epId: ", this.state.episodeId))
        this.props.fetchReportPatientData(localStorage.getItem("patient_id")) 
    };

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


        const { episodeId } = this.state
        return (
            <React.Fragment>

                {!this.state.displayPrepareReport && 
                    <React.Fragment>
                        <ReportPatientDetails /> <br />   
                        <ReportDisplayData  episodeId={episodeId} handleReportPrep={this.handleReportPrep} /> <br />
                        <ReportListSurveys changeEpisode={this.handleChangeEpisode} />
                    </React.Fragment> 
                }

                {this.state.displayPrepareReport && 
                    <ReportPrepare episodeId={this.state.episodeId} handleClickBack={this.handleReportPrep} /> 
                }

            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchReportPatientData }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
    }
};

Report = connect(mapStateToProps, mapDispatchToProps)(Report)
Report = withRouter(Report)
export default Report;
