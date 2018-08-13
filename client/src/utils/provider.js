import axios from "axios";
export default {

    findAll: function() {
        console.log("findAll: api call made to '/api/provider' ")
        return axios.get("/api/provider");
    }, 

    findById: function(id){
        console.log("findOne: api call made to '/api/provider' " + id)
        return axios.get("/api/provider/"+id);
    },

    create: function(providerInfo){
        console.log("create: api call made to '/api/provider' " + JSON.stringify(providerInfo, null, 2))
        return axios.post("/api/provider", providerInfo);
    },

    remove: function(id){
        console.log("remove: api call made to '/api/provider' " + id)
        return axios.delete("/api/provider/"+id);
    },
    
    update: function(id, providerInfo){
        console.log("update: api call made to '/api/provider' " + id)
        return axios.put("/api/provider/"+id, providerInfo);
    },
    
}