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

    findFullById:function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findFullById'", id);
        return axios.get("/api/patient_info/findFull/"+id);
    },

    findBySearchterm: function(searchterm) {
        console.log("Axios call made to '/api/patient_info' to 'findBySearchterm' ", searchterm );
        return axios.post("/api/patient_info/search", searchterm);
    },  
    
    createNewPatient: function(info) {
        console.log("Axios call made to '/api/patient_info' to 'createNewPatient'" + JSON.stringify(info, null, 2));
        return axios.post("/api/patient_info/new", info);
    },

    insertRef: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'insertRef' ", id);
        return axios.put("/api/patient_info/insertRef/"+id, info);
    },

    updateEmail: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'updateEmail' ", id);
        return axios.put("/api/patient_info/updateEmail/"+id, info);
    },

    updatePhone: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'updatePhone' ", id);
        return axios.put("/api/patient_info/updatePhone/"+id, info);
    },

    updateStatus: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'updateStatus' ", id);
        return axios.put("/api/patient_info/updateStatus/"+id, info);
    },

    updateName: function(id, info ){
        console.log("Axios call made to '/api/patient_info' to 'updateName' ", id);
        return axios.put("/api/patient_info/updateName/"+id, info);
    },

    updateProvider: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'updateProvider' ", id);
        return axios.put("/api/patient_info/updateProvider/"+id, info);
    },

    updateProviderGroup: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'updateProviderGroup' ", id);
        return axios.put("/api/patient_info/updateProviderGroup/"+id, info);
    },
    remove: function(id){
        console.log("Axios call made to '/api/patient_info' to 'remove' " + id);
        return axios.delete("/api/patient_info/delete/"+id);
    },


}