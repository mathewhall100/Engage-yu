import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import FindPatient from '../components/Patient/PatientFind';
import UpdatePatient from '../components/Patient/PatientUpdate';
import EnrollPatient from '../components/Patient/PatientEnroll';
import NotFound from '../components/UI/notFound';

export default class PatientRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path='/admin/patient' component={FindPatient} /> 
                <Route exact path='/admin/patient/find' component={FindPatient} />
                <Route exact path='/admin/patient/enroll' component={EnrollPatient} />
                <Route exact path='/admin/patient/update' component={UpdatePatient} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}