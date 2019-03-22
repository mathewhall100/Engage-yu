import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default class FormStreamTextInput extends PureComponent {  

    onChange = (value) => {
         //console.log("onchange: ", value);
         this.props.handleChange(value);
    };

    renderTextField(field) {
        const {name, label, width, input, custom} = field;
        return (
            <TextField
                value={name}
                label={label}
                {...input}
                {...custom}
                style={{width: `${width}px`}}
            />
        );
    }

    render () {
        const { name, label, width="250" } = this.props;
        return (
            <Field 
                name={name}
                label={label}
                width={width}
                component={this.renderTextField}
                onChange={(event, value) => this.onChange(value)}
                autoComplete="off"
            />
        );
    }
}

FormStreamTextInput.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
};
