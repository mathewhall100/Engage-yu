import React, { Component } from "react";
import providerAPI from "../utils/provider.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class TestRoutes extends Component {

    state = {
        providerId: "5b7103902c5321033de5fd12", // test id only
    };

    componentDidMount() {
        //this.loadAllProviders();

    };

    // --------------------
    // Provider routes tests
    // --------------------

    // load all providers
    loadAllProviders = event => {
        event.preventDefault();
        providerAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => console.log(err));
    };

    
    // find single provider by id
    findOneProvider = event => {
        event.preventDefault();
        providerAPI.findById(this.state.providerId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => console.log(err));
    };


    // add a new provider
    addNewProvider = event => {
        event.preventDefault();
        providerAPI.create({
        name: {
            first: "Peter", 
            last: "Willis",
        },
        role: { 
            role: "Physician (specialist)" 
        },
        office: {
            address1: "Cleveland Clinic, Downtown Plaza 1",
            address2: "Cleveland",
            state: "Ohio",
            zip: "44563"
        },
        email: "peter.thegreat@gmail.com",
        phone: "254-456-8254"
    })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => console.log(err));
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
        .catch(err => console.log(err));
    };


    // Delete a provider by id
    removeProvider = event => {
        event.preventDefault();
        providerAPI.remove(this.state.providerId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => console.log(err));
    };




    // ------
    // Render
    // ------

    render() {
        return (

            <Container>

                <Container>
                    <br />
                    Provider collection tests
                    <Form>
                        <br />
                        <Button id="a" onClick={this.loadAllProviders}> load all </Button>
                        <Button id="b" onClick={this.findOneProvider}> find one </Button>
                        <Button id="c" onClick={this.addNewProvider}> add new </Button>
                        <Button id="d" onClick={this.updateProvider}> update </Button>
                        <Button id="e" onClick={this.removeProvider}> remove </Button>
                    </Form>
                </Container>

            </Container>

        )
    };
};

export default TestRoutes;


