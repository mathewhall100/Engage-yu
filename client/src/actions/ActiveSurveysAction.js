import axios from "axios";
import { ACTIVE_SURVEYS } from './types';

export const fetchActiveSurveys = () => {
    return(dispatch) => {
        axios.get('/api/active')
        .then( res => {
            dispatch({
                type: ACTIVE_SURVEYS,
                payload : {
                    activeSurveys : res.data, 
                }
            })
        })  
    }
}

