import axios from "axios";
export default {

    findAll: function() {
        console.log("axios")
        return axios.get("/api/provider");
    }, 

    findOne: function(id){
        return axios.get("/api/provider/"+id);
    },

    create: function(providerInfo){
        return axios.post("/api/provider", providerInfo);
    },

    remove: function(id){
        return axios.delete("/api/provider/"+id);
    },
    
    update: function(id, providerInfo){
        return axios.put("/api/provider/"+id, providerInfo);
    },
    
}