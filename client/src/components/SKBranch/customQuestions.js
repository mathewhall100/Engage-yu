import React, { Component } from 'react';

class customQuestions extends Component {
    render(){
        console.log("Custom questions : ", this.props.customQuestions.questionList);
        return(
            <div>
                {this.props.renderQuestionnaires(this.props.customQuestions.questionList)}
            </div>
        );
    }
}
export default customQuestions;