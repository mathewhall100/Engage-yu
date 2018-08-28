import axios from 'axios';

export const FETCH_ALL_PATIENTS = 'FETCH_ALL_PATIENTS';

export const fetchPatients = () => (dispatch, getState) => {
    axios.get("/api/patient_info/all")
    .then((response) => {
        console.log("Redux axios response: ", response);
        dispatch({ type: FETCH_ALL_PATIENTS, payload: response })
    })
}