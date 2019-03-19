import React, { PureComponent } from 'react' ;
import { Link } from 'react-router-dom'

export default class NotAuthenticated extends PureComponent {
    render () {
        return(
            <div>
                You are not authenticated to view this page. Please log in <Link to='/'>here.</Link>
            </div>
        );
    }
}