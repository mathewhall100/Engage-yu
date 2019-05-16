import axios from "axios";


export default {

    passwordReset :function(obj) {
        console.log("Axios call made to '/api/auth to 'passwordReset' ", obj);
        return axios.post("/api/auth/pwdreset", obj, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    getAPIAccessToken :function() {
        console.log("Axios call made to '/api/auth to 'getAPIAccessToken' ");
        return axios.get("/api/auth/gettoken", { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    update :function(obj) {
        console.log("Axios call made to '/api/auth to 'update' ", obj);
        return axios.post("/api/auth/update", obj, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    updateMetaData :function(obj) {
        console.log("Axios call made to '/api/auth to 'updateMetaData' ", obj);
        return axios.post("/api/auth/updatemeta", obj, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    delete :function(obj) {
        console.log("Axios call made to 'api/auth' to 'delete' ", obj)
        return axios.post("/api/auth/delete", obj, {
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    }

}

