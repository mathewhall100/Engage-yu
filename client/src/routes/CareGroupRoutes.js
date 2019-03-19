import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import CareGroupAdd from '../components/CareGroup/CareGroupAdd';
import CareGroupFind from '../components/CareGroup/CareGroupFind';
import CareGroupRemove from '../components/CareGroup/CareGroupRemove';
import CareGroupUpdate from '../components/CareGroup/CareGroupUpdate';
import NotFound from '../views/NotFound';

export default class CareGroupRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path='/admin/caregroup' component={CareGroupFind} />
                <Route exact path='/admin/caregroup/add' component={CareGroupAdd} />
                <Route exact path='/admin/caregroup/find' component={CareGroupFind} />
                <Route exact path='/admin/caregroup/remove' component={CareGroupRemove} />
                <Route exact path='/admin/caregroup/update' component={CareGroupUpdate} />
                <Route path="/notfound" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}
