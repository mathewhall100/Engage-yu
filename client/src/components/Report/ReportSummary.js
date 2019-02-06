import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import Callback from '../Callback';
import ReportTable from '../Tables/ReportTable';
import ReportBarGraph from '../Graphs/ReportBarGraph';
import { fetchReportPatientData } from '../../actions/index';
import { displayDataCalc, displayGraphCalc} from '../../logic/reportFunctions';
import ReportSurveyDetails from './ReportSurveyDetails';


const styles = theme => ({
    root: {
        width: "100%",
        marginTop: theme.spacing.unit*2,
        marginBottom: "20px",
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
        //console.log(this.props.patientId,  " :A: ", this.props.episodeId)
        if (this.props.patientData && this.props.patientData.episodes) {
            this.setState({episodes: this.props.patientData.episodes}, 
                () => this.loadDataForDisplay(this.getEpisode(this.state.episodes, this.props.episodeId)) )
        }
     }

    state = {
        episode: [],
        episodes: [],
        noEpisodes: false,
        displayQuestion: 0,
        episodeDataForDisplay: [],
    };

    getEpisode = (episodes, episodeId) => {
        if (episodeId !== "0") {return episodes.filter(e => e._id === episodeId)[0]  
        } else {
            let ep = [];
            let status = ["awaiting review", "active", "actioned", "pending"]
            for (let i=0; i<status.length; i++) {
                ep = episodes.filter(e => e.status === status[i])
                if (ep.length > 0) {return ep[0]}
            }
        }
        return null
    }

    loadDataForDisplay = (episode) => {
        console.log("load data: ", episode)
        if (episode) {
            this.setState({
                episode,             
                questions: episode.questions,
                episodeDataForDisplay: displayDataCalc(
                    episode.records, 
                    episode.num_days, 
                    episode.expected_num_records/episode.num_days, 
                    episode.num_questions, 
                    episode.status
                )
            }) 
        } else { this.setState({noEpisodes: true}) }
    }

    // Event handlers
    handleFilterQuestions = (question) => {
        console.log("question: ", question)
        this.setState({displayQuestion: question})
    }

    handleFullReportClick = () => {
        console.log("episode: ", this.state.episode)
        this.props.handleFullReport(this.state.episode, this.state.questions, this.state.episodeDataForDisplay)
      }


    render () {
        const { classes } = this.props;
        const { episode, questions, episodeDataForDisplay, displayQuestion } = this.state;

        const RenderQuestionBar = () => {
            return (
                
                questions &&
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
        }

        const RenderBtn = (props) => 
            <Button variant="outlined" className={classes.reportBtn} onClick={() => this.handleFullReportClick()} >
                full report
            </Button>

        const RenderPendingMsg = (props) => 
            <div className={classes.graphContainer}>
                This Diary card has not yet been started by the patient.
            </div> 

        return (  
            <Paper className={classes.root}>
                {episodeDataForDisplay && questions && episode ? 

                    <React.Fragment>
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


                                {episode.status === "pending" ? <RenderPendingMsg />
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
                    </React.Fragment>
                    : 
                    <Callback />
                }
             </Paper> 
        );
    }
}


ReportSummary.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
return bindActionCreators({ fetchReportPatientData }, dispatch);
};

const mapStateToProps = (state) => {
// console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        patientData: state.reportPatientData.reportPatientData,
        user: state.user
    }
};

ReportSummary = connect(mapStateToProps, mapDispatchToProps)(ReportSummary)
ReportSummary = withStyles(styles, { withTheme: true })(ReportSummary)
export default ReportSummary