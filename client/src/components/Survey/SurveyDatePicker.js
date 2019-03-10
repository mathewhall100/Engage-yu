import React, { Component }  from 'react';
import PropTypes, { props } from 'prop-types';
import { Field } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


class FormDatePicker extends Component {

    renderDatePicker(field) {

        //const { classes } = this.props;
        const  {meta: {touched, error} } = field;

        return (
            
            <div>
                <TextField
                    //label={field.label}
                    {...field.input}
                    type="date"
                    //defaultValue={field.defaultValue}
                    style={{marginLeft: "theme.spacing.unit", marginRight: "theme.spacing.unit", width: 250,}}
                    // InputLabelProps={{
                    //     shrink: true,
                    // }}
                />

                 <div style={{fontSize: "13px", color: "red"}}> 
                        {touched ? error : ''}
                </div>
            </div>
        );
    }

    render () {

        return (

            <Field 
                name={this.props.name}
                label={this.props.label}
               // defaultValue={this.props.default}
                component={this.renderDatePicker}
            />

        )
    };

}

// FormDatePicker.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

//export default withStyles(styles)(FormDatePicker);

export default FormDatePicker;