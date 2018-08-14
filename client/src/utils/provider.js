import axios from "axios";
export default {

    findAll: function() {
        console.log("Axios call made to '/api/provider' to 'findAll'");
        return axios.get("/api/provider");
    }, 

    findById: function(id){
        console.log("Axios call made to '/api/provider' to 'findById'" + id);
        return axios.get("/api/provider/"+id);
    },

    create: function(providerInfo){
        console.log("Axios call made to '/api/provider' to 'create'");
        return axios.post("/api/provider", providerInfo);
    },

    remove: function(id){
        console.log("Axios call made to '/api/provider' to 'remove' " + id);
        return axios.delete("/api/provider/"+id);
    },
    
    update: function(id, providerInfo){
        console.log("Axios call made to '/api/provider' to 'update '" + id);
        return axios.put("/api/provider/"+id, providerInfo);
    },
    
}