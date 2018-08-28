import React, { Component } from "react";
import providerAPI from "../../utils/provider.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class ProviderRouteTests extends Component {

    state = {
        // test ids
        providerId: "5b8466bbf6d8b1d2fc8d45b1", 
        provider_groupId: "5b844946d8dc5ce848cd28a6",
        question_customId: "5b844944d8dc5ce848cd28a1"
    };

    componentDidMount() {
    };



    // --------------------
    // Provider routes tests
    // --------------------


    // load all providers
    loadAllProviders = event => {
        event.preventDefault();
        providerAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    
    // find single provider by id
    findOneProvider = event => {
        event.preventDefault();
        providerAPI.findById(this.state.providerId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // add a new provider
    addNewProvider = event => {
        event.preventDefault();
        providerAPI.create({

            firstname: "john", 
            lastname: "smith",
            role: "Physician (specialist)",

            office: {
                address1: "Akron Clinic, Downtown Plaza 1",
                address2: "Akron",
                state: "Ohio",
                zip: "44563"
            },
            email: "john.smith@gmail.com",
            phone: { phone1: {type: "office", number: "254-456-8254", ext: "234"} }, 
            provider_group_ref: this.state.provider_groupId,
            provider_group_id:  this.state.provider_groupId,
            provider_group_name: "The practice",
            custom_questions: ["5b82d459f5c2bc19fc1615bc"]
         })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    // update a provider details 
    updateProvider = event => {
        event.preventDefault();
        providerAPI.update(this.state.providerId, {
            name: {
                first: "General",
                last: "Mo",
            },
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    // Delete a provider by id
    removeProvider = event => {
        event.preventDefault();
        providerAPI.remove(this.state.providerId)
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
                Provider collection route tests
                <Form>
                    <br />
                    <Button id="a" onClick={this.loadAllProviders}> load all </Button>
                    <Button id="b" onClick={this.findOneProvider}> find one </Button>
                    <Button id="c" onClick={this.addNewProvider}> add new </Button>
                    <Button id="d" onClick={this.updateProvider}> update </Button>
                    <Button id="e" onClick={this.removeProvider}> remove </Button>
                </Form>
            </Container>

        )
    };
};

export default ProviderRouteTests;