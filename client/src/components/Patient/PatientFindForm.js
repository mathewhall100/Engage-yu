import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withStyles, Typography } from '@material-ui/core';
import FormStreamTextInput from '../UI/Forms/formStreamTextInput';
import FormSelectWithChip from '../UI/Forms/formSelectWithChip';

const styles = () => ({
    textPosn: {
        margin: '20px 40px 0 40px'
    },
});

class PatientFindForm extends Component {  
  
    onChangeName = (name) => { 
        localStorage.setItem("patient_id", "")
        this.props.filterByName(name) 
    };

    onChangeHospId = (hospId) => { 
        localStorage.setItem("patient_id", "")
        this.props.filterByNumber(hospId) 
    };
    
    onChangeList = (list) => { 
        localStorage.setItem("patient_id", "") 
        this.props.filterByList(list)
    };

    render () {
        const { classes  } = this.props;
        const selectMenuItems = ["my patient list", "all care group patients"]

        return (
            <form autoComplete="off" >
                 <div style={{ maxWidth: "920px", display: 'flex', flexDirection: 'row'}}>
                    
                    <Typography variant="h6" className={classes.textPosn}>Search for</Typography>
                
                    <FormStreamTextInput 
                        name="name"
                        label="Name"
                        width={200}
                        handleChange={this.onChangeName}
                    /> 

                    <span style={{width: "40px"}}> </span>

                    <FormStreamTextInput
                        name={"hospId"}
                        label={"Hospital Id"}
                        width={100}
                        component={this.renderTextField}
                        handleChange={this.onChangeHospId}
                    />

                    <span style={{width: "16px"}}> </span>

                    <Typography variant="h6" className={classes.textPosn}>in</Typography>

                    <span  style={{position: "relative", top: "-12px"}}>
                        <FormSelectWithChip menuItems={selectMenuItems} selected={this.onChangeList}/>
                    </span>
                   
                </div>
            </form>
        );
    }
};

const formData = {
    form: 'PatientFindForm', //unique identifier for this form   
}

PatientFindForm = reduxForm(formData)(PatientFindForm)
PatientFindForm = withStyles(styles)(PatientFindForm)
export default PatientFindForm;