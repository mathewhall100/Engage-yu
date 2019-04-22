import React, { Component, Fragment} from 'react';
import { connect } from 'react-redux';
import { selectConsoleTitle } from '../../actions'
import DashboardBanner from './DashboardBanner';
import DashboardTable from './DashboardTable';


class Dashboard extends Component {  
    
    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Dashboard", menuIndex: 0}));
        this.setState({displayPatientId: "" });
        localStorage.removeItem("report_return_locn")
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
            <Fragment>
                { showBanner && 
                    <Fragment>
                        <DashboardBanner toggleBanner={this.toggleBanner} /> 
                        <br />
                    </Fragment> 
                }
                <DashboardTable /> 
            </Fragment >
        );
    }
}

function mapStateToProps({auth}){
    console.log(auth);
    return (auth);
}

export default connect(mapStateToProps)(Dashboard)
