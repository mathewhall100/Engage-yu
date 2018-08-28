import React, { Component } from "react";
import activeAPI from "../../utils/active.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class  ActiveRouteTests extends Component {

    state = {
        // test ids
        patientId: "5b844945d8dc5ce848cd28a2",
        activeId: "5b847607b352ed3d343d6741",
        patientDataId: "5b844944d8dc5ce848cd289f",
        //episideId: "5b844946d8dc5ce848cd28a4",
        providerId: "5b844946d8dc5ce848cd28a4",
        groupId: "5b844946d8dc5ce848cd28a6",

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
                patient_info_ref: this.state.patientId,
                patient_info_id: this.state.patientId,
                firstname: "Butch",
                lastname: "cassidy",
                hospital_id: "H3453736",
                patient_data_ref: this.state.patientDataId,
                patient_data_id: this.state.patientDataId,
                episode_number: "1",
                episode_id: "5b7311526b0e10f62ca85be8",
            
                requesting_provider_ref: this.state.providerId,
                requesting_provider_id: this.state.providerId,
                requesting_provider_firstname: "John",
                requesting_provider_lastname: "Heyworth",
                
                primary_provider_ref: this.state.providerId,
                primary_provider_id: this.state.providerId,
                primary_provider_firstname: "John",
                primary_provider_lastname: "Heyworth",
                
                provider_group_ref: this.state.groupId, 
                provider_group_id: this.state.groupId, 
                provider_group_name: "The Cleveland Practice",
               
                start_date: new Date(),
                start_time: "0800",
                end_date: new Date(),
                end_time: "1400",
                last_entry: new Date(),
                num_entries: 0,
            
                status: "pending",
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
                </Form>
            </Container>

        )
    };
};

export default ActiveRouteTests;


