import axios from "axios";
import { LIST_PATIENTS_BY_PROVIDER } from './types';

export const fetchListPatientsByProvider = (id) => {
    //console.log("action creator Id: ", id)
    return(dispatch) => {

        axios.get('/api/patient_info/allByProvider/'+id)
        .then( res => {
            //console.log("action creator: ", res.data)
            dispatch({
                type: LIST_PATIENTS_BY_PROVIDER,
                payload : {
                    listPatientsByProvider : res.data, 
                }
            })
        })  
    }
}
