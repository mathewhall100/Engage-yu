import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { TextField, IconButton, InputAdornment } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';


export default class FormTextPassword extends Component {  

    state = {
        showPassword: false
    }

    handleShowPassword = () => {
        console.log("toggle password visibility")
        this.setState(state => ({ showPassword: !state.showPassword }));
      };

    renderTextField(field) {
        //console.log("Field: ", field);
        const {width, label, variant, meta: {dirty, touched, error}} = field;
        return (
            <React.Fragment>

                <TextField
                    label={label}
                    {...field.input}   
                    onBlur={() => {return false}}
                    margin="normal"
                    style={{width: width}}
                    type={field.showPassword ? 'text' : 'password'}
                    variant={variant}
                    InputProps={{
                        endAdornment: <InputAdornment position="end">
                            <IconButton
                            aria-label="Toggle password visibility"
                            onClick={field.handleShowPassword}
                            >
                            {field.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                        </InputAdornment>,
                      }}
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
        const { name, label, width="250", variant="outlined" } = this.props;
        return (
            <Field 
                name={name}
                label={label}
                width={`${width}px`}
                variant={variant}
                component={this.renderTextField}
                autoComplete="off"
                handleShowPassword={this.handleShowPassword}
                showPassword={this.state.showPassword}
            />
        );
    }
}

FormTextPassword.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width: PropTypes.string,
    variant: PropTypes.string
};