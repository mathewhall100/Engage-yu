import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from "reactstrap";
import TestAllRoutes from "./allTests";
import PatientRouteTests from './patientTests';
import ProviderRouteTests from './providerTests';
import ActiveRouteTests from './activeTests';
import QuestionNav from './questionNav';

const TestRoutes = () => (

    <Container>
        <Switch>
            <Route exact path='/test/all' component={TestAllRoutes}/>
            <Route exact path='/test/patient' component={PatientRouteTests}/>
            <Route exact path='/test/provider' component={ProviderRouteTests}/>
            <Route exact path='/test/active' component={ActiveRouteTests}/>
            <Route path='/test/question' component={QuestionNav}/>
        </Switch>
    </Container>

)

export default TestRoutes;