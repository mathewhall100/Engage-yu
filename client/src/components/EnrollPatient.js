import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import EnrollPatientForm from './EnrollPatientForm'
import { selectConsoleTitle } from '../actions/index'

class EnrollPatient extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Enroll New patient"});
    }

    render () {
        
        return (
                <div>

                    <EnrollPatientForm />
                    
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

export default connect(null, mapDispatchToProps)(EnrollPatient)