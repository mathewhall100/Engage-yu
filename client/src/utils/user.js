import axios from "axios";
export default {

    userLookup :function(id){
        console.log("Axios call made to '/api/user to 'userLookup' ", id);
        return axios.get("/api/user/"+id, { 
                 headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
             });
    },

    userCreate :function(info){
        console.log("Axios call made to '/api/user to 'userCreate' ", info);
        return axios.post("/api/user", info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    }
    
}