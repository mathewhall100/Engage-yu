import React, { Component } from 'react';
//import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectConsoleTitle } from '../actions/index'
import DashboardBanner from './DashboardBanner';
import DashboardTable from './DashboardTable';

import PatientList from '../containers/DashboardDisplay';
import { fetchPatients } from '../actions/index'


class Dashboard extends Component {  
    
    componentDidMount() {

        this.props.selectConsoleTitle({title: "Dashboard"});
        this.props.fetchPatients();
    }

    render () {
        
        const { authenticated } = this.props;
        //console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};


        return (
                <div>
                    {/* <button onClick={() => this.props.selectConsoleTitle({title: "Dashboard"})}>Button</button> */}
                    <DashboardBanner />

                    <br />

                    <PatientList />
                    {/* <DashboardTable /> */}

                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchPatients }, dispatch);
}

export default connect(null, mapDispatchToProps)(Dashboard)
