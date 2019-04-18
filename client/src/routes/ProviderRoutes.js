import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import ProviderAdd from '../components/Provider/ProviderAdd';
import ProviderFind from '../components/Provider/ProviderFind';
import ProviderRemove from '../components/Provider/ProviderRemove';
import ProviderUpdate from '../components/Provider/ProviderUpdate';
import NotFound from '../components/UI/notFound';

export default class ProviderRoutes extends Component { 

    render(){
        return(
            <Switch>
                <Route exact path='/admin/provider' component={ProviderFind} />
                <Route exact path='/admin/provider/add' component={ProviderAdd} />
                <Route exact path='/admin/provider/find' component={ProviderFind} />
                <Route exact path='/admin/provider/remove' component={ProviderRemove} />
                <Route exact path='/admin/provider/update' component={ProviderUpdate} />
                <Route component={NotFound} />
            </Switch>
        );
    }
    
}