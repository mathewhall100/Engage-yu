import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom'
import { Container, Button } from "reactstrap";
import QuestionNav from './questionNav'
import {CustomQuestionRouteTests, DefaultQuestionRouteTests} from "./questionTests"

    // Question nested navigation 

export class QuestionRoutes extends Component {
    render() {
        return (

            <div>

            <Switch>
                <Route exact path='/test/question/custom' component={CustomQuestionRouteTests}/>
                <Route exact path='/test/question/default' component={DefaultQuestionRouteTests}/>
            </Switch>

            </div>

    )}
}

export default QuestionRoutes;


