import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
import auth0 from 'auth0-js';
import { authActions } from '../../reducers/modules/auth';
import * as AuthService from '../../services/AuthService';
import { withStyles, Typography }  from '@material-ui/core';
import bannerImg from '../../img/dashboardBannnerImage.PNG';
import FormBox from '../UI/Forms/formBox'
import BtnAction from '../UI/Buttons/btnAction'


const styles = theme => ({
    bannerDiv: {
        height: "460px",
        width: "1000px",
        padding: "40px",
        backgroundImage: `url(${bannerImg})`,
        backgroundPosition: "center", 
        backgroundRepeat: "no-repeat", 
        backgroundSize: "cover",
        borderRadius: "8px",
        position: "absolute", 
        top: "50%",
        left: "50%",
        transform: 'translate(-50%, -50%)'
    },
    bannerTextBox: {
        float: "right",
    },
    bannerTitle: {
        fontWeight: "bold",
        fontSize: "62px",
        color: theme.palette.primary.main
    },
    bannerText: {
        fontSize: '32px',
        color: "#28353d"
    },
});


class HomeContent extends Component {

    componentDidMount() {
        // this.props.logoutSuccess();
        // AuthService.logout(); // careful, this is a static method
    }

    // submit(values) {
    //     console.log("Submitted values: ", values);
    //         const url = 'https://engageyu-dev.auth0.com/dbconnections/signup'; 
    //         const config = {headers: { 'content-type': 'application/json'}};
    //         const body = {
    //             client_id: 'mrtJ796iMGWdpVzIH78fzVSwbGCj0tse',
    //             email: values.email,
    //             password: values.password,
    //             connection: "Engage-Yu",
    //             user_metadata: { name: "Mathew Hall"},
    //             responseType: "token id_token"
    //         };
    //     return axios.post(url, body, config)
    //     .then(response => {
    //         alert("response: ", response)
    //     })
    //     .catch(error => {
    //         alert("something went wrong: ", error.message);
    //     })
    // }

    // submit(values) {
    //     console.log("Submitted values: ", values);
    //     AuthService.webAuth.signup({
    //         connection: "Engage-Yu",
    //         email: values.email,
    //         password: values.password,
    //         user_metadata: { name: "Mathew Hall"},
    //         responseType: "token id_token"
    //     }, function (err, res) {
    //         if (err) return alert("something went wrong: ");
    //         console.log("res", res)
    //         console.log(res.Id)
    //     });
    // }

    submit(values) {
        console.log("Submitted values: ", values);
        AuthService.webAuth.login({
            realm: "Engage-Yu",
            email: values.email,
            password: values.password,
            responseType: "token id_token"
        }, function (err) {
            if (err) return alert("something went wrong: ", err.message);
            return alert("success signup without login")
        });
    }

    render () {
        const { classes, handleSubmit, pristine} = this.props;

        return(
            <Fragment>

                <div className={classes.bannerDiv}>

                        <div className={classes.bannerTextBox}>

                            <Typography noWrap className={classes.bannerTitle} >
                                Engage-Yu!
                            </Typography>
                            {/* <hr /> */}
                            {/* <Typography noWrap className={classes.bannerText}>
                                for Parkinson Disease
                            </Typography>  */}
                            {/* <hr /> */}

                            <form noValidate onSubmit={handleSubmit(this.submit.bind(this))}>
                                <br /> <br /> <br /> <br />
                                {/* <Typography variant="h5" gutterBottom>Login</Typography> */}
                                <FormBox name="email" label="Email" rows="1"/>
                                <FormBox name="password" label="Password" rows="1"/>
                                <br />
                                <BtnAction type="submit" disabled={pristine} text="login" />
                            </form>

                        </div>
                </div>

            </Fragment>
        );
    }
}

const formData = {
	form: 'loginForm', //unique identifier for this form
	// validate    
}

HomeContent = reduxForm(formData)(HomeContent)
HomeContent = withStyles(styles)(HomeContent)
HomeContent = withRouter(HomeContent);
export default HomeContent;
