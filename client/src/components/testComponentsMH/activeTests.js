import React, { Component } from "react";
import activeAPI from "../../utils/active.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class  ActiveRouteTests extends Component {

    state = {
        // test ids
        activeId: "5b733f4c0ee1d97e749c2a29",

    };

    componentDidMount() {
    };



    // --------------------
    // Active routes tests
    // --------------------



    // load all active
    loadAllActive = event => {
        event.preventDefault();
        activeAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    // find single active by id
    findOneActive = event => {
        event.preventDefault();
        activeAPI.findById(this.state.activeId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

        // add a new provider
        addNewActive = event => {
            event.preventDefault();
            activeAPI.create({
                firstname: "Sally",
                lastname: "Kidstone",
                hospital_id: "H3453736",
                patient_id: "5b7311026b0e10f62ca85be5",
                episode_number: 1,
                episode_id: "5b7311526b0e10f62ca85be8",
                requesting_provider_firstname: "John",
                requesting_provider_lastname: "Heyworth",
                requesting_provider_id: "5b733f4b0ee1d97e749c2a27",
                primary_provider_firstname: "John",
                primary_provider_lastname: "Heyworth",
                primary_provider_id: "5b733f4b0ee1d97e749c2a27",
                start_date: new Date(),
                start_time: "0800",
                end_date: new Date(),
                end_time: "1400",
                last_entry: new Date()
            })
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
        };

    // update active last entry
    updateActive = event => {
        event.preventDefault();
        activeAPI.update(this.state.activeId, {
            last_entry: new Date()
        })
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
                Active collection tests
                <Form>
                    <br />
                    <Button id="p" onClick={this.loadAllActive}> load all </Button>
                    <Button id="q" onClick={this.findOneActive}> find one </Button>
                    <Button id="r" onClick={this.addNewActive}> add new </Button>
                    <Button id="s" onClick={this.updateActive}> update </Button>
                    <Button id="t" onClick={this.removeActive}> remove </Button>
                </Form>
            </Container>

        )
    };
};

export default ActiveRouteTests;


