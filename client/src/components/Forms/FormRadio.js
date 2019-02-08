import React, { Component } from 'react';
import { Field } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DoneIcon from '@material-ui/icons/Done';


export default class FormRadio extends Component {  

    renderRadioGroup(field) {
        console.log(field)

        const {input, formLabel, meta: { pristine }, children} = field
        
        return (
            <React.Fragment>
                {/* {formLabel && <FormLabel component="legend" >{formLabel}</FormLabel> } */}
                <RadioGroup
                    {...input}
                    {...children}
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

                <span style={{position: "relative", left: "180px", top: "-40px"}}> 
                        {!pristine ? <DoneIcon style={{fontSize: "28px", color: "green"}} /> : ''}
                </span>

            </React.Fragment>
        )
        
    };

    render () {
        return (
            <Field 
                name={this.props.name} 
                formLabel={this.props.formLabel}
                component={this.renderRadioGroup}
                >
                    {this.props.items.map(item =>  
                        <Radio key={item.value} value={item.value} label={item.label} />
                    )}
            </Field>
        )
    }
};


