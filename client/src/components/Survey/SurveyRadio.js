import React, { Component } from 'react';
import { Field } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const radioTheme = createMuiTheme({
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
})


export default class FormRadio extends Component {  

    renderRadioGroup(field) {
        console.log(field)

        const { input, evenSpace, children } = field
        
        return (
            <MuiThemeProvider theme={radioTheme}>
                <RadioGroup
                    {...input}
                    {...children}
                    onChange={(value) => input.onChange(value)}
                    style={{ display: 'flex', flexDirection: 'row', justifyContent: evenSpace ? "space-between" : null}}
                >
                    {children.map(child => 
                        <FormControlLabel 
                            key={child.props.label}
                            value={child.props.value}
                            control={<Radio />} 
                            label={child.props.label} 
                            checked={input.checked}
                        />
                    )}
                </RadioGroup>
            </MuiThemeProvider>
        )
    };

    render () {
        return (
            <Field 
                name={this.props.name} 
                label={this.props.label}
                component={this.renderRadioGroup} 
                evenSpace={this.props.evenSpace}
                >
                    {this.props.items.map(item =>  
                        <Radio key={item.value} value={item.value} label={item.label}/>
                    )}
                   
            </Field>
        )
    }
};