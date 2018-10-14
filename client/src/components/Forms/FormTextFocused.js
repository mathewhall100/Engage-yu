import React, { Component } from 'react';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField'
import DoneIcon from '@material-ui/icons/Done';


class FormTextFocused extends Component {  

    renderTextField(field) {

        const {width, meta: {dirty, touched, error}} = field;
        console.log("Field: ", field)
            return (
                <div>
                    <TextField
                        label={field.label}
                            {...field.input}    
                        margin="normal"
                        multiline={field.mutliline === true ? true : false}
                        style={{width: `${width}px`}}
                        autoFocus
                    />
                    
                    <div style={{fontSize: "13px", color: "red"}}> 
                        {touched ? error : ''}
                    </div>
                    <div style={{fontSize: "13px", color: "green"}}> 
                        {dirty && !error ? <DoneIcon /> : ''}
                    </div>

                </div>
            )
        };

    render () {

        return (

            <Field 
                name={this.props.name}
                label={this.props.label}
                width={this.props.width ? this.props.width : "250"}
                component={this.renderTextField}
                autoComplete="off"
                
            />

        )
    }
}

export default FormTextFocused;