import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const styles = theme =>({
    root: {
        flexGrow: 1,
    }, 

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
});

class TopBar extends Component {  
    

    render () {
        
        const { authenticated } = this.props;
        console.log("Auth props : ", this.props);
        // if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        // if(!authenticated ) {return <Redirect to='/' />};

        const { classes } = this.props;

        return (
                <div className="classes.root">

                    <AppBar position="static">
                        <ToolBar style={{backgroundColor: "#2d404b"}}>
                            <Typography variant="display1" color="inherit" align="left" className={classes.flex}>
                                Engage-Yu!
                            </Typography>

                            <Typography variant="Title" color="inherit" align="center" className={classes.flex}>
                                Care Group: The Cleveland Practice
                            </Typography>

                            <Typography variant="Body2" color="inherit" align="right" className={classes.welcomeText}>
                                Welcome Dr. Mathew Hall
                                 {/* [this.props.profile.given_name this.props.profile.family_name] */}
                            </Typography>
                            <Button color="inherit" className={classes.menuButton}>Help</Button>
                            <Button color="inherit" className={classes.menuButton}>Logout</Button>
                        </ToolBar>
                    </AppBar>

                </div >
        );
    }
}

TopBar.propTYpes = {
    classes: PropTypes.object.isRequired,
};

export default connect(null,null,null, {pure:false}) (withStyles(styles) (TopBar));