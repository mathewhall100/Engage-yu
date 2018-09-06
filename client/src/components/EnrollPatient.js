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
        
        const { authenticated } = this.props;
        //console.log("Props : ", this.props);
        //if(authenticated ===  0 || authenticated === 2) return <Redirect to='/' /> 
        //if(!authenticated ) {return <Redirect to='/' />};


        return (
                <div>

                   
                    <EnrollPatientForm />
                    

                    <br />



                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

export default connect(null, mapDispatchToProps)(EnrollPatient)