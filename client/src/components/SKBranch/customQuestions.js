import React, { Component } from 'react';

class customQuestions extends Component {
    render(){
        console.log("Custom questions : ", this.props.customQuestions.questionList);
        return(
            <div>
                {this.props.renderQuestionnaires(this.props.customQuestions.questionList, this.props.menuButton, this.props.formControl, this.props.radioGroup, this.props.handleChange)}
            </div>
        );
    }
}
export default customQuestions;