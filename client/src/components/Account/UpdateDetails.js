import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
// import { withStyles } from '@material-ui/core';
import { validatePassword } from '../../logic/formValidations';

// const styles = theme => ({

// })


class AccountUpdateDetails extends Component {

    render() {
        // const { classes } = this.props;

        return (
            <div>
                Update details
            </div>
        )
    }
}

const validate = (values) => {
    //console.log("Error values: ", values) 
    const errors = {};
    // validate inputs from 'values'
    errors.password = validatePassword(values.password) 
    //console.log("Errors: ", errors)
    return errors;
}

const formData = {
    form: 'ChangePassswordForm', //unique identifier for this form 
    validate
}

AccountUpdateDetails = reduxForm(formData)(AccountUpdateDetails)
// AccountUpdateDetails = withStyles(styles)(AccountUpdateDetails)
export default AccountUpdateDetails