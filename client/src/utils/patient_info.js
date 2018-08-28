import axios from "axios";


export default {

    // findAll: function() {
    //     console.log("Axios call made to '/api/patient_info' to 'findAll' ");
    //     return axios.get("/api/patient_info/all");
    // },

    findAllByProvider: function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findAllByProvider' ", id);
        return axios.get("/api/patient_info/allByProvider/"+id);
    },

    findAllByGroup: function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findAllByGroup' ", id);
        return axios.get("/api/patient_info/allByGroup/"+id);
    },

    findById:function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findById'", id);
        return axios.get("/api/patient_info/find/"+id);
    },

    findBySearchterm: function(searchterm) {
        console.log("Axios call made to '/api/patient_info' to 'findBySearchterm' ", searchterm );
        return axios.post("/api/patient_info/search", searchterm);
    },  
    
    createNewPatient: function(patientInfo) {
        console.log("Axios call made to '/api/patient_info' to 'createNewPatient'");
        return axios.post("/api/patient_info/new", patientInfo);
    },

    updateEmail: function(id, patientInfo) {
        console.log("Axios call made to '/api/patient_info' to 'updateEmail' ", id);
        return axios.put("/api/patient_info/updateEmail/"+id, patientInfo);
    },

    updatePhone: function(id, patientInfo) {
        console.log("Axios call made to '/api/patient_info' to 'updatePhone' ", id);
        return axios.put("/api/patient_info/updatePhone/"+id, patientInfo);
    },

    updateStatus: function(id, patientInfo) {
        console.log("Axios call made to '/api/patient_info' to 'updateStatus' ", id);
        return axios.put("/api/patient_info/updateStatus/"+id, patientInfo);
    },

    updateName: function(id, patientInfo ){
        console.log("Axios call made to '/api/patient_info' to 'updateName' ", id);
        return axios.put("/api/patient_info/updateName/"+id, patientInfo);
    },

    updateProvider: function(id, patientInfo) {
        console.log("Axios call made to '/api/patient_info' to 'updateProvider' ", id);
        return axios.put("/api/patient_info/updateProvider/"+id, patientInfo);
    },

    updateProviderGroup: function(id, patientInfo) {
        console.log("Axios call made to '/api/patient_info' to 'updateProviderGroup' ", id);
        return axios.put("/api/patient_info/updateProviderGroup/"+id, patientInfo);
    },


}