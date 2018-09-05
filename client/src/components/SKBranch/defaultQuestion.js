import React, { Component } from 'react';
class defaultQuestion extends Component {

    
    render() {
        console.log("Default question page : " , this.props);
        return (
            <div>
                {this.props.renderQuestionnaires(this.props.defaultQuestion, this.props.menuButton, this.props.formControl, this.props.radioGroup, this.props.handleChange)}
            </div>
        );
    }
}

export default defaultQuestion;