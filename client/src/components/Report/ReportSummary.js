import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles, Button, Grid, Paper, Typography} from '@material-ui/core';
import CallBack from '../UI/callback';
import ReportPatientDetails from './ReportPatientDetails';
import ReportTable from './ReportTable';
import ReportBarGraph from './ReportBarGraph';
import { displayDataCalc } from './reportLogic';
import ReportSurveyDetails from './ReportSurveyDetails';
import { reportData } from '../../actions';

const styles = theme => ({
    root: {
        width: "100%",
        marginBottom: "12px",
        paddingLeft: "20px",
        minHeight: "470px"
    },
    graphContainer: {
        height: "300px",
        padding: "15px",
        border: "1px solid #dddddd",
    },
    tableContainer: {
        height: "430px",
        margin: "10px 20px 10px 0",
        padding: "15px",
        border: "1px solid #dddddd",
        overflow: "auto"
    },    
    reportBtn: {
        float: "right",
        padding: "5px 8px",
        marginTop: "10px",
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
    },
    questionBtnBox: {
        float: "right",
        marginTop: "6px"
    },
    questionBtns: {
        marginLeft: "6px",
        padding: '5px 9px 5px 9px',
        backgroundColor: "#eeeeee",
        border: "1px solid",
        borderColor: theme.palette.primary.main,
        borderRadius: "2px",
        fontWeight: "bold",
        cursor: "pointer",
        '&:hover': {
            backgroundColor: "#cccccc",
        },
        hover: {},
      }
  });


class ReportSummary extends Component {

    componentDidMount() {
        console.log("report summary: episodeId: ", this.props.episodeId);
        if (this.props.patientData && this.props.patientData.episodes && this.props.episodeId) {
            this.prepareDataForDisplay(this.props.episodeId)
        } 
     };

    componentWillReceiveProps(nextProps) {
        if (this.props.patientData !== nextProps.patientData || this.props.episodeId !== nextProps.episodeId) {
            this.prepareDataForDisplay(nextProps.episodeId)
            this.setState({displayQuestion: 0})
        }
    };

    state = {
        noEpisodes: false,
        displayQuestion: 0,
        episodeDataForDisplay: [],
    };

    // getEpisode = (episodes, episodeId) => {
    getEpisode = (episodeId) => {
        let episodes = this.props.patientData.episodes;
        console.log("Report Summary: getEpisode: ", episodes, " : ", episodeId)
        if (episodeId !== "0") {return episodes.filter(e => e._id === episodeId)[0]
        } else {
            let ep = [];
            let status = ["awaiting review", "active", "actioned", "pending"];
            for (let i=0; i<status.length; i++) {
                ep = episodes.filter(e => e.status === status[i]);
                if (ep.length > 0) {return ep[0]}
            }
        }
        return null
    };

    // prepareDataForDisplay = (episode) => {
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
            });
        } else { this.setState({noEpisodes: true}) }
    };

    // Event handlers
    handleFilterQuestions = (question) => {
        this.setState({displayQuestion: question})
    };

    handleFullReportClick = () => {
        this.props.handleFullReport(this.state.episode, this.state.questions, this.state.episodeDataForDisplay)
    };

    render () {
        const { classes, patientInfo, patientData, error, loading } = this.props;
        const { episode, questions, episodeDataForDisplay, displayQuestion } = this.state;

        const RenderQuestionBar = () => {
            return (
                <Typography variant="subtitle2" style={{fontSize: "16px"}}  inline={true}>
                    Question {displayQuestion+1}: {questions[displayQuestion].question}
                    <span className={classes.questionBtnBox}>
                        {questions.map((q, index) => {
                            return (
                                <span 
                                    className={classes.questionBtns}
                                    style={{backgroundColor: index === displayQuestion ? '#cccccc' : null}}
                                    onClick={() => this.handleFilterQuestions(index)}
                                    key={index}
                                    >
                                        {index+1}
                                </span>
                            )
                        })}
                    </span>  
                </Typography>
            )
        };

        const RenderBtn = () => 
            <Button variant="outlined" className={classes.reportBtn} onClick={() => this.handleFullReportClick()} >
                full report
            </Button>

        const RenderPendingMsg = () => 
            <div className={classes.graphContainer}>
                This diary card has not yet been started by the patient.
            </div> 

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !patientInfo || !patientData || !questions) {
            return <CallBack />
        }

        return (  
            <Paper className={classes.root}>

                <ReportPatientDetails />

                <Grid container spacing={24}>
                    <Grid item xs={6}>

                        <Grid container spacing={24}>
                            <Grid item xs={9}>
                                <ReportSurveyDetails episode={episode} />
                            </Grid>
                            <Grid item xs={3}>
                                {episode.status === "pending" || episode.status === "active" ? null : <RenderBtn /> }
                            </Grid>
                        </Grid>


                        {episode.status === "pending" ? 
                            <RenderPendingMsg />
                            : <div className={classes.graphContainer}>
                                <RenderQuestionBar />
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

                    </Grid>
                    <Grid item xs={6}>

                        <div className={classes.tableContainer}>
                            {episode.status !== "pending" ?
                                <React.Fragment> 
                                    <RenderQuestionBar />
                                    <br /><br />
                                    <ReportTable 
                                        displayData={episodeDataForDisplay}
                                        displayQuestion={displayQuestion}
                                        question={questions[displayQuestion]}
                                        numDays={this.state.episode.num_days}
                                    />
                                </React.Fragment>
                                : null
                            }
                        </div>

                    </Grid>

                </Grid>
             </Paper> 
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