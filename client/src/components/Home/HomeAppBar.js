import React, { Component } from 'react'
import { connect } from 'react-redux';
 import { authActions } from '../../reducers/modules/auth';
import * as AuthService from '../../services/AuthService';
import { withStyles, Grid, Typography, Button } from "@material-ui/core"

const styles = (theme) => ({
    root: {
        padding: "20px 40px"
    },
    appBarBtn: {
        marginLeft: "20px",
        float: "right",
        fontSize: "16px"
    }
})

class HomeAppBar extends Component {

    handleLogin = () => {
        AuthService.login();
        this.props.loginRequest();
    };

    render() {
        const { classes } = this.props
        // const { isAuthenticated, profile } = this.props.auth;
        return (
            <Grid container spacing={24} className={classes.root}>

                <Grid item xs={6}>
                    {/* <Typography variant="h5" color="secondary" >Engage-Yu!</Typography> */}
                </Grid>

                <Grid item xs={6}>
                    <Button color="secondary" className={classes.appBarBtn} onClick={this.handleLogin}>Login</Button> 
                    <Button color="secondary" className={classes.appBarBtn} onClick={null}>contact us</Button>   
                    <Button color="secondary" className={classes.appBarBtn} onClick={null}>help</Button>   
                    {/* <Button color="secondary" className={classes.appBarBtn}>FAQ</Button> */}
                </Grid>

            </Grid>

        )
    }
}

const mapStateToProps = ({ auth }) => ({ auth })

const mapDispatchToProps = dispatch => ({
    loginRequest: () => dispatch(authActions.loginRequest()),
    logoutSuccess: () => dispatch(authActions.logoutSuccess())
});

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false}) (withStyles(styles) (HomeAppBar));