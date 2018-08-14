import axios from "axios";
export default {
    findAll: function() {
        console.log("Axios call made to '/api/patient' to 'findAll' ");
        return axios.get("/api/patient/all");
    },

    findByIdForProvider :function(id){
        console.log("Axios call made to '/api/patient' to 'findByIdForProvider'");
        return axios.get("/api/patient/forProvider/"+id);
    },

    findByIdForPatient: function(id){
        console.log("Axios call made to '/api/patient' to 'findByIdForPatient'");
        return axios.get("/api/patient/forPatient/"+id);
    },  
    
    createNewPatient: function(patientInfo){
        console.log("Axios call made to '/api/patient' to 'createNewPatient'");
        return axios.post("/api/patient/new", patientInfo);
    },

    updateEmail: function(id, patientInfo){
        console.log("Axios call made to '/api/patient' to 'updateEmail'");
        return axios.put("/api/patient/updateEmail/"+id, patientInfo);
    },

    updatePhone: function(id, patientInfo){
        console.log("Axios call made to '/api/patient' to 'updatePhone'");
        return axios.put("/api/patient/updatePhone/"+id, patientInfo);
    },

    updateStatus: function(id, patientInfo){
        console.log("Axios call made to '/api/patient' to 'updateStatus'");
        return axios.put("/api/patient/updateStatus/"+id, patientInfo);
    },

    updateName: function(id, patientInfo){
        console.log("Axios call made to '/api/patient' to 'updateName'");
        return axios.put("/api/patient/updateName/"+id, patientInfo);
    },

    newEpisode: function(id, episode){
        console.log("Axios call made to '/api/patient' to 'newEpisode'");
        return axios.put("/api/patient/episode/"+id, episode);
    },

    addRecord: function(id, record){
        console.log("Axios call made to '/api/patient' to 'newRecord'");
        return axios.put("/api/patient/record/"+id, record);
    },

}