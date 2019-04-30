import axios from "axios";

export default {

    findAllByProvider: function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findAllByProvider' ", id);
        return axios.get("/api/patient_info/allByProvider/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findAllByGroup: function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findAllByGroup' ", id);
        return axios.get("/api/patient_info/allByGroup/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findById:function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findById'", id);
        return axios.get("/api/patient_info/find/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findFullById:function(id) {
        console.log("Axios call made to '/api/patient_info' to 'findFullById'", id);
        return axios.get("/api/patient_info/findFull/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findBySearchterm: function(searchterm) {
        console.log("Axios call made to '/api/patient_info' to 'findBySearchterm' ", searchterm );
        return axios.post("/api/patient_info/search", searchterm, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },  
    
    createNewPatient: function(info) {
        console.log("Axios call made to '/api/patient_info' to 'createNewPatient'", info);
        return axios.post("/api/patient_info/new", info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    update: function(id, info) {
        console.log("Axios call made to '/api/patient_info' to 'update' ", id, " ", info);
        return axios.put("/api/patient_info/update/"+id, info, { 
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