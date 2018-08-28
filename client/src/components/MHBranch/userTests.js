import React, { Component } from "react";
import userAPI from "../../utils/user.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class  UserRouteTests extends Component {

    state = {
        // test ids
        sub: "google1",

    };

    componentDidMount() {
    };



    // --------------------
    // Active routes tests
    // --------------------


    // find single active by id
   userLookup = event => {
        event.preventDefault();
        userAPI.userLookup(this.state.sub)
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
                User Collection tests
                <Form>
                    <br />
                    <Button id="q" onClick={this.userLookup}> find one </Button>
                </Form>
            </Container>

        )
    };
};

export default UserRouteTests;


