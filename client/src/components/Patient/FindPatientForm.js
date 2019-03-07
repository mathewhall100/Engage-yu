import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import StreamTextInput from '../Forms/StreamTextInput';
import SelectWithChip from '../Forms/SelectWithChip';

const styles = () => ({
    textPosn: {
        margin: '20px 0 0 16px'
    },
    textIn: {
        margin: '20px 16px 0 0'
    },
    selectPosn: {
        marginTop: '-12px'
    }
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
                <Grid container spacing={24}>
                    
                    <Grid item xs={2}>
                        <Typography variant="h6" className={classes.textPosn}>Search for</Typography>
                    </Grid> 
                    
                    <Grid item xs={2} >
                         <StreamTextInput 
                            name="name"
                            label="Name"
                            width="90%"
                            handleChange={this.onChangeName}
                        /> 
                    </Grid>

                    <Grid item xs={1}>
                        <Typography variant="h6" className={classes.textPosn}>or</Typography>
                    </Grid>

                    <Grid item xs={2} >
                        <StreamTextInput
                            name={"hospId"}
                            label={"Hospital Id"}
                            width={"90%"}
                            component={this.renderTextField}
                            handleChange={this.onChangeHospId}
                        />
                    </Grid>

                    <Grid item xs={1}>
                        <Typography variant="h6" align="right" className={classes.textIn}>in</Typography>
                    </Grid>

                    <Grid item xs={3} className={classes.selectPosn}>
                        <SelectWithChip menuItems={selectMenuItems} selected={this.onChangeList} />
                    </Grid>

                    <Grid item xs={1}></Grid>
                    
                </Grid>
                <br />
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