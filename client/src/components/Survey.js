import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '@material-ui/core/Card';

import SurveyForm from '../containers/SurveyForm'
import { selectConsoleTitle } from '../actions'

class Survey extends Component {  

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Create new diary card"});
    }

    render () {
        
        return (
                
                <Card style={{paddingLeft: "40px", paddingTop: "20px"}}>

                    <SurveyForm />

                </Card >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

export default connect(null, mapDispatchToProps)(Survey)