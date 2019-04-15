import axios from "axios";
export default {

    passwordReset :function(obj) {
        console.log("Axios call made to '/api/auth to 'passwordReset' ", obj);
        return axios.post("/api/auth/pwdreset", obj);
    },

    getAPIAccessToken :function() {
        console.log("Axios call made to '/api/auth to 'getAPIAccessToken' ");
        return axios.get("/api/auth/gettoken");
    },

    passwordChange :function(obj) {
        console.log("Axios call made to '/api/auth to 'passswordChange' ", obj);
        return axios.post("/api/auth/pwdchange", obj);
    },

    passwordTypeUpdate :function(obj) {
        console.log("Axios call made to '/api/auth to 'passswordTypeUpdate' ", obj);
        return axios.post("/api/auth/pwdtypeupdate", obj);
    }

}

