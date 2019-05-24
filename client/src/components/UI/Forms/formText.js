import React, { Component } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';


export default class FormText extends Component {  

    renderTextField(field) {
        //console.log("Field: ", field);
        const {width, label, type, helpText, variant, meta: {dirty, touched, error}} = field;
        return (
            <React.Fragment>

                <TextField
                    label={label}
                    {...field.input}   
                    onBlur={() => {return false}}
                    margin="normal"
                    style={{width: width}}
                    type={type}
                    variant={variant}
                    autoComplete="off"
                />

                {helpText && dirty && !error && <span style={{position: "relative", left: "10px", top: "32px"}}> 
                    <DoneIcon style={{fontSize: "28px", color: "green"}}/>
                </span> }

                {helpText && <div style={{fontSize: "13px", color: "red"}}> 
                    {touched ? error : ''}
                </div> }

            </React.Fragment>
        );
    }

    render () {
        const { name, label, type="text", width="250", variant="standard", helpText=true} = this.props;
        return (
            <Field 
                name={name}
                label={label}
                type={type}
                width={width.includes('%') ? width : width.includes("px") ? width : `${width}px`}
                variant={variant}
                helpText={helpText}
                component={this.renderTextField}
            />
        );
    }
}

FormText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    variant: PropTypes.string,
};