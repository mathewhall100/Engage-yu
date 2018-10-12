import React, { Component } from 'react';
import { Field } from 'redux-form';

import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SurveyDatePicker from './SurveyDatePicker';;



class SurveyStartDate extends Component {  
    
    renderRadioGroup(field) {

        const {title, input, meta: { pristine, touched, error }, children} = field 
        //console.log(field)

        return (

                <Grid container spacing={8}>

                    <Grid item xs={5}>
                    <br />
                    <FormLabel component="legend" >{title}</FormLabel>
                        <RadioGroup
                            {...input}
                            {...children}
                            onChange={(event, value) => input.onChange(value)}
                            style={{ display: 'flex', flexDirection: 'row'}}
                        >
                            {children.map(child => 
                                <FormControlLabel 
                                    key={child.props.label}
                                    value={child.props.value}
                                    control={<Radio />} 
                                    label={child.props.label} 
                                    checked={input.checked}
                                />
                            )}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={5}>
                        <div style={{marginTop: "20px"}}>
                            {field.input.value === "date" &&
                                <SurveyDatePicker
                                    name="datePick"
                                    label="Select a start date"
                                    // default={new Date().toISOString().slice(0,10)}
                                />}
                        </div> 
                    </Grid>

                    <Grid item xs={2}></Grid>

                </Grid>    
        )
    };

    render () {

        return (

            <Field name={this.props.name} component={this.renderRadioGroup} title={this.props.title}>
                <Radio key="nowOn" value="nowOn" label="Patient select" />
                <Radio key="date" value="date" label="Specific date" />
            </Field>

        )
    }
};

export default SurveyStartDate;
