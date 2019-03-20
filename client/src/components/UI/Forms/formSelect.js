import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';


export default class FormSelect extends Component {  

    renderSelect(field) {
        //console.log("field: ", field);
        const {input, label, width, meta: { error, dirty, touched }, children, ...custom} = field;

        return (
            <FormControl style={{width: `${width}px`}}>
            
                <InputLabel>{label}</InputLabel> 
                <Select
                    {...input}
                    onSelect={(value) => input.onChange(value)}
                    children={children}
                    {...custom}
                >
                </Select>

                {dirty && !error && <span style={{position: "relative", left: `${width}px`, top: '-28px'}}> 
                    &nbsp;&nbsp;<DoneIcon style={{fontSize: "28px", color: "green"}}/>
                </span> }

                <span style={{fontSize: "13px", color: "red", marginTop: "8px"}}> 
                    {touched ? error : ''}
                </span>

            </FormControl>
        );
    }

    render () {
        const { items, name, label, width="250" } = this.props;
        return (
            <Field 
                name={name} 
                label={label}
                width={width}
                component={this.renderSelect} 
            >
                {items.map(item => 
                   <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                )}
            </Field>
        );
    }
}

FormSelect.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired
};

