import axios from 'axios';
import { QUESTIONS } from './types';


export const fetchQuestions = () => {
    const url = `/api/question_default`
    const request = axios.get(url);
    let defaultQ = [];
    return(dispatch) => {
        request.then( res => {
            defaultQ = res.data;
        }).then( 
            axios.get('/api/question_custom').then( res => {
                dispatch({
                    type: QUESTIONS,
                    payload: {customQuestions : res.data, defaultQuestion : defaultQ }
                })
            })
        )
    }
}