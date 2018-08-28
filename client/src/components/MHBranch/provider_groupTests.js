import React, { Component } from "react";
import provider_groupAPI from "../../utils/provider_group.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class ProviderRouteTests extends Component {

    state = {
        // test ids
        providerGroupId: "5b844946d8dc5ce848cd28a6", 
        providerId: "5b83dc3ff776924d2407d10b"
    };

    componentDidMount() {
    };



    // --------------------
    // Provider routes tests
    // --------------------


    // load all provider_groups
    loadAllProviderGroups = event => {
        event.preventDefault();
        provider_groupAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    
    // find single provider_group by id
    findOneProviderGroup = event => {
        event.preventDefault();
        provider_groupAPI.findById(this.state.providerGroupId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // add a new provider_group
    addNewProviderGroup = event => {
        event.preventDefault();
        provider_groupAPI.create({

            added_by_ref: this.state.providerId,
            added_by_id:  this.state.providerId,
            added_by_name:  "john heyworth",
            group_name: "The cleveland practice"
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    // Delete a provider_group by id
    removeProviderGroup = event => {
        event.preventDefault();
        provider_groupAPI.remove(this.state.providerGroupId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // ------
    // Render
    // ------

    render() {
        return (

            <Container>
                <br />
                Provider_groups collection route tests
                <Form>
                    <br />
                    <Button id="a" onClick={this.loadAllProviderGroups}> load all </Button>
                    <Button id="b" onClick={this.findOneProviderGroup}> find one </Button>
                    <Button id="c" onClick={this.addNewProviderGroup}> add new </Button>
                    <Button id="e" onClick={this.removeProviderGroup}> remove </Button>
                </Form>
            </Container>

        )
    };
};

export default ProviderRouteTests;