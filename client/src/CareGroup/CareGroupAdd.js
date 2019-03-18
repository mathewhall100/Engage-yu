import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ActionLnk from '../components/Buttons/actionLnk'
import ActionBtn from '../components/Buttons/actionBtn'
import FormTextFocused from '../components/Forms/FormTextFocused'
import Dialog from '../components/Dialogs/SimpleDialog'
import { selectConsoleTitle } from '../actions/index'
import provider_groupAPI from "../utils/provider_group.js";
import { validateName } from '../logic/formValidations'

const styles = () => ({
    root: {
        padding: "40px",
    }
});    


class CareGroupAdd extends Component {

    componentDidMount() {
        this.props.selectConsoleTitle({title: "Add New Care Group"})
    };
    
    state = {
        addFailed: false,
        addSuccess: false,
        newCareGroup: ""
    };

    // handle form submission
    submit(values) {
        console.log("Submitted values: ", values);
        provider_groupAPI.create({
            date_added: new Date(),
            added_by_ref: localStorage.getItem("provider_id"),
            added_by_id: localStorage.getItem("provider_id"),
            added_by_name: `${localStorage.getItem("provider_first_name")} ${localStorage.getItem("provider_last_name")}`,
            group_name: values.caregroup
        })
        .then(res => {
            console.log("res.data: ", res.data)
            this.setState({
                newCareGroup: values.caregroup,
                addSuccess: true
            })
        })
        .catch(err => {
            console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
            console.log(err);
            this.setState({
                newCareGroup: values.caregroup,
                addFailed: true
            }); 
        })
    };

 
    render() {

        const { handleSubmit, classes, pristine, submitting } = this.props;
        const { newCareGroup, addSuccess, addFailed } = this.state;

        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                        <Grid container spacing={24}>

                        <Grid item xs={5}>
                            <FormTextFocused
                                name="caregroup"
                                label="New Care Group"
                                width="350"
                            />
                        </Grid>

                        <Grid item xs={3} style={{paddingTop: "40px"}}>
                            <Typography variant="caption" >Added by:</Typography>
                            <Typography variant="subtitle1">
                                {localStorage.getItem("provider_first_name")} {localStorage.getItem("provider_last_name")}
                            </Typography >
                        </Grid>
                        
                        <Grid item xs={4} style={{paddingTop: "40px"}}>
                            <Typography variant="caption">Date added:</Typography>
                            <Typography variant="subtitle1">
                                {moment().format("MMM Do YYYY")}
                            </Typography>
                        </Grid>

                    </Grid>

                    <br /> <br />

                    <span style={{marginRight: "15px"}}>
                        <ActionBtn type="submit" disabled={submitting || pristine} text="submit" />
                    </span>
                    <ActionLnk disabled={false} url='/admin/caregroup/find' text="cancel" />

                </form> 
                
                {addSuccess && 
                    <Dialog 
                        title="Success!" 
                        text={`CareGroup ${startCase(newCareGroup)} successfully added and will now appear as an option whenever care groups are selected`} 
                    />
                }

                {addFailed && 
                    <Dialog 
                        title="Failed!" 
                        text={`Unfortuneately there was a problem and care group ${startCase(newCareGroup)} could not be added. Click close, check the details you have enbtered and try again. If the problem persists then contact your systme administrator`} 
                    />
                }

            </Card>
        );
    };

};

function validate(values) {
    console.log("Error values: ", values) 
    const errors = {};
    // validate inputs from 'values'
    errors.name = validateName(values.name, true)
    console.log("Errors: ", errors)
    return errors;

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, }, dispatch);
}

const formData = {
        form: 'CareGroupAddForm', //unique identifier for this form 
        validate,      
}

CareGroupAdd = reduxForm(formData)(CareGroupAdd)
CareGroupAdd = withStyles(styles)(CareGroupAdd)
CareGroupAdd = connect(null, mapDispatchToProps)(CareGroupAdd)
export default CareGroupAdd