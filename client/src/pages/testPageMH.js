import React, { Component } from "react";
import provider from "../utils/provider.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class TestRoutes extends Component {

    state = {
        id: "5ac93b9bbddfdc49cc7e66d5", // test id only
    };

    componentDidMount() {
        //this.loadAllProviders();

    };

    // --------------------
    // Provider routes tests
    // --------------------

    // load all providers
    loadAllProviders = () => {
        provider.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => console.log(err));
    };



    // ------
    // Render
    // ------

    render() {
        return (

            <Container>
                <Form>
                    <br />

                    <Button onClick={this.loadAllProviders()}>Make test API call</Button>
                </Form>
            </Container>

        )
    };
};

export default TestRoutes;


