import React, { Component } from 'react';
import { Field } from 'redux-form';
import TextField from '@material-ui/core/TextField'
import DoneIcon from '@material-ui/icons/Done';


export default class FormTextFocused extends Component {  

    renderTextField(field) {
        console.log("Field: ", field)

        const {width, label, meta: {dirty, touched, error}} = field;

            return (
                <React.Fragment>

                    <TextField
                        label={label}
                        {...field.input}   
                        onBlur={() => {return false}}
                        margin="normal"
                        multiline={field.mutliline === true ? true : false}
                        style={{width: `${width}px`}}
                        autoFocus={true}
                        
                    />

                    {dirty && !error && <span style={{position: "relative", left: "10px", top: "32px"}}> 
                        <DoneIcon style={{fontSize: "28px", color: "green"}}/>
                    </span> }

                    <div style={{fontSize: "13px", color: "red"}}> 
                        {touched ? error : ''}
                    </div>

                </React.Fragment>
            )
        };

    render () {
        return (
            <Field 
                name={this.props.name}
                label={this.props.label}
                width={this.props.width ? this.props.width : "250"}
                component={this.renderTextField}
                autoComplete="off"
            />
        )
    }
}
