import axios from "axios";


export default {

    findById :function(id) {
        console.log("Axios call made to '/api/patient_data' to 'findById' ", id);
        return axios.get("/api/patient_data/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    fetchActiveSurveys: function(id) {
        console.log("Axios call made to '/api/patient_data to 'fetchActive' ", id)
        return axios.get("/api/patient_data/active/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    insertMsg: function(id, info) {
        console.log("Axios call made to '/api/patient_data' to 'insertMsg' ", id);
        return axios.put("/api/patient_data/insertMsg/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    newEpisode: function(id, episode){
        console.log("Axios call made to '/api/patient_data' to 'newEpisode'");
        return axios.put("/api/patient_data/episode/"+id, episode, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateStatus: function(id, info){
        console.log("Axios call made to '/api/patient_data' to 'updateStatus'", id, " : ", info);
        return axios.put("/api/patient_data/updateStatus/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateRecords: function(id, record){
        console.log("Axios call made to '/api/patient_data' to 'updateRecords'", id, " : ", record);
        return axios.put("/api/patient_data/updateRecords/"+id, record, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

}