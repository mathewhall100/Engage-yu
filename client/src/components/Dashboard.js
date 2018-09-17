import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
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
        
        const { isAuthenticated } = this.props;
        console.log("Props : ", this.props);
        if (!isAuthenticated) return <Redirect to='/' />

        return (
                <div>

                    <DashboardBanner />

                    <br />

                    <PatientList />  {/* <DashboardTable /> */}
                    
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchPatients }, dispatch);
}
function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)
