import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { isEmpty } from 'lodash'
import moment from 'moment';
import { withStyles, Card, Grid, Typography } from '@material-ui/core';
import BtnActionLnk from '../UI/Buttons/btnActionLnk';
import BtnAction from '../UI/Buttons/btnAction';
import FormTextFocused from '../UI/Forms/formTextFocused';
import { selectConsoleTitle, careGroupSave } from '../../actions';
import { validateName } from '../../logic/formValidations';
import CareGroupSaveDialog from './CareGroupSaveDialog'
import ProviderName from '../UI/providerName'

const styles = () => ({
    root: {
        padding: "40px 40px 40px 16%",
    }
});    


class CareGroupAdd extends Component {

    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Add New Care Group", menuIndex: 7}))
    }

    componentWillUnmount() {
        this.props.dispatch(careGroupSave("reset"))
    }
    
    // handle form submission
    submit(values) {
        console.log("Submitted values: ", values);
        this.props.dispatch(careGroupSave(values))
    }

      // Clear form entries and reset values using Redux Form 'reset'.
      handleClearForm = () => {
        this.props.reset('CareGroupAddForm')
    }

    render() {
        const { handleSubmit, classes, pristine, submitting, newCareGroup, errorNewCareGroup, loadingNewCareGroup } = this.props;

        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>

                    <Grid container spacing={24}>
                        <Grid item xs={5}>
                            <FormTextFocused name="caregroup" label="New Care Group" width="320" />
                        </Grid>
                        <Grid item xs={3} style={{paddingTop: "40px"}}>
                            <Typography variant="caption" >Added by:</Typography>
                            <Typography variant="subtitle1">
                                <ProviderName 
                                    title={localStorage.getItem("user_provider_title")} 
                                    firstname={localStorage.getItem("user_provider_firstname")}
                                    lastname={localStorage.getItem("user_provider_lastname")}
                                />
                            </Typography >
                        </Grid>
                        <Grid item xs={4} style={{paddingTop: "40px"}}>
                            <Typography variant="caption">Date added:</Typography>
                            <Typography variant="subtitle1">{moment().format("MMM Do YYYY")}   </Typography>
                        </Grid>
                    </Grid>

                    <br /> <br />

                    <BtnAction type="submit" disabled={submitting || pristine} text="submit" marginRight={true}/>
                    <BtnAction type="button" disabled={pristine} text="clear" warning={true} marginRight={true} handleAction={this.handleClearForm} />
                    <BtnActionLnk disabled={false} url='/admin/caregroup/find' warning={true} text="cancel" />

                </form> 
                
                {(loadingNewCareGroup || errorNewCareGroup || !isEmpty(newCareGroup)) && <CareGroupSaveDialog /> }

            </Card>
        );
    }

}

function validate(values) {
    //console.log("Error values: ", values);
    const errors = {};
    // validate inputs from 'values'
    errors.name = validateName(values.name, true);
    //console.log("Errors: ", errors);
    return errors;
}

const formData = {
    form: 'CareGroupAddForm', //unique identifier for this form 
    validate      
};

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        newCareGroup: state.careGroupSave.info,
        loadingNewCareGroup: state.careGroupSave.loading,
        errorNewCareGroup: state.careGroupSave.error
    }
};

CareGroupAdd = reduxForm(formData)(CareGroupAdd);
CareGroupAdd = withStyles(styles)(CareGroupAdd);
CareGroupAdd = connect(mapStateToProps)(CareGroupAdd);
export default CareGroupAdd;