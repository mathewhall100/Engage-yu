import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/Done';


export default class FormTextFocused extends Component {  

    renderTextField(field) {
        //console.log("Field: ", field)
        const {width, label, variant, meta: {dirty, touched, error}} = field;

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

                {dirty && !error && <span style={{position: "relative", left: "10px", top: "32px"}}> 
                    <DoneIcon style={{fontSize: "28px", color: "green"}}/>
                </span> }

                <div style={{fontSize: "13px", color: "red"}}> 
                    {touched ? error : ''}
                </div>

            </Fragment>
        );
    }

    render () {
        const { name, label, variant="standard", width="250" } = this.props;
        return (
            <Field 
                name={name}
                label={label}
                width={`${width}px`}
                component={this.renderTextField}
                variant={variant}
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
    variant: PropTypes.string
};
