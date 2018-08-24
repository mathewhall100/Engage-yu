import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import DefaultQuestion from './defaultQuestion';
import CustomQuestions from './customQuestions';
import { fetchQuestions } from '../../actions/PatientAction';

class SKBranch extends Component {
    componentWillMount(){
        this.props.fetchQuestions();
    }

    renderQuestionnaires(questionnaire){
        console.log("HERE: " , questionnaire);
        if(!_.isEmpty(questionnaire)){
            return _.map(questionnaire, (q) => {
                return(
                <div key={q._id}>
                    <p>{q.question}</p>
                    {_.map(q.answers, (a) => {
                        return(
                        <button>{a}</button>
                        )
                    })
                    }
                </div>
                )
            })
        }else{
            return <div>Empty</div>
        }
    }

    render () {
        console.log("in render , " , this.props);
        return(
            <div>
                <h1>SK Branch</h1>
                Default Question : 
                <DefaultQuestion defaultQuestion = {this.props.defaultQuestion} renderQuestionnaires = {this.renderQuestionnaires} />
                <hr/>
                Custom Questions :
                <CustomQuestions customQuestions={this.props.customQuestions} renderQuestionnaires={this.renderQuestionnaires} />
            </div>
        );
        
    }
}

const mapStateToProps = state => {
    console.log("SK : " , state.patient);
    return { 
        defaultQuestion : state.patient.defaultQuestion,
        customQuestions: state.patient.customQuestions
    }
}

export default connect(mapStateToProps, { fetchQuestions })(SKBranch);