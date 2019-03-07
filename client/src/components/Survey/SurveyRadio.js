import React, { Component } from 'react';
import { Field } from 'redux-form';

import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';


class SurveyRadio extends Component {  
    
    renderRadioGroup(field) {
        
        const {title, input, meta: { pristine, touched, error }, children} = field 

        return (
            <div>
                <br />
                <FormLabel component="legend" >{title}</FormLabel>
                <RadioGroup
                    {...input}
                    {...children}
                    onChange={(event, value) => input.onChange(value)}
                    style={{ display: 'flex', flexDirection: 'row'}}
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
            </div>
        )
        
    };

    render () {

        return (

            <Field name={this.props.name} component={this.renderRadioGroup} title={this.props.title}>
                {this.props.items.map(item =>  
                    <Radio key={item.value} value={item.value} label={item.label} />
                )}
            </Field>

        )
    }
};

export default SurveyRadio;