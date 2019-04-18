import React, { Component } from 'react'
import { connect } from 'react-redux';
 import { authActions } from '../../actions/auth';
import * as AuthService from '../../services/AuthService';
import { withStyles, Grid } from "@material-ui/core"
import BtnAction from '../UI/Buttons/btnAction'

const styles = (theme) => ({
    root: {
        padding: "20px 40px"
    },
    appBarBtns: {
        marginLeft: "20px",
        float: "right",
    }
})

class LoginAppBar extends Component {
    

    handleLogin = () => {
         AuthService.login();
         this.props.loginRequest();
     };

    render() {
        const { classes } = this.props

        return (
            <Grid container spacing={24} className={classes.root}>

                <Grid item xs={6}>
                </Grid>

                <Grid item xs={6}>
                    <div className={classes.appBarBtns} > 
                        <BtnAction type="button" text={<span style={{fontSize: "15px"}}>help</span>} marginRight={true} />
                        <BtnAction type="button" text={<span style={{fontSize: "15px"}}>contact us</span>} marginRight={true}/>  
                        <BtnAction type="button" text={<span style={{fontSize: "15px"}}>login</span>} handleAction={this.handleLogin}/>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps, null, {pure:false}) (withStyles(styles) (LoginAppBar));