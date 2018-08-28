import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import FetchAll from '../containers/DashboardFetch';
import PatientList from '../containers/DashboardDisplay';


class Dashboard extends Component {  
    
   
    render () {
        
        const { authenticated } = this.props;
        console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};



        return (
                <div>
                    <div>
                        <p>dashboard</p>
                        <br />
                        Click to load list of  Patients:
                        <br />
                        <FetchAll />
                        <br />
                        <PatientList />
                    </div>
                </div >
        );
    }
}

export default connect(null,null,null, {pure:false})(Dashboard);