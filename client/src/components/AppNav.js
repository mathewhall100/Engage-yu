import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class AppNav extends Component { 
    
    
    render () {
        
        const { authenticated } = this.props;
        console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};


        return (
                    <div>
                        <p>Tabs for navigation</p>

                    </div>
        );
    }
}

export default connect(null,null,null, {pure:false})(AppNav);