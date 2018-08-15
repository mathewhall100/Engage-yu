import axios from "axios";
export default {
    findAll: function() {
        console.log("Axios call made to '/api/active' to 'findAll' ");
        return axios.get("/api/active");
    },

    findById :function(id){
        console.log("Axios call made to '/api/active' to 'findById'");
        return axios.get("/api/active/"+id);
    },
    
    create: function(activeInfo){
        console.log("Axios call made to '/api/active' to 'create'");
        return axios.post("/api/active/", activeInfo);
    },

    update: function(id, activeInfo){
        console.log("Axios call made to '/api/active' to 'update'");
        return axios.put("/api/active/"+id, activeInfo);
    },

    remove: function(id){
        console.log("Axios call made to '/api/active' to 'remove' ");
        return axios.delete("/api/active/"+id);
    },

}