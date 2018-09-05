import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
class Secret extends Component {     
    
    render () {
        
        const { authenticated } = this.props
        console.log("Props : ", this.props);
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

export default (Secret);