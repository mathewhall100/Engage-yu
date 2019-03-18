import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import StreamTextInput from '../components/Forms/StreamTextInput';
import SelectWithChip from '../components/Forms/SelectWithChip';

const styles = () => ({
    textPosn: {
        margin: '20px 40px 0 20px'
    },
});

class FindPatientForm extends Component {  
  
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
                
                    <StreamTextInput 
                        name="name"
                        label="Name"
                        width={200}
                        handleChange={this.onChangeName}
                    /> 

                    <span style={{width: "40px"}}> </span>

                    <StreamTextInput
                        name={"hospId"}
                        label={"Hospital Id"}
                        width={100}
                        component={this.renderTextField}
                        handleChange={this.onChangeHospId}
                    />

                    <span style={{width: "16px"}}> </span>

                    <Typography variant="h6" className={classes.textPosn}>in</Typography>

                    <span  style={{position: "relative", top: "-12px"}}>
                        <SelectWithChip menuItems={selectMenuItems} selected={this.onChangeList}/>
                    </span>
                   
                </div>
            </form>
        );
    }
};

const formData = {
    form: 'FindPatientForm', //unique identifier for this form   
}

FindPatientForm = reduxForm(formData)(FindPatientForm)
FindPatientForm = withStyles(styles)(FindPatientForm)
export default FindPatientForm;