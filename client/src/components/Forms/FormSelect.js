import React, { Component } from 'react';
import { Field } from 'redux-form';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import DoneIcon from '@material-ui/icons/Done';


export default class FormSelect extends Component {  

    renderSelect(field) {
        console.log(field)

        const {input, label, width, meta: { pristine }, children, ...custom} = field

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

                    <span style={{position: "relative", left: "220px", top: "-30px"}}> 
                        {!pristine ? <DoneIcon style={{fontSize: "28px", color: "green"}}/> : ''}
                    </span>

                </FormControl>
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
