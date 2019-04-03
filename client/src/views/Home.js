import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core'
// import { withRouter, Redirect } from 'react-router-dom';
// import {authActions} from '../reducers/modules/auth';
// import * as AuthService from '../services/AuthService';
import HomeAppBar from '../components/Home/HomeAppBar';
import HomeContent from '../components/Home/HomeContent';
import HomeFooter from '../components/Home/HomeFooter';

const styles =(theme) => ({
    root: { 
        minWidth: "1160px",
        minHeight: "98vh",
        position: "relative",
        backgroundColor: theme.palette.primary.dark,
        background: "linear-gradient(to bottom, #2d404b, #1a242b)", //#28353d
        overflow: "hidden",
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: "80px"
    }
})

class Homepage extends Component {
    state= {
        redirect : false,
        role : '',
    }
    componentDidMount(){
        console.log("props in homepage : ", this.props);
        if(this.props.user.role){
            this.setState({
                redirect : true,
                page : this.props.user.role,
            })
        }
    }

    render () {
        const { classes } = this.props        
        // const { auth, user } = this.props;
        // const { redirect,  } = this.state;
        // if (user.role) {
        //     const url = user.role === 'patient' ? `/patient` : (user.role ==='provider' ? `/admin/dashboard` : `/`);
        //     console.log("url : " + url);
        //     return <Redirect to={url}/>;
        // }
        return(
            <div className={classes.root}>
                <HomeAppBar />
                <HomeContent />
                <div className={classes.footer}>
                    <HomeFooter />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    //console.log("state in homepage : ", state);
    return {
        // user: state.user
    }
};

// const mapDispatchToProps = dispatch => ({
//     loginRequest: () => dispatch(authActions.loginRequest()),
//     logoutSuccess: () => dispatch(authActions.logoutSuccess())
// });

Homepage = connect(mapStateToProps)(Homepage);
Homepage = withStyles(styles)(Homepage);
export default Homepage;
