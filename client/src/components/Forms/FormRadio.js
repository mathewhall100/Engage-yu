import React, { Component } from 'react';
import { Field } from 'redux-form';

import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import DoneIcon from '@material-ui/icons/Done';


class FormRadio extends Component {  

    renderRadioGroup(field) {
        const {input, meta: { pristine, touched, error }, children} = field
        return (
            <div>
                <br />
                <FormLabel component="legend" >{input.name}</FormLabel>
                <RadioGroup
                    {...input}
                    {...children}
                    onChange={(event, value) => input.onChange(value)}
                    style={{ display: 'flex', flexDirection: 'row'}}
                >
                    {children.map(child => 
                        <FormControlLabel 
                            key={child.props.label}
                            value={child.props.label}
                            control={<Radio />} 
                            label={child.props.label} 
                        />
                    )}
                </RadioGroup>
                    <div style={{fontSize: "13px", color: "red"}}> 
                        {touched ? error : ''}
                    </div>
                    <div style={{fontSize: "13px", color: "green"}}> 
                        {!pristine ? <DoneIcon /> : ''}
                    </div>
            </div>
        )
        
    };

    render () {

        return (

            <Field name={this.props.name} component={this.renderRadioGroup}>
                {this.props.items.map(item =>  
                    <Radio key={item.value} value={item.value} label={item.label} />
                )}
            </Field>

        )
    }
};

export default FormRadio;