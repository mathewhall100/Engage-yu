import axios from "axios";
export default {
    findAll: function() {
        console.log("Axios call made to '/api/question_custom' to 'findAll' ");
        return axios.get("/api/question_custom");
    },

    create: function(info){
        console.log("Axios call made to '/api/question_custom' to 'create'");
        return axios.post("/api/question_custom/", info);
    },

    update: function(id, info){
        console.log("Axios call made to '/api/question_custom' to 'update'")
        return axios.put("/api/question_custom/"+id, info)
    },

    delete: function(id){
        console.log("Axios call made to '/api/question_custom' to 'delete' ");
        return axios.delete("/api/question_custom/"+id);
    },

}