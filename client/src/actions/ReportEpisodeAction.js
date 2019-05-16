import { REPORT_EPISODE } from './types';

export const reportEpisode = (episode) => {
    if (!episode) {
        //console.log("reportEpisode: ", reset)
    } else {
        return (dispatch) => dispatch ({ 
            type: REPORT_EPISODE, 
            payload: episode
        }); 
    }
}   