import React, { Component } from 'react';
import { Field } from 'redux-form';

import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Checkbox from '@material-ui/core/Checkbox'
import DoneIcon from '@material-ui/icons/Done';


class SurveyCheckbox extends Component {  

    renderSurveyCheckbox(field) {
        const {input, label} = field
        console.log(field)
        return (
            <div>
                <br />
                <FormLabel component="legend" >{input.name}</FormLabel>
                <Checkbox
                    {...input}
                    label={label}
                     {...input}
                    onChange={(event, value) => input.onChange(value)}
                />
            </div>
        )
        
    };

    render () {

        return (

            <Field name={this.props.name} component={this.renderSurveyCheckbox} label={this.props.label}>
                
                )}
            </Field>

        )
    }
};

export default SurveyCheckbox;