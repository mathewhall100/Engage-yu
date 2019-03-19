import React, { PureComponent } from 'react' ;
import { Link } from 'react-router-dom'

export default class NotFound extends PureComponent {
    render () {
        return(
            <div>
                Page not found. Go to homepage <Link to='/'>here</Link> 
            </div>
        );
    }
}