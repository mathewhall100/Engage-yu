import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { selectConsoleTitle } from '../actions/index'
import { fetchListPatientsByProvider } from '../actions';
import FindPatientForm from '../containers/FindPatientForm';
import FindPatientTable from '../containers/FindPatientTable';
// import FindPatientDetails from '../containers/FindPatientDetails';


class FindPatient extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Find Patient"});
    }

    state = {
        filterName: "",
        filterNumber: "",
        filterList: ""
    }

    componentWillMount() {
        if (this.props.user) { this.props.fetchListPatientsByProvider(this.props.user.id) }
    }

    componentWillReceiveProps(nextProps) {
        console.log("nextProps: ", nextProps)
        if (nextProps.user) { this.props.fetchListPatientsByProvider(nextProps.user.id) }
    }

    filterByName = (value) => {
        console.log("FilterByName: ", value);
        this.setState({filterName: value})
    }

    filterByNumber= (value) => {
        console.log("FilterByNumber: ", value);
        this.setState({filterNumber: value})
    }

    filterByList = (value) => {
        console.log("FilterByList: ", value);
        this.setState({filterList: value})
    }

    render () {
        
        return (
                <div>

                    <FindPatientForm 
                        filterByName={this.filterByName} 
                        filterByNumber={this.filterByNumber} 
                        filterByList={this.filterByList}
                    />

                    <br />

                    <FindPatientTable 
                        filterName={this.state.filterName} 
                        filterNumber={this.state.filterNumber} 
                        filterList={this.state.filterList} 
                    /> 

                    <br />

                    {/* <FindPatientDetails />  */}
                    
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchListPatientsByProvider }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        user: state.user
    }
};

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

export default connect(mapStateToProps, mapDispatchToProps) (FindPatient)