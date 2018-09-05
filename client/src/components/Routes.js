import React, { Component } from "react";
import { connect } from 'react-redux';
import { Route, Switch, Link} from "react-router-dom";
// import TestNav from "./testComponentsMH/testNav";
// import TestRoutes from "./testComponentsMH/testRoutes"
// import QuestionRoutes from './testComponentsMH/questionRoutes'
import Homepage from './Homepage';
import Admin from './Admin';
import NotFound from './NotFound';
import Callback from './Callback';
import SK from './SKBranch/patients';

class Routes extends Component { 
    render(){
        console.log("routes props : " , this.props);
        return(
            <div className="App">

                <Switch>
                    <Route path='/admin' render={props => <Admin {...this.props}></Admin>} />
                    <Route exact path='/callback' render={props => <Callback></Callback>} />
                    <Route exact path="/" render={props => <Homepage {...this.props}> </Homepage>} />
                    <Route exact path="/sk" render={props => <SK {...this.props} title='Dashboard' ></SK>} />
                    <Route exact path='/sk/survey' render={props => <SK {...this.props}  title='Survey' ></SK>} />
                    <Route exact path='/sk/physician' render={props => <SK {...this.props} title='Physician' ></SK>} />
                    <Route path="/notfound" component={NotFound} />
                    <Route component={NotFound} />
                </Switch>

            </div>
        );
    }
    
}
export default (Routes);