import React, { Component } from 'react';
import {  Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectConsoleTitle } from '../actions/index'
import DashboardBanner from './DashboardBanner';
import DashboardTable from '../containers/DashboardTable';

import { fetchActiveSurveys } from '../actions/index'


class Dashboard extends Component {  
    
    componentDidMount() {

        this.props.selectConsoleTitle({title: "Dashboard"});
        this.props.fetchActiveSurveys();
    }

    render () {
        
        return (
                <div>

                    <DashboardBanner />

                    <br />

                    <DashboardTable /> 
                    
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchActiveSurveys }, dispatch);
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

export default connect(mapStateToProps, mapDispatchToProps) (Dashboard)
