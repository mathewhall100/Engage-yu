import React, { Component, Fragment } from 'react';
import { withRouter} from 'react-router-dom';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash'
import { selectConsoleTitle } from '../../actions/index';
import Typography from '@material-ui/core/Typography'
import CallBack from '../UI/callback'
import ReportFull from './ReportFull';
import ReportSummary from './ReportSummary';
import ReportListSurveys from './ReportListSurveys';

class Report extends Component {  

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Summary Report", menuIndex: 2}));
        const { match: { params } } = this.props
        this.setState({episodeId: params.Id})
    }
        
    state = {
        episode: {},
        episodeId: "",
        openFull: false
    }

    handleChangeEpisode = (id) => {
        console.log("Report: handleChangeEpisode: ", id)
        this.setState({episodeId: id})
    }

    handleOpenFull = (episode, questions, episodeDataForReport) => {
        this.props.dispatch(selectConsoleTitle({title: "Full Report"}));
        this.setState({
            episode,
            questions,
            episodeDataForReport
            },  () => this.setState({openFull: true}) 
        )
    }

    handleCloseFull = (id) => {
        this.props.dispatch(selectConsoleTitle({title: "Summary Report"}));
        this.setState({episodeId: id}, () =>
            {this.setState({openFull: false}) }
        )
    }

    render () {
        const { patientInfo, patientData, error, loading } = this.props
        const { openFull, episodeId, episode, questions, episodeDataForReport } = this.state

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !patientInfo || !patientData) {
            return <CallBack />
        }

        if (openFull) {
            return <ReportFull 
                episode={episode} 
                questions={questions}
                episodeDataForReport={episodeDataForReport}
                handleClose={this.handleCloseFull}
            />
        }

        return (
            <Fragment>
                <ReportSummary  episodeId={episodeId} handleFullReport={this.handleOpenFull} /> <br /> 
                <ReportListSurveys changeEpisode={this.handleChangeEpisode} /> 
            </Fragment> 
        );
    }
}


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading,
        user: state.user
    }
};

Report= connect(mapStateToProps)(Report)
Report = withRouter(Report)
export default Report;
