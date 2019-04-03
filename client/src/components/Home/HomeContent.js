import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { reduxForm } from 'redux-form';
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
        AuthService.logout(); // careful, this is a static method
    }

    submit(values) {
        console.log("Submitted values: ", values);
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
