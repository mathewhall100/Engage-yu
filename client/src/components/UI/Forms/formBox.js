import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
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
                        onBlur={() => {return false}}
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
            );
        }

    render () {
        const { name, label, rows } = this.props
        return (
            <Field 
                name={name}
                label={label}
                rows={rows}
                component={this.renderTextField}
                autoComplete="off"
            />
        );
    }
}

FormBox.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    rows: PropTypes.string.isRequired,
}