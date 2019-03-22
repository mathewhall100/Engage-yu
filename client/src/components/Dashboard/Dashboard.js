import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectConsoleTitle, loadPatient } from '../../actions'
import DashboardBanner from './DashboardBanner';
import DashboardTable from './DashboardTable';


class Dashboard extends Component {  
    
    componentDidMount() {
        // Save page title to store (picked up and displayed by console component)
        // Then clear the store and local storage of any patient data ready for new patient selection
        this.props.dispatch(selectConsoleTitle({title: "Dashboard"}));
        this.props.dispatch(loadPatient([],[]))
        this.setState({displayPatientId: "" });
        localStorage.setItem("patient_id", "")
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
                { showBanner && 
                    <React.Fragment>
                        <DashboardBanner toggleBanner={this.toggleBanner} /> 
                        <br />
                    </React.Fragment> 
                }
                <DashboardTable /> 
            </React.Fragment >
        );
    }
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

export default connect(mapStateToProps)(Dashboard)
