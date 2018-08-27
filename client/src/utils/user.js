import axios from "axios";
export default {

    userLookup :function(id){
        console.log("Axios call made to '/api/user to 'userLookup' ", id);
        return axios.get("/api/user/"+id);
    },
    


}