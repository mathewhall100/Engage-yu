import  React  from 'react'
import PropTypes from 'prop-types';
import { withStyles, Typography } from '@material-ui/core'

const styles = theme => ({
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
})

const ReportGraphQuestionBar = (props) => {
    const { classes, questions, displayQuestion, clickQuestion } = props
        return (
            <Typography variant="subtitle2" style={{fontSize: "16px"}}  inline={true}>
                Question {displayQuestion+1}: {questions[displayQuestion].question}
                <span className={classes.questionBtnBox}>
                    {questions.map((q, index) => {
                        return (
                            <span 
                                className={classes.questionBtns}
                                style={{backgroundColor: index === displayQuestion ? '#cccccc' : null}}
                                onClick={() => clickQuestion(index)}
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

ReportGraphQuestionBar.propTypes = {
    classes: PropTypes.object.isRequired,
    questions: PropTypes.array.isRequired, 
    displayQuestion: PropTypes.number.isRequired, 
    clickQuestion: PropTypes.func.isRequired
};


export default withStyles(styles)(ReportGraphQuestionBar)
