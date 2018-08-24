import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
class Secret extends Component {     
    
    render () {
        
        const { authenticated } = this.props
        console.log("Props : ", this.props);
        if(authenticated=== 0 || authenticated === 2) return <Redirect to='/' /> 
        return (
                <div>
                    <div>
                        <p>This is a secret area.</p>
                        <Link to='/'>Home </Link>
                        <br />
                        <button onClick={this.props.logout}>Logout</button>
                    </div>
                </div >
        );
    }
}

export default connect(null,null,null, {pure:false})(Secret);