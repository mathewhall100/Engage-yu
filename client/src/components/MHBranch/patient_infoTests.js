import React, { Component } from "react";
import patient_infoAPI from "../../utils/patient_info.js";

import { Container } from "reactstrap";
import { Button, Form,} from 'reactstrap'


class Patient_infoRouteTests extends Component {

    state = {
        // test refs & ids
        patientId: "5b844945d8dc5ce848cd28a3",
        providerId: "5b844946d8dc5ce848cd28a4", 
        providerGroupId: "5b844946d8dc5ce848cd28a6",
        searchterm: "Butch"
    };

    componentDidMount() {
    };



    // --------------------
    // Patient routes tests
    // -------------------


    // load all patients
    loadPatientList = event => {
        event.preventDefault();
        patient_infoAPI.findAll({})
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // load all patients by provider
    loadPatientsByProvider = event => {
        event.preventDefault();
        console.log("provider id: ", this.state.providerId)
        patient_infoAPI.findAllByProvider(this.state.providerId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };


    // load all patients by provider group
    loadPatientsByProviderGroup = event => {
    event.preventDefault();
    patient_infoAPI.findAllByGroup(this.state.providerGroupId)
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };


    // find patient by Id for provider
    findOneById = event => {
        event.preventDefault();
        patient_infoAPI.findById(this.state.patientId)
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    // find patient by searchterm
    findBySearchterm = event => {
        event.preventDefault();
        patient_infoAPI.findBySearchterm({
            firstname: this.state.searchterm
            })
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
    };

    // add new patient document
    addNewPatient = event => {
        event.preventDefault();
        patient_infoAPI.createNewPatient({
            date_enrolled: new Date(),
            enrolled_by_ref: this.state.providerId,
            enrolled_by_id: this.state.providerId,
            enrolled_by_name: "john heyworth",

            patient_data_ref: "5b82d459f5c2bc19fc1615bd",
            patient_data_id: "objId10",
            status: "active",

            hospital_id: "H1236757",
            firstname: "Butch",
            lastname: "cassidy",
            dob: "07-23-1977",
            email: "butch.cassidy@theranch.com",
            phone: "216-376-2384",

            primary_provider_ref: this.state.providerId,
            primary_provider_id: this.state.providerId,
            primary_provider_name: "John heyworth",

            provider_group_ref: this.state.providerGroupId,
            provider_group_id: this.state.providerGroupId,
            provider_group_name: "the cleveland practice"
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
        patient_infoAPI.updateEmail(this.state.patientId, {
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
        patient_infoAPI.updatePhone(this.state.patientId, {
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
        patient_infoAPI.updateStatus(this.state.patientId, {
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
        patient_infoAPI.updateName(this.state.patientId, {
            firstname: "Prescilla",
            lastname: "Desertqueen"
        })
        .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
        })
    };

        // update a patients provider
        updateProvider = event => {
            event.preventDefault();
            patient_infoAPI.updateProvider(this.state.patientId, {
                primary_provider_ref: this.state.providerId,
                primary_provider_id: this.state.providerId,
                primary_provider_name:  "john heyworth"
            })
            .then(res => console.log("res.data: " + JSON.stringify(res.data, null, 2 )))
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
            })
        };
    
        // update a patients provider group
        updateProviderGroup = event => {
            event.preventDefault();
            patient_infoAPI.updateProviderGroup(this.state.patientId, {
                provider_group_ref: this.state.providerGroupId,
                provider_group_id:  this.state.providerGroupId,
                provider_group_name:  "The cleveland practices",
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
                Patient_info collection tests
                <Form>
                    <br />
                    <Button id="f" onClick={this.loadPatientList}> load all </Button>
                    <Button id="f2" onClick={this.loadPatientsByProvider}> load all by provider </Button>
                    <Button id="f3" onClick={this.loadPatientsByProviderGroup}> load all by provider group</Button>
                    <Button id="g" onClick={this.findOneById}> find one by id</Button>
                    <Button id="h" onClick={this.findBySearchterm}> search</Button>
                    <Button id="i" onClick={this.addNewPatient}> add new </Button>
                    <Button id="j" onClick={this.updateEmail}> update email</Button> 
                    <Button id="k" onClick={this.updatePhone}> update phone</Button> 
                    <Button id="l" onClick={this.updateStatus}> update status</Button> 
                    <Button id="m" onClick={this.updateName}> update name</Button> 
                    <Button id="m" onClick={this.updateProvider}> update primary provider</Button> 
                    <Button id="m" onClick={this.updateProviderGroup}> update provider group</Button> 
                </Form>
            </Container>

        )
    };
};

export default Patient_infoRouteTests;