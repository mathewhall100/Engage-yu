import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from "reactstrap";

import TestNav from "./testNav";
import TestAllRoutes from "./allTests";
import PatientRouteTests from './patientTests';
import ProviderRouteTests from './providerTests';
import ActiveRouteTests from './activeTests';
import {CustomQuestionRouteTests, DefaultQuestionRouteTests, TestNavQuestions} from './questionTests';


const TestRoutes = () => (
    <Container>

    <TestNav />

    <Switch>
        <Route exact path='/test/all' component={TestAllRoutes}/>
        <Route exact path='/test/patient' component={PatientRouteTests}/>
        <Route exact path='/test/provider' component={ProviderRouteTests}/>
        <Route exact path='/test/active' component={ActiveRouteTests}/>
        <Route exact path='/test/questions' component={TestNavQuestions}/>
        <Route exact path='/test/customq' component={CustomQuestionRouteTests}/>
        <Route exact path='/test/defaultq' component={DefaultQuestionRouteTests}/>
    </Switch>

    </Container>

)

export default TestRoutes;