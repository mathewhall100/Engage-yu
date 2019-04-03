import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles, Grid, Typography} from '@material-ui/core';
import BtnSmall from '../Buttons/btnSmall';

const styles = (theme) => ({
    fwMedium: {
        fontWeight: 500,
    },
    formElement: {
        position: "relative",
        left: "15px"
    },
    successText: {
        color: "green", 
        position: "relative", top: "6px"
    },
    failedText: {
        color: "red",
        position: "relative", top: "6px"
    },
    savingText: {
        position: "relative", top: "6px"
    }
});


class FormUpdateUnit extends Component {

    componentWillReceiveProps(nextProps) {
        if (!this.state.updSuccess && nextProps.updateSuccess) {this.updateSuccess()}
        if (!this.state.updFailed && nextProps.updateFailed) {this.updateFailed()}
        if (!this.props.updInProgress && nextProps.updInProgress) {this.updateInProgress()}
    }

    state = {
        editFieldActive: false, 
        showEditField: [],
        updFailed: false,
        updSuccess: false,
        updInProgress: false
    };

    updateSuccess = () => {
        this.setState({
            editFieldActive: false,
            updFailed: false,
            updSuccess: true,
            updInProgress: false
        })
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    };

    updateFailed = () => {
        this.setState({
            editFieldActive: false,
            updFailed: true,
            updSuccess: false,
            updInProgress: false
        })
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    };

    updateInprogress = () => {
        this.setState({
            editFieldActive: false,
            updFailed: false,
            updSuccess: false,
            updInProgress: true
        })
    }

    // Event handlers
    handleUpdate = (index) => {
        let tempArray = []
        tempArray[index] = true
        this.setState({
            updSuccess: false,
            updFailed: false,
            showEditField: tempArray,
            editFieldActive: true,
        }, () => {this.props.outcomeReset()} )
    }; 
    
    handleCancel = () => {
        this.setState({
            showEditField: [],
            editFieldActive: false,
            updFailed: false,
            updSuccess: false,
            updInProgress: false
        })
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    };

    handleTryAgain = (index) => {
        this.handleUpdate(index)
    };

    render() {
        const { classes, submitting, pristine, formFields } = this.props;
        const { showEditField, editFieldActive, updInProgress, updFailed, updSuccess } = this.state;

        const getPositioning = (element) => {
            if (element.includes("Select")) {return {top: "-12px"}}
            else if (element.includes("Radio")) {return {top: "-2px"}}
            else return {top: "-28px"}
        };


        return (
            <React.Fragment>
                {formFields.map((field, index) => {
                    return (
                        <Grid container spacing={8} key={index}>

                            <Grid item xs={2} >
                                <Typography variant="subtitle1" style={{position: "relative", top: "8px"}}>{field.rowLabel}</Typography>
                            </Grid>

                            <Grid item xs={3}>
                                <Typography variant="subtitle1" className={classes.fwMedium} style={{position: "relative", top: "8px"}}>{field.fieldContent}</Typography>
                            </Grid>

                            <Grid item xs={1} >
                                <BtnSmall type="button" disabled={submitting || editFieldActive} index={index} text="update" handleBtn={this.handleUpdate}/>
                            </Grid>

                            <Grid item xs={3}>
                                { showEditField[index] && !updSuccess && !updFailed &&
                                    <span className={classes.formElement} style={getPositioning(field.formElement.type.name)} >      
                                        {field.formElement}
                                    </span> 
                                }
                                { showEditField[index] && updSuccess &&
                                    <Typography variant="subtitle1" align="center" className={classes.successText}>
                                        Successfully updated! 
                                    </Typography> 
                                }
                                { showEditField[index] && updInProgress &&
                                    <Typography variant="subtitle1" align="center" className={classes.savingText}>
                                        Saving... 
                                    </Typography> 
                                }
                                { showEditField[index] && updFailed && 
                                    <Typography variant="subtitle1" align="center" color="error" className={classes.failedText}>
                                        Update failed!
                                    </Typography> 
                                }
                            </Grid>

                            <Grid item xs={3}>
                                { showEditField[index] && updFailed && 
                                    <span> 
                                        <BtnSmall type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleCancel}/>
                                        <BtnSmall type="button" disabled={false} index={index} text="try again" handleBtn={this.handleTryAgain}/>
                                    </span>
                                }
                                {showEditField[index] && !updSuccess && !updFailed &&
                                    <span style={{marginLeft: "10px"}}>
                                        <BtnSmall type="submit" disabled={submitting || pristine} index="" text="submit" /> 
                                        <BtnSmall type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleCancel}/>
                                    </span>
                                }
                            </Grid>  
                        </Grid>
                    )
                }) }

            </React.Fragment>
        );
    }
}

FormUpdateUnit.propTypes = {
    classes: PropTypes.object.isRequired,
    submitting: PropTypes.bool, 
    pristine: PropTypes.bool,
    formFields: PropTypes.array.isRequired
};

const formData = {
    form: 'updateForm', //unique identifier for this form      
};

FormUpdateUnit = reduxForm(formData)(FormUpdateUnit);
FormUpdateUnit = withStyles(styles)(FormUpdateUnit);
export default FormUpdateUnit;
