import React, { Component } from 'react'
import { Field, reset, reduxForm } from 'redux-form';
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SmallBtn from '../Buttons/smallBtn';

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
        position: "relative", top: "6px"
    },
})


class UpdateFormUnit extends Component {

    componentWillReceiveProps(nextProps) {
        if (!this.state.updSuccess && nextProps.updateSuccess) {this.updateSuccess()}
        if (!this.state.updFailed && nextProps.updateFailed) {this.updateFailed()}
    }

    state = {
        editFieldActive: false, 
        showEditField: [],
        updFailed: false,
        updSuccess: false
    }

    updateSuccess = () => {
        this.setState({
            editFieldActive: false,
            updFailed: false,
            updSuccess: true
        })
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    }

    updateFailed = () => {
        this.setState({
            editFieldActive: false,
            updFailed: true,
            updSuccess: false
        })
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    }

    // Event handlers
    handleUpdate = (index) => {
        console.log("handle update: ", index)
        let tempArray = []
        tempArray[index] = true
        this.setState({
            updSuccess: false,
            updFailed: false,
            showEditField: tempArray,
            editFieldActive: true,
        }, () => {this.props.outcomeReset()} )
    } 
    
    handleCancel = () => {
        this.setState({
            showEditField: [],
            editFieldActive: false,
            updFailed: false,
            updSuccess: false
        })
        this.props.reset('updateForm');  // reset the form fields to empty (requires form name)
    }

    handleTryAgain = () => {
        this.setState({updFailed: false})
    }

    render() {
    const { classes, submitting, pristine, formFields } = this.props
    const { showEditField, editFieldActive, updFailed, updSuccess } = this.state

    const getPositioning = (element) => {
        console.log(element)
        if (element.includes("Select")) {return {top: "-12px"}}
        else if (element.includes("Radio")) {return {top: "-2px"}}
        else return {top: "-28px"}
    }


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
                                <SmallBtn type="button" disabled={submitting || editFieldActive} index={index} text="update" handleBtn={this.handleUpdate}/>
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
                                { showEditField[index] && updFailed && 
                                    <Typography variant="subtitle1" align="center" color="error" className={classes.failedText}>
                                        Update failed!
                                    </Typography> 
                                }
                            </Grid>

                            <Grid item xs={3}>
                                { showEditField[index] && updFailed && 
                                    <span> 
                                        <SmallBtn type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleCancel}/>
                                        <SmallBtn type="button" disabled={false} index="tryagain" text="try again" handleBtn={this.handleTryAgain}/>
                                    </span>
                                }
                                {showEditField[index] && !updSuccess && !updFailed &&
                                    <span style={{marginLeft: "10px"}}>
                                        <SmallBtn type="submit" disabled={submitting || pristine} index="" text="submit" /> 
                                        <SmallBtn type="button" disabled={false} index="cancel" text="cancel" handleBtn={this.handleCancel}/>
                                    </span>
                                }
                            </Grid>  
                        </Grid>
                    )
                }) }

            </React.Fragment>
        )
    }
}

const formData = {
    form: 'updateForm', //unique identifier for this form      
}

UpdateFormUnit = reduxForm(formData)(UpdateFormUnit)
UpdateFormUnit = withStyles(styles)(UpdateFormUnit)
export default UpdateFormUnit
