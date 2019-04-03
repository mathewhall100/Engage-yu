import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
//import { authActions } from '../reducers/modules/auth';
//import * as AuthService from '../services/AuthService';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Console from '../components/Console/Console';
import Appbar from '../AppBar';
import Footer from '../components/Footer/Footer';

const styles = theme => ({
    root: { 
        flexGrow: 1,
        minWidth: "1160px",
        maxWidth: "1600px",
        margin: "0 auto",
        position: 'relative',
        minHeight: "100vh"
    },
    container: {
        paddingBottom: "80px" // footer height
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: "80px"
    }
});


class Admin extends Component { 

    state = {
        redirect: false
    }

    componentDidMount() {
        this.checkLoggedIn()
    }

    // Check if logged in & redirect to error page if not
    checkLoggedIn = () => {  this.setState({redirect : !this.props.auth.isAuthenticated ? true : this.state.redirect}) }

    render () {

        const { classes } = this.props;
        const { redirect } = this.state;

        if (redirect) {
            const url = `/notauthenticated`;
            return <Redirect to={url} />;
        }

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <div className={classes.container}>
                        <Appbar />
                        <Console />  
                    </div>
                    <div  className={classes.footer}>
                        <br />
                        <Footer />
                    </div>
                </div >
            </Fragment>
        );
    }
}
const mapStateToProps = ({ auth }) => ({ auth })

export default connect(mapStateToProps, null, null, {pure:false}) (withStyles(styles) (Admin));

