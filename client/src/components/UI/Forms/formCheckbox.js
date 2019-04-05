import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { Checkbox} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const checkboxTheme = createMuiTheme({
    palette: {
        secondary: { main: '#009900' }, // This is just green.A700 as hex.
      },
    overrides: {
        MuiFormControlLabel: {
            label: {
                fontWeight: 500
            }
        }
    }
});


export default class FormCheckbox extends Component {  

    renderCheckbox(field) {
        //console.log("field: ", field);
        const {input, name, label} = field;
        
        return (
            <MuiThemeProvider theme={checkboxTheme}>
                <Checkbox
                    {...input}
                    label={label}
                    checked={input.value ? true : false}
                    onCheck={input.onChange}
                    style={{paddingLeft: 0}}
                />
            </MuiThemeProvider>
        );
    };

    render () {
        const { name, label } = this.props
        return (
            <Field
                name={name}
                component={this.renderCheckbox} 
                label={label}
            />
        );
    }
}

FormCheckbox.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.array.isRequired,
    value: PropTypes.bool
};