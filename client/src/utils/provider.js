import axios from "axios";

export default {

    findAll: function() {
        console.log("Axios call made to '/api/provider' to 'findAll'");
        return axios.get("/api/provider", { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    }, 

    findAllByGroup: function(id) {
        console.log("Axios call made to '/api/provider to 'findAllByGroup' ", id);
        return axios.get("/api/provider/allByGroup/"+id, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    },

    findById: function(id){
        console.log("Axios call made to '/api/provider' to 'findById'" + id);
        return axios.get("/api/provider/"+id, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    },

    create: function(info){
        console.log("Axios call made to '/api/provider' to 'create'", info);
        return axios.post("/api/provider", info, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    },

    remove: function(id){
        console.log("Axios call made to '/api/provider' to 'remove' " + id);
        return axios.delete("/api/provider/"+id, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    },
    
    update: function(id, info){
        console.log("Axios call made to '/api/provider' to 'update'" + id);
        return axios.put("/api/provider/"+id, info, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    },
    saveQuestionList: function(id, info){
        console.log("Axios call made to '/api/provider' to 'save question list' " + id);
        return axios.put("/api/provider/saveQuestionList/"+id, info, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    }
    
}