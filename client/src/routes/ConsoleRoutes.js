import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Dashboard from '../components/Dashboard/Dashboard';
import FindPatient from '../components/Patient/PatientFind';
import UpdatePatient from '../components/Patient/PatientUpdate';
import EnrollPatient from '../components/Patient/PatientEnroll';
import Survey from '../components/Survey/Survey';
import Report from '../components/Report/Report';
import ReportFull from '../components/Report/ReportFull';
import ProviderAdd from '../components/Provider/ProviderAdd';
import ProviderFind from '../components/Provider/ProviderFind';
import ProviderRemove from '../components/Provider/ProviderRemove';
import ProviderUpdate from '../components/Provider/ProviderUpdate';
import CareGroupAdd from '../components/CareGroup/CareGroupAdd';
import CareGroupFind from '../components/CareGroup/CareGroupFind';
import CareGroupRemove from '../components/CareGroup/CareGroupRemove';
import CareGroupUpdate from '../components/CareGroup/CareGroupUpdate';
import CareGroupReassign from '../components/CareGroup/CareGroupReassignProvider';
import DeletePtFind from '../components/DeletePt/DeletePtFind'
import Questions from '../components/Questions/QuestionsCustom'
import NotFound from '../components/UI/notFound';


export default class AdminRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path="/admin" component={Dashboard} />
                <Route exact path='/admin/dashboard' component={Dashboard} />
                <Route exact path='/admin/patient/find' component={FindPatient} />
                <Route exact path='/admin/patient/enroll' component={EnrollPatient} />
                <Route exact path='/admin/patient/update' component={UpdatePatient} />
                <Route exact path='/admin/survey' component={Survey} />
                <Route exact path='/admin/report' component={Report} />
                <Route exact path='/admin/reportFull' component={ReportFull} />
                <Route exact path='/admin/questions' component={Questions} /> 
                <Route exact path='/admin/delete' component={DeletePtFind} /> 
                <Route exact path='/admin/settings' component={NotFound} />
                <Route exact path='/admin/provider/add' component={ProviderAdd} />
                <Route exact path='/admin/provider/find' component={ProviderFind} />
                <Route exact path='/admin/provider/remove' component={ProviderRemove} />
                <Route exact path='/admin/provider/update' component={ProviderUpdate} />
                <Route exact path='/admin/caregroup/find' component={CareGroupFind} />
                <Route exact path='/admin/caregroup/add' component={CareGroupAdd} />
                <Route exact path='/admin/caregroup/remove' component={CareGroupRemove} />
                <Route exact path='/admin/caregroup/update' component={CareGroupUpdate} />
                <Route exact path='/admin/caregroup/update' component={CareGroupUpdate} />
                <Route exact path='/admin/caregroup/reassign' component={CareGroupReassign} />
               


                <Route component={NotFound} />
            </Switch>
        );
    }
}
