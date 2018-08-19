import React, { Component } from "react";
import providerAPI from "../../utils/provider.js";
import patientAPI from "../../utils/patient.js";
import activeAPI from "../../utils/active.js";
import question_customAPI from "../../utils/question_custom.js";
import question_defaultAPI from "../../utils/question_default.js";


import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class TestAllRoutes extends Component {

    state = {
        // test ids
        providerId: "5b733f4b0ee1d97e749c2a27", 
        patientId: "5b7269ad6a1874ea30180bc9",
        activeId: "5b733f4c0ee1d97e749c2a29",
        question_customId: "5b74444dc51e8327080092cd"
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



    // --------------------
    // Question_custom routes tests
    // --------------------



    // load all custom questions
    loadAllCustomQuestions = event => {
        event.preventDefault();
        question_customAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    
    // add a new custom question
    addNewCustomQuestion = event => {
        event.preventDefault();
        question_customAPI.create({
            date_added: new Date(),
            added_by: "5b733f4b0ee1d97e749c2a28",
            question: "Do you have nausea or sickness?",
            answers: [ "no", "yes, mild", "yes, troubling", "yes, severe", "asleep"] ,
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    // Delete a question from the custom question collection by id
    removeCustomQuestion = event => {
        event.preventDefault();
        question_customAPI.remove(this.state.question_customId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


     // --------------------
    // Question_default routes tests
    // --------------------



    // load default questions
    loadDefaultQuestions = event => {
        event.preventDefault();
        question_defaultAPI.findAll({})
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

                <Container>
                    <br />
                    Question_custom collection tests
                    <Form>
                        <br />
                        <Button id="u" onClick={this.loadAllCustomQuestions}> load all </Button>
                        <Button id="v" onClick={this.addNewCustomQuestion}> add new </Button>
                        <Button id="w" onClick={this.removeCustomQuestion}> remove </Button>
                    </Form>
                </Container>

                                <Container>
                    <br />
                    Question_deafult collection tests
                    <Form>
                        <br />
                        <Button id="x" onClick={this.loadAllDefaultQuestions}> load all </Button>

                    </Form>
                </Container>

            </Container>

        )
    };
};

export default TestAllRoutes;


