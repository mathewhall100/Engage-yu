import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { FormControlLabel, Radio, RadioGroup} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import FormLabel from '@material-ui/core/FormLabel';
// import DoneIcon from '@material-ui/icons/Done';


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
});


export default class FormRadio extends Component {  

    RenderRadioGroup(field) {
        //console.log("field: ", field);
        const {input, children} = field;
        // const {meta: { pristine } } = field
        
        return (
            <React.Fragment>
                {/* {formLabel && <FormLabel component="legend" >{formLabel}</FormLabel> } */}
                <MuiThemeProvider theme={radioTheme}>
                    <RadioGroup
                        {...input}
                        // {...children}
                        onChange={(value) => input.onChange(value)}
                        style={{ display: 'flex', flexDirection: 'row', alignItems: "right", justifyContent: "right", color: "black" }}
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

                {/* <span style={{position: "relative", left: "180px", top: "-40px"}}> 
                        {!pristine ? <DoneIcon style={{fontSize: "28px", color: "green"}} /> : ''}
                </span> */}

            </React.Fragment>
        );
    };

    render () {
        const { name, items } = this.props
        return (
            <Field 
                name={name} 
                //formLabel={formLabel}
                component={this.RenderRadioGroup}
                >
                    {items.map(item =>  
                        <Radio key={item.value} value={item.value} label={item.label} />
                    )}
            </Field>
        );
    }
}

FormRadio.PropTypes = {
    name: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
};



