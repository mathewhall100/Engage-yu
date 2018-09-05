import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import PatientList from '../containers/DashboardDisplay';
import { fetchPatients } from '../actions/index';


class Dashboard extends Component {  

    componentDidMount() {
        console.log("auto-load patients")
        this.props.fetchPatients()
    }

    render () {
        
        const { isAuthenticated } = this.props;
        console.log("Props : ", this.props);
        if(!isAuthenticated) return <Redirect to='/' />
       
        return (
                <div>
      
                    <p>dashboard</p>
                    <br />
                    <PatientList name={this.props.profile.name} />

                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPatients}, dispatch);
}
function mapStatToProps({auth}){
    console.log(auth);
    return (auth);
}
// export default connect(null,null,null, {pure:false})(Dashboard);

export default connect(mapStatToProps, mapDispatchToProps) (Dashboard)