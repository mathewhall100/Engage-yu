import React, { Component } from 'react';
import { Field } from 'redux-form';
import FormLabel from '@material-ui/core/FormLabel';
import { FormControlLabel, Grid } from '@material-ui/core';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import SurveyDatePicker from './SurveyDatePicker';
import Typography from '@material-ui/core/Typography'


class SurveyStartDate extends Component {  
    
    renderRadioGroup(field) {

        const {title, input, children} = field 

        return (

                <Grid container spacing={24}>

                    <Grid item xs={4}>

                        <FormLabel component="legend" >
                            <Typography variant="subtitle1" style={{fontWeight:  500 }}>Diary Card Start</Typography>
                        </FormLabel>

                        <RadioGroup
                            {...input}
                            {...children}
                            onChange={(value) => input.onChange(value)}
                            style={{ display: 'flex', flexDirection: 'row'}}
                        >
                            {children.map(child => 
                                <FormControlLabel 
                                    value={child.props.value}
                                    control={<Radio />} 
                                    label={child.props.label} 
                                    checked={input.checked}
                                />
                            )}
                        </RadioGroup>
                    </Grid>

                    <Grid item xs={6}>
                        <br /> 
                        {field.input.value === "date" &&
                            <SurveyDatePicker
                                name="datePick"
                                label="Select a start date"
                            />}
                    </Grid>

                    <Grid item xs={2}></Grid>

                </Grid>    
        )
    };

    render () {

        return (

            <Field name={this.props.name} component={this.renderRadioGroup} title={this.props.title}>
                <Radio value="nowOn" label="Patient select" />
                <Radio value="date" label="Specific date" />
            </Field>

        )
    }
};

export default SurveyStartDate;
