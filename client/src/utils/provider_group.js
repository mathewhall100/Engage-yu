import axios from "axios";

// Note axios default Authorization header set in app.js

export default {

    findAll: function() {
        console.log("Axios call made to '/api/provider_group' to 'findAll'");
        return axios.get("/api/provider_group");
    }, 

    findById: function(id){
        console.log("Axios call made to '/api/provider_group' to 'findById'" + id);
        return axios.get("/api/provider_group/"+id);
    },

    update: function(id, info){
        console.log("Axios call made to '/api/provider_group' to 'update'" + id);
        return axios.put("/api/provider_group/"+id, info);
    },

    create: function(info){
        console.log("Axios call made to '/api/provider_group' to 'create'");
        return axios.post("/api/provider_group", info);
    },

    remove: function(id){
        console.log("Axios call made to '/api/provider_group' to 'remove' " + id);
        return axios.delete("/api/provider_group/"+id);
    },
    
}