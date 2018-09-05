import React, { Component } from 'react';
import { connect } from 'react-redux';

class ConsoleTitle extends Component {

    render () {
        if (!this.props.consoleTitle) {
            return <div>Dashboard</div>;
        }

        return (
            <div>
                {this.props.consoleTitle.title}
            </div>
        );
    }
}

function mapStateToProps(state) {
    
    return {
        consoleTitle: state.consoleTitle,
    };
}   


export default connect(mapStateToProps)(ConsoleTitle);