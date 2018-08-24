import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Button} from 'reactstrap'


class QuestionNav extends Component {
    render() {
        return (

                <div>
                    <Link to='/test/question/custom'><Button>Test custom question routes</Button></Link>
                    <br />
                    <Link to='/test/question/default'><Button>Test default question routes</Button></Link>
                </div>
    )}
};

export default QuestionNav;         