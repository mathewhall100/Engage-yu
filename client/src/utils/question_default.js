import axios from "axios";
export default {
    findAll: function() {
        console.log("Axios call made to '/api/question_default' to 'findAll' ");
        return axios.get("/api/question_default");
    },

}