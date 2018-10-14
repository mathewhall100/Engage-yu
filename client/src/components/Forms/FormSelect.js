import React, { Component } from 'react';
import { Field } from 'redux-form';

import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DoneIcon from '@material-ui/icons/Done';


class FormSelect extends Component {  

    renderSelect(field) {
        const {input, label, width, meta: { pristine, touched, error }, children, ...custom} = field
        return (

            <div>
                <FormControl style={{width: `${width}px`}}>
                    <InputLabel>{label}</InputLabel> 
                    <Select
                        {...input}
                        onSelect={(event, index, value) => input.onChange(value)}
                        children={children}
                        {...custom}
                    >
                    </Select>

                    <div style={{fontSize: "13px", color: "red"}}> 
                        {touched ? error : ''}
                    </div>
                    <div style={{fontSize: "13px", color: "green"}}> 
                        {!pristine ? <DoneIcon /> : ''}
                    </div>

                </FormControl>
            </div>
        )
        
    };


    render () {

        return (

            <Field 
                name={this.props.name} 
                component={this.renderSelect} 
                label={this.props.label}
                width={this.props.width ? this.props.width : "250"}
            >
                {this.props.items.map(item => 
                   <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                )}
            </Field>

        )
    }
};

export default FormSelect;