
import { SURVEY_QUESTIONS} from './types';

export const fetchSurveyQuestions = (defaultQuestion, customQuestions) => {
    console.log("surveyAction: (defaultQuestion): ", defaultQuestion)
    console.log("surveyAction (customQuestions): ", customQuestions)
    return(dispatch) => {
        dispatch({
            type: SURVEY_QUESTIONS,
            payload : {    
                surveyDefaultQuestion : defaultQuestion,
                surveyCustomQuestions : customQuestions
            }
        })
    }

}
