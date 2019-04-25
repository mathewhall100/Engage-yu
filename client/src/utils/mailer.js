import axios from "axios";
export default {

    send :function(msg) {
        console.log("Axios call made to '/api/mailer/send to 'send' ", msg);
        return axios.post("/api/mailer/send", msg, { 
            headers: {'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')}
        });
    }
}