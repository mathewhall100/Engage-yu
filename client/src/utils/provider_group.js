import axios from "axios";
export default {

    findAll: function() {
        console.log("Axios call made to '/api/provider_group' to 'findAll'");
        return axios.get("/api/provider_group");
    }, 

    findById: function(id){
        console.log("Axios call made to '/api/provider_group' to 'findById'" + id);
        return axios.get("/api/provider_group/"+id);
    },

    create: function(providerGroupInfo){
        console.log("Axios call made to '/api/provider_group' to 'create'");
        return axios.post("/api/provider_group", providerGroupInfo);
    },

    remove: function(id){
        console.log("Axios call made to '/api/provider_group' to 'remove' " + id);
        return axios.delete("/api/provider_group/"+id);
    },
    
}