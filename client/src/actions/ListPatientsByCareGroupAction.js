import axios from "axios";
import { LIST_PATIENTS_BY_CAREGROUP } from './types';

export const fetchListPatientsByCareGroup = (id) => {
    //console.log("action creator Id: ", id)
    return(dispatch) => {

        axios.get('/api/patient_info/allByGroup/'+id)
        .then( res => {
            //console.log("action creator: ", res.data)
            dispatch({
                type: LIST_PATIENTS_BY_CAREGROUP,
                payload : {
                    listPatientsByCareGroup : res.data, 
                }
            })
        })  
    }
}