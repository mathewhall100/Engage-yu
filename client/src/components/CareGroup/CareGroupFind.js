import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withStyles, Card } from '@material-ui/core';
import FormFind from '../UI/Forms/formFind';
import CareGroupSelect from './CareGroupSelect';
import CareGroupDetails from './CareGroupDetails';
import { selectConsoleTitle } from '../../actions';


const styles = () => ({
    root: {
        padding: "20px 20px 10px 20px",
        minHeight: "120px"
    },
});


class CareGroupFind extends Component {  
    
    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Manage Care Group"}));
    }

    state = {
        caregroupId: "",
        displayDetails: false,
    }

    closeCareGroupDetails = () => {
        this.setState({displayDetails: false});
        this.props.reset("CareGroupSelectForm");
    }

    submit(values) {
        console.log("Submitted values: ", values);
        if (values.caregroup && values.caregroup[0]) {
            this.setState({
                careGroupId: values.caregroup[0],
                displayDetails: !this.state.displayDetails
            });
        }
    }

    render () {
         const { handleSubmit, submitting, pristine, classes } = this.props;
         const { displayDetails, careGroupId } = this.state;
       
        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <FormFind
                        title="Select group:"
                        select={<CareGroupSelect width={280}/>}
                        url='/admin/caregroup/add'
                        btn="add a new care group"
                        submitting={submitting}
                        pristine={pristine}
                    /> 
                </form>
                { displayDetails && <CareGroupDetails  careGroupId={careGroupId} handleClose={this.closeCareGroupDetails}/> }
            </Card>
        );
    }
}

const formData = {
    form: 'CareGroupSelectForm' //unique identifier for this form 
}

CareGroupFind = reduxForm(formData)(CareGroupFind);
CareGroupFind = withStyles(styles)(CareGroupFind);
export default CareGroupFind;