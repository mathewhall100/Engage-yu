import axios from "axios";
export default {

    findById :function(id){
        console.log("Axios call made to '/api/patient_data' to 'findById'");
        return axios.get("/api/patient_data/"+id);
    },

    createNewPatient: function(info){
        console.log("Axios call made to '/api/patient_data' to 'createNewPatient'");
        return axios.post("/api/patient_data/new", info);
    },

    insertRef: function(id, info) {
        console.log("Axios call made to '/api/patient_data' to 'insertRef' ", id);
        return axios.put("/api/patient_data/insertRef/"+id, info);
    },

    newEpisode: function(id, episode){
        console.log("Axios call made to '/api/patient_data' to 'newEpisode'");
        return axios.put("/api/patient_data/episode/"+id, episode);
    },

    addRecord: function(id, record){
        console.log("Axios call made to '/api/patient_data' to 'addRecord'");
        return axios.put("/api/patient_data/record/"+id, record);
    },

}