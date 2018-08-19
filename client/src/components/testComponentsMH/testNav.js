import React, { Component } from "react";
import { Link } from 'react-router-dom';
//import { Button} from 'reactstrap'


class TestNav extends Component {
    render() {
        return (
        <div>
            <Link to='/test/all'>Test All</Link>
            <br />
            <Link to='/test/provider'>Test provider routes</Link>
            <br />
            <Link to='/test/patient'>Test patient routes</Link>
            <br />
            <Link to='/test/active'>Test active routes</Link>
            <br />
            <Link to='/test/questions'>Test question routes</Link>
        </div>
    )}
};

export default TestNav;