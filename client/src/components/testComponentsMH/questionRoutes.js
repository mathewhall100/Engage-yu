import React, { Component } from "react";
import { Switch, Route} from 'react-router-dom'
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


