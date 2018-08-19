import React, { Component } from "react";
import patientAPI from "../../utils/patient.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class PatientRouteTests extends Component {

    state = {
        // test ids
        providerId: "5b733f4b0ee1d97e749c2a27", 
        patientId: "5b7269ad6a1874ea30180bc9",
    };

    componentDidMount() {
    };



    // --------------------
    // Patient routes tests
    // -------------------


    // load all patients
    loadPatientLists = event => {
        event.preventDefault();
        patientAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // find patient by Id for provider
    findOneForProvider = event => {
        event.preventDefault();
        patientAPI.findByIdForProvider(this.state.patientId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    // find patient by Id for patient
    findOneForPatient = event => {
        event.preventDefault();
        patientAPI.findByIdForPatient(this.state.patientId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    // add new patient document
    addNewPatient = event => {
        event.preventDefault();
        patientAPI.createNewPatient({
            date_enrolled: new Date(),
            enrolled_by: "5b722e30a78fe511a9bf7dd8",
            status: "active",

            patient_details: {
                hospital_id: "H123457",
                firstname: "Butch",
                lastname: "cassidy",
                dob: "07-23-1977",
                email: "butch.cassidy@theranch.com",
                phone: "216-376-2384"
            },
            primary_provider: "5b722e30a78fe511a9bf7dd8",
        })
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    // update a patients email
    updateEmail = event => {
        event.preventDefault();
        patientAPI.updateEmail(this.state.patientId, {
            email: "sundance.cassidy@thebar.com",
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    // update a patients phone
    updatePhone = event => {
        event.preventDefault();
        patientAPI.updatePhone(this.state.patientId, {
            phone: "216-678-0000",
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    // update a patients status
    updateStatus = event => {
        event.preventDefault();
        patientAPI.updateStatus(this.state.patientId, {
            status: "inactive",
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

    // update a patients name
    updateName = event => {
        event.preventDefault();
        patientAPI.updateName(this.state.patientId, {
            firstname: "Prescilla",
            lastname: "Desertqueen"
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
        patientAPI.newEpisode(this.state.patientId, {

            episode_number: 10,
            start_date: new Date(),
            num_days: 5,
            end_date: new Date(), 
            requesting_provider: "5b722e30a78fe511a9bf7dd8" , 
            report_to: [ "5b722e30a78fe511a9bf7dd8" ],  
            num_questions: 5,
            questions: ["on", "off", "on, non-troubling dyskinesia", "on, troubling dyskinesia", "asleep"],
            timeframe: { 
                start_time: "0800",
                end_time: "1200",
                interval_mins: 60,
                margin_mins: 15,
            },  
            remind: {
                reminder: "on",
            },
            expected_num_records: 25,
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
        patientAPI.addRecord(this.state.patientId, {
                record_number: 10,
                day: 1,
                time: "0900",
                scheduled_datetime:  new Date(),  
                record_valid: true,
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
                Patient collection tests
                <Form>
                    <br />
                    <Button id="f" onClick={this.loadPatientLists}> load all </Button>
                    <Button id="g" onClick={this.findOneForProvider}> find one provider</Button>
                    <Button id="h" onClick={this.findOneForPatient}> find one patient</Button>
                    <Button id="i" onClick={this.addNewPatient}> add new </Button>
                    <Button id="j" onClick={this.updateEmail}> update email</Button> 
                    <Button id="k" onClick={this.updatePhone}> update phone</Button> 
                    <Button id="l" onClick={this.updateStatus}> update status</Button> 
                    <Button id="m" onClick={this.updateName}> update name</Button> 
                    <Button id="n" onClick={this.createEpisode}> new episode</Button> 
                    <Button id="o" onClick={this.addRecord}> addRecord</Button> 
                </Form>
            </Container>

        )
    };
};

export default PatientRouteTests;