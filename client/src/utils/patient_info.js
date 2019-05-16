import axios from "axios";

export default {

    findAllByProvider: function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findAllByProvider' ", id);
        return axios.get("/api/patient_info/allByProvider/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findAllByCareGroup: function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findAllByCareGroup' ", id);
        return axios.get("/api/patient_info/allByCareGroup/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findById:function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findById'", id);
        return axios.get("/api/patient_info/find/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findOne: function(searchterm) {
        console.log("Axios call made to '/api/patient_info' to 'findOne' ", searchterm );
        return axios.post("/api/patient_info/findone", searchterm, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },  
    
    create: function(info) {
        console.log("Axios call made to '/api/patient_info' to 'create'", info);
        return axios.post("/api/patient_info/create", info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    update: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'update' ", id, " ", info);
        return axios.put("/api/patient_info/update/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateEmail: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'updateEmail' ", id, " ", info);
        return axios.put("/api/patient_info/update/email/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    cleanUp: function(info) {
        console.log("Axios call made to '/api/patient_info to 'cleanUp' :", info)
        return axios.put("/api/patient_info/cleanup/", info, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    remove: function(id){
        console.log("Axios call made to '/api/patient_info' to 'remove' " + id);
        return axios.delete("/api/patient_info/delete/"+id, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')

            }
        });
    },


}