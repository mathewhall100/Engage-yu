import axios from "axios";
export default {
    findAll: function() {
        console.log("Axios call made to '/api/question_custom' to 'findAll' ");
        return axios.get("/api/question_custom");
    },

    create: function(questionInfo){
        console.log("Axios call made to '/api/question_custom' to 'create'");
        return axios.post("/api/question_custom/", questionInfo);
    },

    remove: function(id){
        console.log("Axios call made to '/api/question_custom' to 'remove' ");
        return axios.delete("/api/question_custom/"+id);
    },

}