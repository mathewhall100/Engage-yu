import React, { Component } from 'react';
class defaultQuestion extends Component {

    
    render() {
        console.log("Default question page : " , this.props.defaultQuestion);
        return (
            <div>
                {this.props.renderQuestionnaires(this.props.defaultQuestion)}
            </div>
        );
    }
}

export default defaultQuestion;