import React, { Component }  from 'react';
import PropTypes, { props } from 'prop-types';
import { Field } from 'redux-form';

import TextField from '@material-ui/core/TextField';


class FormDatePicker extends Component {

    renderDatePicker(field) {

        const  {meta: {touched, error}, value, disabled} = field;

        return (
            
            <div>
                <TextField
                    {...field.input}
                    type="date"
                    style={{margin: "7px 0 0 -8px", fontSize: "11px", fontWeight: 500}}
                    disabled={disabled}
                    value={disabled ? "" : value}
                    InputProps={{
                        disableUnderline: true,
                        
                       }}
                />
                 <div style={{fontSize: "13px", color: "red"}}> 
                        {touched ? error : ''}
                </div>
            </div>
        );
    }

    render () {

        return (
            <Field 
                name={this.props.name}
                label={this.props.label}
                disabled={this.props.disabled}
                component={this.renderDatePicker}
            />
        )
    };
    
}

// FormDatePicker.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default FormDatePicker;