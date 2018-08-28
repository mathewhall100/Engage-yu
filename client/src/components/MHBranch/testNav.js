import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container, Button} from 'reactstrap'


class TestNav extends Component {
    render() {
        return (

            <Container>
                <div>
                    <Link to='/test/provider'><Button>Test provider routes</Button></Link>
                    <br />
                    <Link to='/test/provider_group'><Button>Test provider group routes</Button></Link>
                    <br />
                    <Link to='/test/patient_info'><Button>Test patient_info routes</Button></Link>
                    <br />
                    <Link to='/test/patient_data'><Button>Test patient_data routes</Button></Link>
                    <br />
                    <Link to='/test/active'><Button>Test active routes</Button></Link>
                    <br />
                    <Link to='/test/question'><Button>Test question routes</Button></Link>
                    <br />
                    <Link to='/test/user'><Button>Test user routes</Button></Link>

                </div>

            </Container>
    )}
};

export default TestNav;