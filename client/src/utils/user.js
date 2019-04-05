import axios from "axios";
export default {

    userLookup :function(id){
        console.log("Axios call made to '/api/user to 'userLookup' ", id);
        return axios.get("/api/user/"+id);
    },

    userCreate :function(info){
        console.log("Axios call made to '/api/user to 'userCreate' ", info);
        return axios.post("/api/user/new", info);
    },
    


}