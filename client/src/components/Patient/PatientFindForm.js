import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { isEmpty } from 'lodash'
import { withStyles, Typography, Grid } from '@material-ui/core';
import FormStreamTextInput from '../UI/Forms/formStreamTextInput';
import FormSelectWithChip from '../UI/Forms/formSelectWithChip';
import BtnGroup from '../UI/Buttons/btnGroup';

const styles = () => ({
    textPosn: {
        margin: '20px 40px 0 40px'
    },
});

class PatientFindForm extends Component {  

    componentDidMount() {
        this.handleInitialize()
    }

    handleInitialize() {
        const initData = {
        "name":  localStorage.getItem("patient_find_form_name")  ? localStorage.getItem("patient_find_form_name") : "",
        "hospId": localStorage.getItem("patient_find_form_hospId")  ? localStorage.getItem("patient_find_form_hospId") : ""
        }
        this.props.initialize(initData) 
    }

    getInitialValueSelectList() {
        return localStorage.getItem("patient_find_form_list") ? localStorage.getItem("patient_find_form_list") : "my patient list"
    }
  
    onChangeName = (name) => { 
        this.props.infoPanel("close")
        localStorage.setItem("patient_find_form_name", name)
        this.props.filterByName(name) 
    };

    onChangeHospId = (hospId) => { 
        this.props.infoPanel("close")
        this.props.filterByNumber(hospId) 
        localStorage.setItem("patient_find_form_hospId", hospId)
    };
    
    onChangeList = (list) => { 
        this.props.infoPanel("close")
        this.props.filterByList(list)
        localStorage.setItem("patient_find_form_list", list)
    };

    // Clear form entries and reset values using Redux Form 'reset'.
    handleClearForm = () => {
        localStorage.removeItem("patient_find_form_name")
        localStorage.removeItem("patient_find_form_hospId")
        this.handleInitialize()
        this.props.infoPanel("close")
        this.props.reset('PatientFindForm')
        this.onChangeList(localStorage.getItem("patient_find_form_list"))
    }

    render () {
        const { classes  } = this.props;
        const selectMenuItems = ["my patient list", "all care group patients"]

        return (
            <form autoComplete="off" >
                <Grid container spacing={24}>
                    <Grid item xs={10}>
                        <div style={{ maxWidth: "920px", display: 'flex', flexDirection: 'row', paddingLeft: "40px" }}>
                            
                            <FormStreamTextInput 
                                name="name"
                                label="Patient name"
                                width={200}
                                handleChange={this.onChangeName}
                            /> 

                            <span style={{width: "40px"}}> </span>

                            <FormStreamTextInput
                                name="hospId"
                                label="Hospital Id"
                                width={100}
                                handleChange={this.onChangeHospId}
                            />

                            <span style={{width: "16px"}}> </span>

                            <Typography variant="h6" className={classes.textPosn}>in</Typography>

                            <span  style={{position: "relative", top: "-12px"}}>
                                <FormSelectWithChip 
                                    menuItems={selectMenuItems} 
                                    selected={this.onChangeList}
                                    initialSelected={this.getInitialValueSelectList()}
                                />
                            </span>
                        </div>
                    </Grid>
                    <Grid item xs={2}>
                        <div style={{float: "right", margin: "20px 36px 0 0"}}>
                            <BtnGroup btns={[{type: "button", btn: "clear"}]} handleBtns={this.handleClearForm} />
                        </div>
                    </Grid>
                </Grid>
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