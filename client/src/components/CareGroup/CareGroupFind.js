import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { startCase } from 'lodash';
import moment from 'moment';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import ActionLnk from '../Buttons/actionLnk'
import ActionBtn from '../Buttons/actionBtn'
import CareGroupSelect from '../Forms/CareGroupSelect';
import CareGroupDetails from './CareGroupDetails';
import { selectConsoleTitle } from '../../actions/index';
import provider_groupAPI from "../../utils/provider_group.js";


const styles = theme => ({
    root: {
        padding: "40px"
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

    submit(values) {
        console.log("Submitted values: ", values);
        this.setState({
            careGroupId: values.caregroup[0],
            displayDetails: !this.state.displayDetails
        })
    };

   
    render () {

        const { displayDetails, careGroupId } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props

        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Grid container spacing={24}>

                        <Grid item xs={2}>
                        <Typography variant="h6">Select Group:</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <span style={{position: "relative", top: "-16px", left: "20px"}}>
                                <CareGroupSelect width={280}/>
                            </span>
                        </Grid>

                        <Grid item xs={1}>
                            <ActionBtn type="submit" disabled={submitting || pristine} className={classes.submitBtn} text="submit" />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="subtitle1" align="center">or</Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <ActionLnk url='/admin/caregroup/add' disabled={false} text="add a new care group" />
                        </Grid>

                    </Grid>
                </form>
            
                {displayDetails && <CareGroupDetails careGroupId={careGroupId} /> }

            </Card> 
        );
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