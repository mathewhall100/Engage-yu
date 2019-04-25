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

    createNewPatient: function(info) {
        console.log("Axios call made to '/api/patient_data' to 'createNewPatient'");
        return axios.post("/api/patient_data/new", info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    insertRef: function(id, info) {
        console.log("Axios call made to '/api/patient_data' to 'insertRef' ", id);
        return axios.put("/api/patient_data/insertRef/"+id, info, { 
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
        console.log("Axios call made to '/api/patient_data' to 'updateStatus'");
        return axios.put("/api/patient_data/updateStatus/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    addRecord: function(id, record){
        console.log("Axios call made to '/api/patient_data' to 'addRecord'");
        return axios.put("/api/patient_data/record/"+id, record, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },
    remove: function(id){
        console.log("Axios call made to '/api/patient_info' to 'remove' " + id);
        return axios.delete("/api/patient_data/delete/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },
}