import React, { Component } from "react";
import patient_dataAPI from "../../utils/patient_data.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class Patient_dataRouteTests extends Component {

    state = {
        // test ids
        patient_dataId: "5b844944d8dc5ce848cd28a0",
        patient_infoId: "5b847322b352ed3d343d672a",
        ProviderId: "5b844946d8dc5ce848cd28a5", 
    };

    componentDidMount() {
    };



    // --------------------
    // Patient routes tests
    // -------------------


    // find patient by Id for provider
    findOneById = event => {
        event.preventDefault();
        patient_dataAPI.findById(this.state.patient_dataId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // add new patient document
    addNewPatient_data = event => {
        event.preventDefault();
        patient_dataAPI.createNewPatient({
            patient_info_id: this.state.patient_infoId,
        })
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

   

    // create a new episode
    createEpisode = event => {
        event.preventDefault();
        patient_dataAPI.newEpisode(this.state.patient_dataId, {
            episode_number: 10,
            requesting_provider_ref: this.setState.providerId , 
            requesting_provider_id: this.state.providerID, 
            requesting_provider_lastname: "heyworth",
            requesting_provider_firstname: "john", 

            start_date: new Date(),
            end_date: new Date(),             
            num_days: 5,
            start_time: "0800",
            end_time: "1200",
            interval_mins: 35,
            margin_mins: 15,
        
            num_questions: 5,
            questions: ["on", "off", "on, non-troubling dyskinesia", "on, troubling dyskinesia", "asleep"],

            expected_num_records: 25,

            remind_sataus: 'on',
            
            report_to: [ this.state.providerId ],  
            
           
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    // add a new record
    addRecord = event => {
        event.preventDefault();
        patient_dataAPI.addRecord(this.state.patient_dataId, {
                record_number: 10,
                day: 1,
                time: "0900",
                scheduled_datetime:  new Date(),  
                valid: true,
                medication_adherance: "yes",
                actual_datetime: new Date(),
                data: [1,0,0,0,0]
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
                Patient_data collection tests
                <Form>
                    <br />
                    <Button id="g" onClick={this.findOneById}> find one </Button>
                    <Button id="i" onClick={this.addNewPatient_data}> add new </Button>
                    <Button id="n" onClick={this.createEpisode}> new episode</Button> 
                    <Button id="o" onClick={this.addRecord}> addRecord</Button> 
                </Form>
            </Container>

        )
    };
};

export default Patient_dataRouteTests;