import React, { Component } from "react";
import { Link } from 'react-router-dom';
import question_customAPI from "../../utils/question_custom.js";
import question_defaultAPI from "../../utils/question_default.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


// Question nested navigation 

export class TestNavQuestions extends Component {
    render() {
        return (
        <div>
            <br />
            <br />

            <Link to='/test/customq'><Button>Test custom question routes</Button></Link>
            <br />
            <Link to='/test/defaultq'><Button>Test default question routes</Button></Link>
        </div>
    )}

};



export class CustomQuestionRouteTests extends Component {

    state = {
        // test ids
        question_customId: "5b74444dc51e8327080092cd"
    };

    componentDidMount() {
    };


    // --------------------
    // Question_custom routes tests
    // --------------------



    // load all custom questions
    loadAllCustomQuestions = event => {
        event.preventDefault();
        question_customAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    
    // add a new custom question
    addNewCustomQuestion = event => {
        event.preventDefault();
        question_customAPI.create({
            date_added: new Date(),
            added_by: "5b733f4b0ee1d97e749c2a28",
            question: "Do you have nausea or sickness?",
            answers: [ "no", "yes, mild", "yes, troubling", "yes, severe", "asleep"] ,
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    // Delete a question from the custom question collection by id
    removeCustomQuestion = event => {
        event.preventDefault();
        question_customAPI.remove(this.state.question_customId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    
    // ------
    // Render
    // ------

    render() {
        return (

            <Container>
                <br />
                Question_custom collection tests
                <Form>
                    <br />
                    <Button id="u" onClick={this.loadAllCustomQuestions}> load all </Button>
                    <Button id="v" onClick={this.addNewCustomQuestion}> add new </Button>
                    <Button id="w" onClick={this.removeCustomQuestion}> remove </Button>
                </Form>
            </Container>
        )
    };
};




export class DefaultQuestionRouteTests extends Component {

    state = {
        // test ids
    };

    componentDidMount() {
    };


    // --------------------
    // Question_default routes tests
    // --------------------


    // load default questions
    loadDefaultQuestions = event => {
        event.preventDefault();
        question_defaultAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // ------
    // Render
    // ------

    render() {
        return (

            <Container>
                <br />
                Question_default collection tests
                <Form>
                    <br />
                    <Button id="x" onClick={this.loadDefaultQuestions}> load all </Button>
                </Form>
            </Container>

        )
    };
};





