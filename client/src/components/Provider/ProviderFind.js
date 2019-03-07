import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography'
import ProviderSelect from '../Forms/ProviderSelect'
import ProviderDetails from './ProviderDetails'
import ActionLnk from '../Buttons/actionLnk'
import ActionBtn from '../Buttons/actionBtn'
import { selectConsoleTitle } from '../../actions/index'

const styles = theme => ({
    root: {
        padding: "40px"
    },
});  


class ProviderFind extends Component {  
    
    componentDidMount() {
        this.props.selectConsoleTitle({title: "Manage Provider"});
    };
    
    state = {
        userGroupId: localStorage.getItem("provider_id"),
        providerList: [],
        displayDetails: false,
    }

    submit(values) {
        console.log("Submitted values: ", values);
        this.setState({
            providerId: values.provider[0],
            displayDetails: !this.state.displayDetails
        })
    };

    render () {

        const { displayDetails, providerId } = this.state
        const { handleSubmit, submitting, pristine, classes } = this.props
        
        return (
            <Card className={classes.root}>
                <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                    <Grid container spacing={24}>

                        <Grid item xs={2}>
                            <Typography variant="h6">Select Provider:</Typography>
                        </Grid>

                        <Grid item xs={4}>
                            <span style={{position: "relative", top: "-16px", left: "20px"}}>
                                <ProviderSelect />
                            </span>
                        </Grid>

                        <Grid item xs={1}>
                            <ActionBtn type="submit" disabled={submitting || pristine} className={classes.submitBtn} text="submit" />
                        </Grid>

                        <Grid item xs={2}>
                            <Typography variant="subtitle1" align="center">or</Typography>
                        </Grid>

                        <Grid item xs={3}>
                            <ActionLnk url='/admin/provider/add' disabled={false} text="add new provider" />
                        </Grid>

                    </Grid>
                </form>
            
                { displayDetails && <ProviderDetails  providerId={providerId}/> }

            </Card>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle }, dispatch);
}

const formData = {
    form: 'ProviderSelectForm' //unique identifier for this form 
}

ProviderFind = reduxForm(formData)(ProviderFind)
ProviderFind = withStyles(styles)(ProviderFind)
ProviderFind = connect(null, mapDispatchToProps) (ProviderFind)
export default ProviderFind