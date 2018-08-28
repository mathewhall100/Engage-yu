

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';


class AppBar extends Component {  
    
   
    render () {
        
        const { authenticated } = this.props;
        console.log("Auth props : ", this.props);
        if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        // if(!authenticated ) {return <Redirect to='/' />};



        return (
                <div position="static" className="App-AppBar">
                    
                    <h1>Engage-Yu!</h1>
                    {/* <h3>Welcome {this.props.profile.given_name} {this.props.profile.family_name} | Help | {authenticated ? <button onClick={this.props.logout}>Logout</button> : null}</h3> */}
                    <button><Link to='/'>Home </Link></button>

                </div >
        );
    }
}

export default connect(null,null,null, {pure:false})(AppBar);