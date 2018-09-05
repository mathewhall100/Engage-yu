import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import { enrollNewPatient } from '../../actions';

const styles = ({
    submitBtn: {
        marginRight: 20,
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        hover: {},
    },

    cancelBtn: ({
        marginRight: 20,
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    }),

    cancelLnk: {
        textDecoration: "none",
    },

});

class Enroll extends Component {

    renderField(field) {
        const { meta: {touched, error } } = field;  // Object destructuring to make classname calls easier.
        const className=`form-group ${touched && error ? 'has-danger' : ''}`

        return (
            <div className="form-group has-danger">     
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help">
                    {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        // 'values' contains validated entries of form for use elsewhere, sending to backend etc.
        console.log("Values: ", values);   
    }

    render() {
        const { handleSubmit } = this.props;
        const { classes } = this.props;

        return (
            <div>
                EnrollNew!
                <br /><br />

                <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                    
                    <div>
                        <Field
                            label="Title"
                            name="title"
                            component={this.renderField}
                            placeholder="Title"
                        />
                    </div>

                    <br />
                     <Field
                        label="Categories"
                        name="categories"
                        component={this.renderField}
                    />
                    <br />
                    <Field
                        label="Content"
                        name="content"
                        component={this.renderField}
                    />
                    <br />
                    <Button type="submit" className={classes.submitBtn}>Submit</Button>
                    <Link to='/admin' className={classes.cancelLnk}><Button className={classes.cancelBtn}>Cancel</Button></Link>

                </form>

            </div>


        );
    }
}

function validate(values) {
    console.log(values) // -> { object containing all values of form entries } 
    const errors = {};

    // validate inputs from 'values'
    if (!values.title || values.title.length <3 ) {
        errors.title = "Please enter a valid title!";   // message to be displayed if invalid
    }

    if (!values.categories) {
        errors.categories = "Please enter a category!";   // message to be displayed if invalid
    }

    if (!values.content) {
        errors.content = "Please enter some content!";   // message to be displayed if invalid
    }

    // If errors is empty, then form good to submit
    // If errors has enay properties, redux form assumes form is invalid
    return errors;

}

export default reduxForm ({
        validate, form: 'EnrollNewPatientForm' // unique identifier for this form
    })(
        connect(null,{ enrollNewPatient }
    )(
        withStyles(styles)(Enroll)
));