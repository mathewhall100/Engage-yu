import React, { PureComponent } from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField'


export default class StreamTextInput extends PureComponent {  

     onChange = (value) => {
         console.log("onchange: ", value)
         this.props.handleChange(value)
     }

    renderTextField(field) {
        const {name, label, width, input, custom} = field;
        return (
            <TextField
                value={name}
                label={label}
                {...input}
                {...custom}
                style={{width: `${width}px`}}
            />
        )
    };

    render () {
        return (
            <Field 
                name={this.props.name}
                label={this.props.label}
                width={this.props.width ? this.props.width : "250"}
                component={this.renderTextField}
                onChange={(event, value) => this.onChange(value)}
                autoComplete="off"
            />
        )
    }
}
