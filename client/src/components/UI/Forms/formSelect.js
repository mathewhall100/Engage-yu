import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { FormControl, InputLabel, MenuItem, Select} from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';


export default class FormSelect extends Component {  

    renderSelect(field) {
        const {input, label, width, helpText, meta: { error, dirty, touched }, children, ...custom} = field;

        return (
            <FormControl style={{width: `${width}px`}}>
            
                <InputLabel>{label}</InputLabel> 
                <Select
                    {...input}
                    onSelect={(value) => input.onChange(value) }
                    children={children}
                    {...custom}
                >
                </Select>

                {helpText && dirty && !error && <span style={{position: "relative", left: `${width}px`, top: '-28px'}}> 
                    &nbsp;&nbsp;<DoneIcon style={{fontSize: "28px", color: "green"}}/>
                </span> }

                {helpText && <span style={{fontSize: "13px", color: "red", marginTop: "8px"}}> 
                    {touched ? error : ''}
                </span> }

            </FormControl>
        );
    }

    render () {
        const { items, name, label, width="250", helpText=true} = this.props;
        return (
            <Field 
                name={name} 
                label={label}
                width={width}
                helpText={helpText}
                component={this.renderSelect} 
            >
                {items.map(item => 
                   <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
                )}
            </Field>
        );
    }
}

FormSelect.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    helpText: PropTypes.bool,
    items: PropTypes.array.isRequired
};

