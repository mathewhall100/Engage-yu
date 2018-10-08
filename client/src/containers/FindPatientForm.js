import React, { Component } from 'react';
import { Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Field, reduxForm } from 'redux-form';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';

class FindPatientForm extends Component {  
  

    submit(values) {
        console.log("Submit: ", values)
    }

    onChangeName(value) {
        console.log("change name: ", value)
        this.props.filterByName(value)
    }

    onChangeHospId(value) {
        console.log("change hospId: ", value)
        this.props.filterByNumber(value)
    }

    onChangeFilter(value) {
        console.log("change filter: ", value)
        this.props.filterByList(value)
    }


    render () {

        const { handleSubmit, classes,  } = this.props;

        const renderTextField = (field) =>  {
            const  { input, label, autofocus, width, name, meta: { touched, error }, ...custom } = field;
            return (
                <TextField
                    label={label}
                    value={name}
                    //errorText={touched && error}
                    autoFocus={autofocus}
                    style={{width: width}}
                    {...input}
                    {...custom}
                />
            )
        }

        const renderSelectField = (field) => {
            const { input, label, meta: { touched, error }, children, ...custom } = field;
            return (
                <FormControl style={{width: "250px"}}>
                    <InputLabel>My patients</InputLabel>
                    <Select
                        {...input}
                        onSelect={(event, index, value) => input.onChange(value)}
                        children={children} 
                        {...custom}
                    />
                </FormControl>
            )
        }


        return (
            <div>
                <Card style={{padding: "20px"}}>

                    <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Grid container spacing={24}>
                            
                            <Grid item xs={1} style={{paddingTop: "34px"}}>
                                <span style={{fontSize: "20px", margin: "20px"}}>Find: </span>
                            </Grid>

                            <Grid item xs={3}>
                                <Field 
                                    name={"name"}
                                    label={"Name"}
                                    autofocus={true}
                                    width={300}
                                    component={renderTextField}
                                    onChange={(event, value) => this.onChangeName(value)}
                                />
                            </Grid>

                            <Grid item xs={2}>
                                <Field 
                                    name={"hospId"}
                                    label={"Hospital Id"}
                                    width={150}
                                    component={renderTextField}
                                    onChange={(event, value) => this.onChangeHospId(value)}
                                />
                            </Grid>

                            <Grid item xs={1} style={{paddingTop: "34px"}}>
                                 <span style={{fontSize: "20px"}}> from </span>
                            </Grid>

                            <Grid item xs={3}>
                                <Field
                                    name="patientFilter"
                                    component={renderSelectField}
                                    onChange={(event, value) => this.onChangeFilter(value)}
                                    label="Filter search"
                                    autowidth="true"
                                    >
                                    <MenuItem key="myPatients" value="myPatients">my patients</MenuItem>
                                    <MenuItem key="groupPatients" value="groupPatients">all care group patients</MenuItem>
                                </Field>
                                
                            </Grid>

                            <Grid item xs={3}>
                                {/* <Button type="submit" disabled={submitting || pristine} className={classes.submitBtn}>Submit</Button>
                                <Link to='/admin' className={classes.cancelLnk}><Button className={classes.cancelBtn}>Cancel</Button></Link> */}
                            </Grid>

                        </Grid>
                    </form>
                </Card>

                <br />
      
            </div>
        );
    }
}

const mapStateToProps = (state,) => {
    console.log("State : ", state);

    return {
        user: state.user
    }
  };

const formData = {
    form: 'FindPatientForm', //unique identifier for this form 
    //validate,      
}

FindPatientForm = connect(mapStateToProps) (FindPatientForm)
FindPatientForm = reduxForm(formData)(FindPatientForm)
export default FindPatientForm;