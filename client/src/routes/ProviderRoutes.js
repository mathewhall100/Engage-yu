import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProviderAdd from '../Provider/ProviderAdd';
import ProviderFind from '../Provider/ProviderFind';
import ProviderRemove from '../Provider/ProviderRemove';
import ProviderUpdate from '../Provider/ProviderUpdate';
import ProviderUpdateGroup from '../Provider/ProviderUpdateGroup';
import NotFound from '../Pages/NotFound';

export default class ProviderRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path='/admin/provider' component={ProviderFind} />
                <Route exact path='/admin/provider/add' component={ProviderAdd} />
                <Route exact path='/admin/provider/find' component={ProviderFind} />
                <Route exact path='/admin/provider/remove' component={ProviderRemove} />
                <Route exact path='/admin/provider/update' component={ProviderUpdate} />
                <Route exact path='/admin/provider/updategroup' component={ProviderUpdateGroup} />
                <Route path="/notfound" component={NotFound} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}