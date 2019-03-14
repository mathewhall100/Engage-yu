import axios from "axios";
export default {

    findAll: function() {
        console.log("Axios call made to '/api/provider' to 'findAll'");
        return axios.get("/api/provider");
    }, 

    findAllByGroup: function(id) {
        console.log("Axios call made to '/api/provider to 'findAllByGroup' ", id);
        return axios.get("/api/provider/allByGroup/"+id);
    },

    findById: function(id){
        console.log("Axios call made to '/api/provider' to 'findById'" + id);
        return axios.get("/api/provider/"+id);
    },

    create: function(info){
        console.log("Axios call made to '/api/provider' to 'create'");
        return axios.post("/api/provider", info);
    },

    remove: function(id){
        console.log("Axios call made to '/api/provider' to 'remove' " + id);
        return axios.delete("/api/provider/"+id);
    },
    
    update: function(id, info){
        console.log("Axios call made to '/api/provider' to 'update'" + id);
        return axios.put("/api/provider/"+id, info);
    },
    saveQuestionList: function(id, info){
        console.log("Axios call made to '/api/provider' to 'save question list' " + id);
        return axios.put("/api/provider/saveQuestionList/"+id, info);
    }
    
}