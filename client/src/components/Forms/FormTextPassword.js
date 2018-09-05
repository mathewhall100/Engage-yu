import React, { Component } from 'react';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField'
import DoneIcon from '@material-ui/icons/Done';


class FormTextPassword extends Component {  

    renderTextField(field) {
    const {meta: {touched, error}} = field;
        return (
            <div>
                <TextField
                    label={field.label}
                        {...field.input}    
                    margin="normal"
                    style={{width: "250px"}}
                    type="password"
                    autoComplete="current-password"
                />
                
                <div style={{fontSize: "13px", color: "red"}}> 
                    {touched ? error : ''}
                </div>
                <div style={{fontSize: "13px", color: "green"}}> 
                    {touched && !error ? <DoneIcon /> : ''}
                </div>

            </div>
        )
    };

    render () {

        return (

            <Field 
                name={this.props.name}
                label={this.props.label}
                component={this.renderTextField}
                
            />

        )
    }
}

export default FormTextPassword;