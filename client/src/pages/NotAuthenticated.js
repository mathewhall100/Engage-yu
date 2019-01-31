import React, { PureComponent } from 'react' ;

export default class NotAuthenticated extends PureComponent {
    render () {
        return(
            <div>
                You are not authenticated to view this page. Please log in here.
            </div>
        );
    }
}