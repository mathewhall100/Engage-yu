import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { selectConsoleTitle } from '../actions/index'
import DashboardBanner from './DashboardBanner';
import DashboardTable from '../containers/DashboardTable';


class Dashboard extends Component {  
    
    componentDidMount() {
        // Save page title to store (picked up and displayed by console component)
        this.props.selectConsoleTitle({title: "Dashboard"});
    }

    state = {
        showBanner: true
    }

    toggleBanner = () => {
        this.setState({showBanner: !this.state.showBanner})
    }

    render () {
        const { showBanner } = this.state
        return (
            <React.Fragment>
                { showBanner && <React.Fragment>
                    <DashboardBanner toggleBanner={this.toggleBanner} /> 
                    <br />
                </React.Fragment> }
                
                <DashboardTable /> 
            </React.Fragment >
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
