import axios from "axios";
export default {

    send :function(msg) {
        console.log("Axios call made to '/api/mailer to 'send' ", msg);
        return axios.post("/api/mailer/send", msg, { 
            headers: {
                'Authorization': 'Bearer ' + window.localStorage.getItem('auth_id_token')
            }
        });
    }
}