import React, { Component } from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField'


export default class FormBox extends Component {  

    renderTextField(field) {
        //console.log("Field: ", field)

        const {label, rows, meta: {submitting, error}} = field;

            return (
                <React.Fragment>

                    <TextField
                        type="text"
                        variant="outlined"
                        rows={rows}
                        multiline
                        label={label}
                        {...field.input}  
                        style={{width: "100%", fontSize: "14px", marginTop: "10px"}} 
                    />

                    <div style={{fontSize: "13px", color: "red"}}> 
                        {submitting ? error : ''}
                    </div>

                </React.Fragment>
            )
        };

    render () {
        return (
            <Field 
                name={this.props.name}
                label={this.props.label}
                rows={this.props.rows}
                component={this.renderTextField}
                autoComplete="off"
            />
        )
    }
}