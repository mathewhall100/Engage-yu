import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPatients } from '../actions/index';

import { Container, Form, Button } from 'reactstrap';

class FetchAll extends Component {

    componentDidMount() {
        console.log("auto-load patients")
        this.props.fetchPatients()
    }

    onClicked = event => {
         event.preventDefault();
        this.props.fetchPatients()
    }


    render() {
        return (

            <Container>
                <br />

                <Form>
                    <br />
                    <Button id="f" onClick={this.onClicked}> Load Patients </Button>
                </Form>
            </Container>

        )
    }
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchPatients}, dispatch);
}

export default connect(null, mapDispatchToProps) (FetchAll)