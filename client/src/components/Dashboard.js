import React, { Component } from 'react';
//import { Link, Redirect } from 'react-router-dom';
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
        
        const { authenticated } = this.props;
        console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};



        return (
                <div>
                    <PatientList />
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPatients}, dispatch);
}

// export default connect(null,null,null, {pure:false})(Dashboard);

export default connect(null, mapDispatchToProps) (Dashboard)