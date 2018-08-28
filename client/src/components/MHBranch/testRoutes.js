import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from "reactstrap";
import ProviderRouteTests from './providerTests';
import Provider_groupRouteTests from './provider_groupTests';
import Patient_dataRouteTests from './patient_dataTests';
import Patient_infoRouteTests from './patient_infoTests';
import ActiveRouteTests from './activeTests';
import QuestionNav from './questionNav';
import UserTests from './userTests';

const TestRoutes = () => (

    <Container>
        <Switch>
            <Route exact path='/test/provider' component={ProviderRouteTests}/>
            <Route exact path='/test/provider_group' component={Provider_groupRouteTests}/>
            <Route exact path='/test/patient_data' component={Patient_dataRouteTests}/>
            <Route exact path='/test/patient_info' component={Patient_infoRouteTests}/>
            <Route exact path='/test/active' component={ActiveRouteTests}/>   
            <Route path='/test/question' component={QuestionNav}/>
            <Route path='/test/user' component={UserTests}/>
        </Switch>
    </Container>

)

export default TestRoutes;