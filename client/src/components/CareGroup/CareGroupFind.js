import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { withStyles, Card } from '@material-ui/core';
import FormFind from '../UI/Forms/formFind';
import CareGroupSelect from './CareGroupSelect';
import CareGroupDisplay from './CareGroupDisplay';
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
        display: false,
    }

    closeCareGroupDisplay = () => {
        this.setState({display: false});
        this.props.reset("CareGroupSelectForm");
    }

    submit(values) {
        console.log("Submitted values: ", values);
        if (values.caregroup && values.caregroup[0]) {
            this.setState({
                careGroupId: values.caregroup[0],
                display: !this.state.display
            });
        }
    }

    render () {
         const { handleSubmit, submitting, pristine, classes } = this.props;
         const { display, careGroupId } = this.state;
       
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
                { display && <CareGroupDisplay  careGroupId={careGroupId} handleClose={this.closeCareGroupDisplay}/> }
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