import axios from "axios";

export default {

    findAllByGroup: function(id) {
        console.log("Axios call made to '/api/provider to 'findAllByGroup' ", id);
        return axios.get("/api/provider/allByGroup/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    findById: function(id){
        console.log("Axios call made to '/api/provider' to 'findById' " + id);
        return axios.get("/api/provider/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    create: function(info){
        console.log("Axios call made to '/api/provider' to 'create'", info);
        return axios.post("/api/provider", info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    delete: function(id){
        console.log("Axios call made to '/api/provider' to 'delete' " + id);
        return axios.delete("/api/provider/"+id, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },
    
    update: function(id, info){
        console.log("Axios call made to '/api/provider' to 'update'" + id);
        return axios.put("/api/provider/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateEmail: function(id, info){
        console.log("Axios call made to '/api/provider' to 'updateEmail'" + id);
        return axios.put("/api/provider/updateEmail/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },
    
    addNewList: function(id, info){
        console.log("Axios call made to '/api/provider' to 'add new list' " + id);
        return axios.post("/api/provider/customlist/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateList: function(id, info){
        console.log("Axios call made to '/api/provider' to 'update a list' " + id, info);
        return axios.put("/api/provider/customlist/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    deleteList: function(id, info){
        console.log("Axios call made to '/api/provider' to 'delete list' " + id, info);
        return axios.post("/api/provider/customlist/delete/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    saveAllQuestions: function(id, info) {
        console.log("Axios call made to '/api/provider' to 'save all questions' " + id, info);
        return axios.put("/api/provider/customquestion/all/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });

    },

    saveQuestion: function(id, info){
        console.log("Axios call made to '/api/provider' to 'save custom question' " + id);
        return axios.post("/api/provider/customquestion/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateQuestion: function(id, info){
        console.log("Axios call made to '/api/provider' to 'update custom question' " + id);
        return axios.put("/api/provider/customquestion/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    deleteQuestion: function(id, info){
        console.log("Axios call made to '/api/provider' to 'delete custom question' " + id);
        return axios.post("/api/provider/customquestion/delete/"+id, info, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },
    
}