import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button} from 'reactstrap'


class TestNav extends Component {
    render() {
        return (
        <div>
            <Link to='/test/all'><Button>Test All</Button></Link>
            <br />
            <Link to='/test/provider'><Button>Test provider routes</Button></Link>
            <br />
            <Link to='/test/patient'><Button>Test patient routes</Button></Link>
            <br />
            <Link to='/test/active'><Button>Test active routes</Button></Link>
            <br />
            <Link to='/test/questions'><Button>Test question routes</Button></Link>
        </div>
    )}
};

export default TestNav;