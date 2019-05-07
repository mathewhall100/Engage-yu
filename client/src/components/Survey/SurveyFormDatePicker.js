import React, { Component }  from 'react';
//import PropTypes, { props } from 'prop-types';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField';


class SurveyFormDatePicker extends Component {

    renderDatePicker(field) {

        const  {meta: {touched, error}, value, disabled} = field;

        return (
            
            <div style={{display: disabled ? "none" : "block"}}>
                <TextField
                    {...field.input}
                    type="date"
                    style={{margin: "7px 0 0 -4px", fontSize: "11px"}}
                    disabled={disabled}
                    value={value}
                    InputProps={{
                       underline: true,
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

// SurveyFormDatePicker.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default SurveyFormDatePicker;