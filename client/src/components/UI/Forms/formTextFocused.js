import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';


export default class FormTextFocused extends Component {  

    renderTextField(field) {
        //console.log("Field: ", field)
        const {width, label, variant, helpText, meta: {dirty, touched, error}} = field;

        return (
            <Fragment>

                <TextField
                    label={label}
                    {...field.input}   
                    onBlur={() => {return false}}
                    margin="normal"
                    style={{width: width}}
                    type="text"
                    variant={variant}
                    autoFocus={true}
                    autoComplete="off"
                    
                />

                {helpText && dirty && !error && <span style={{position: "relative", left: "10px", top: "32px"}}> 
                    <DoneIcon style={{fontSize: "28px", color: "green"}}/>
                </span> }

                {helpText && <div style={{fontSize: "13px", color: "red"}}> 
                    {touched ? error : ''}
                </div> }

            </Fragment>
        );
    }

    render () {
        const { name, label, variant="standard", width="250", helpText=true} = this.props;
        console.log("width: ", width)
        return (
            <Field 
                name={name}
                label={label}
                width={!isNaN(width) ? `${width}px` : width.includes("%") ? width : width.includes("px") ? width : "250px"}
                component={this.renderTextField}
                variant={variant}
                helpText={helpText}
                autoComplete="off"
            />
        );
    }
}

FormTextFocused.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    width:  PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    helpText: PropTypes.bool,
    variant: PropTypes.string
};
