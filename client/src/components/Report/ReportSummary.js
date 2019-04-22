import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Paper, Typography} from '@material-ui/core';
import CallBack from '../UI/callback';
import Btn from '../UI/Buttons/btn'
import ReportPatientDetails from './ReportPatientDetails';
import ReportTable from './ReportTable';
import ReportBarGraph from './ReportBarGraph';
import ReportGraphQuestionBar from './ReportGraphQuestionBar'
import { selectConsoleTitle } from '../../actions/index';
import { displayDataCalc } from './reportLogic';
import ReportSurveyDetails from './ReportSurveyDetails';

const styles = theme => ({
    graphContainer: {
        height: "300px",
        padding: "15px",
        border: "1px solid #dddddd",
    },
    tableContainer: {
        height: "430px",
        margin: "10px 0 10px 0",
        padding: "15px",
        border: "1px solid #dddddd",
        overflow: "auto"
    },    
  });


class ReportSummary extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Summary Report", menuIndex: 2}));
        const { patientData, episodeId } = this.props
        if (!isEmpty(patientData) && episodeId) {this.prepareDataForDisplay(episodeId)} 
        localStorage.removeItem("report_episode")
     };

    componentWillReceiveProps(nextProps) {
        const { patientData, episodeId } = this.props
        if (patientData !== nextProps.patientData || episodeId !== nextProps.episodeId) {
            this.prepareDataForDisplay(nextProps.episodeId)
            this.setState({displayQuestion: 0})
        }
    };


    state = {
        noEpisodes: false,
        noDiaryCard: false, 
        displayQuestion: 0,
        episodeDataForDisplay: [],
    };

    getEpisode = (episodeId) => {
        let episodes = this.props.patientData.episodes;
        if (!episodes.length) {
            this.setState({noEpisodes: true}) 
        } else {
            if (episodeId !== "0") {return episodes.filter(e => e._id === episodeId)[0]
            } else {
                let ep = [];
                let status = ["awaiting review", "active", "actioned", "pending"];
                for (let i=0; i<status.length; i++) {
                    ep = episodes.filter(e => e.status === status[i]);
                    if (ep.length > 0) {return ep[0]}
                }
            }
        }
    };

    prepareDataForDisplay = (episodeId) => {
        const episode = this.getEpisode(episodeId)
        if (episode) {
            this.setState({
                episode,             
                questions: episode.questions,
                episodeDataForDisplay: displayDataCalc(
                    episode.records, 
                    episode.num_days, 
                    episode.records.length/episode.num_days, 
                    episode.questions.length, 
                    episode.status
                )
            }, () => {localStorage.setItem("report_episode", JSON.stringify(this.state.episode)) } )
        } else { 
            this.setState({noDiaryCard: true}) 
            localStorage.setItem("report_episode", JSON.stringify(false))
        }
    };

    // Event handlers
    handleFilterQuestions = (question) => {
        this.setState({displayQuestion: question})
    };

    render () {
        const { classes, patientInfo, patientData, error, loading } = this.props;
        const { episode, questions, episodeDataForDisplay, displayQuestion, noEpisodes, noDiaryCard } = this.state;

        const RenderPendingMsg = () => 
            <div className={classes.graphContainer}>
                This diary card has not yet been started by the patient.
            </div> 

        const RenderNoDiaryCardMsg = () => 
            <div className={classes.graphContainer}>
                We cannot display this diary card at present. Try refreshing the browser or try viewing another diary card.
            </div> 

        const RenderNoDiaryCardsMsg = () => 
            <Typography variant="subtitle1">
                There are no diary cards to display for this patient. 
            </Typography> 

        if (loading) { 
            return <CallBack />
        }

        return (  
            <Fragment>

                { error || (!loading && (!patientInfo || !patientData || !questions)) ? 
                    <CallBack 
                        noSpin={true} 
                        text="Loading..." 
                        fallbackTitle="" 
                        fallbackText="There are no diary cards to display for this patient." 
                    />
                    :
                    <Grid container spacing={24}>
                        <Grid item xs={6}>
                            
                            <ReportSurveyDetails episode={episode} />

                            {noDiaryCard ? 
                                <RenderNoDiaryCardMsg /> 
                                :
                                <Fragment>
                                    {episode.status === "pending" ? 
                                        <RenderPendingMsg />
                                        : 
                                        <div className={classes.graphContainer}>
                                            <ReportGraphQuestionBar  
                                                questions={questions}
                                                displayQuestion={displayQuestion}
                                                clickQuestion={this.handleFilterQuestions}
                                            />
                                            <br /><br />
                                            <ReportBarGraph 
                                                displayData={episodeDataForDisplay}
                                                displayQuestion={displayQuestion}
                                                question={questions[displayQuestion]}
                                                height={230}
                                                responsive="true"
                                            />
                                        </div> 
                                    }
                                </Fragment>
                            }

                        </Grid>
                        <Grid item xs={6}>

                            <div className={classes.tableContainer}>
                                {!noDiaryCard && episode.status !== "pending" ?
                                    <React.Fragment> 
                                        <ReportGraphQuestionBar  
                                            questions={questions}
                                            displayQuestion={displayQuestion}
                                            clickQuestion={this.handleFilterQuestions}
                                        />
                                        <br /><br />
                                        <ReportTable 
                                            displayData={episodeDataForDisplay}
                                            displayQuestion={displayQuestion}
                                            question={questions[displayQuestion]}
                                            numDays={this.state.episode.num_days}
                                        />
                                    </React.Fragment>
                                    : 
                                    null
                                }
                            </div>

                        </Grid>
                    </Grid>
                }
            </Fragment>
        );
    }
}


ReportSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData,
        error: state.patient.error,
        loading: state.patient.loading
    };
};

ReportSummary = withRouter(ReportSummary);
ReportSummary = connect(mapStateToProps)(ReportSummary);
ReportSummary = withStyles(styles, { withTheme: true })(ReportSummary);
export default ReportSummary;