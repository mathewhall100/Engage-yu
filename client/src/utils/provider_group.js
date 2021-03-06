import axios from "axios";

export default {

    findAll: function() {
        console.log("Axios call made to '/api/provider_group' to 'findAll'");
        return axios.get("/api/provider_group", { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    }, 

    findById: function(id){
        console.log("Axios call made to '/api/provider_group' to 'findById'" + id);
        return axios.get("/api/provider_group/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    update: function(id, info){
        console.log("Axios call made to '/api/provider_group' to 'update'" + id);
        return axios.put("/api/provider_group/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    create: function(info){
        console.log("Axios call made to '/api/provider_group' to 'create'");
        return axios.post("/api/provider_group", info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    remove: function(id){
        console.log("Axios call made to '/api/provider_group' to 'remove' " + id);
        return axios.delete("/api/provider_group/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },
    
}