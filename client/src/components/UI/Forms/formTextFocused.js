import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';


export default class FormTextFocused extends Component {  

    renderTextField(field) {
        //console.log("Field: ", field)
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
        );
    }

    render () {
        const { name, label, width="250" } = this.props;
        return (
            <Field 
                name={name}
                label={label}
                width={width}
                component={this.renderTextField}
                autoComplete="off"
            />
        );
    }
}

FormTextFocused.PropTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    width: PropTypes.string.isRequired,
};
