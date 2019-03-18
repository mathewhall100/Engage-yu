import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withStyles, Card } from '@material-ui/core';
import CareGroupSelect from '../components/Forms/CareGroupSelect';
import CareGroupDetails from './CareGroupDetails';
import { selectConsoleTitle } from '../actions/index';
import FindForm from '../components/Forms/FindForm'

const styles = () => ({
    root: {
        padding: "20px 20px 10px 20px",
        minHeight: "120px"
    },
});


class CareGroup extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Manage Care Group"});
    }

    state = {
        caregroupId: "",
        displayDetails: false,
    }

    closeCareGroupDetails = () => {
        console.log("close careGroup details")
        this.setState({displayDetails: false})
        this.props.reset("CareGroupSelectForm")
    }

    submit(values) {
        console.log("Submitted values: ", values);
            if (values.caregroup && values.caregroup[0]) {
            this.setState({
                careGroupId: values.caregroup[0],
                displayDetails: !this.state.displayDetails
            })
        }
    };

    render () {
        const { displayDetails, careGroupId } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props

        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <FindForm 
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
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const formData = {
    form: 'CareGroupSelectForm' //unique identifier for this form 
}

CareGroup = reduxForm(formData)(CareGroup)
CareGroup = withStyles(styles)(CareGroup)
CareGroup = connect(null, mapDispatchToProps)(CareGroup)
export default CareGroup