import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';



class PhysicianInfo extends Component {  
    
    componentDidMount() {
    }

    render () {

        return (
                <div>
                    PhysicianInfo

                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch);
}
function mapStatToProps(state){
    return (state);
}

export default connect(mapStatToProps, mapDispatchToProps) (PhysicianInfo)
