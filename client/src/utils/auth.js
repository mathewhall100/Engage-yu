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

    passwordChange :function(obj) {
        console.log("Axios call made to '/api/auth to 'passswordChange' ", obj);
        return axios.post("/api/auth/pwdchange", obj, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    },

    passwordTypeUpdate :function(obj) {
        console.log("Axios call made to '/api/auth to 'passswordTypeUpdate' ", obj);
        return axios.post("/api/auth/pwdtypeupdate", obj, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    }

}

