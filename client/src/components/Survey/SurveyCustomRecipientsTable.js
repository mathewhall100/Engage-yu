import React, {Component, Fragment}  from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { startCase, upperFirst } from 'lodash';
import { withStyles, Typography } from '@material-ui/core';
import SurveyCheckbox from './SurveyCheckbox';
import HrStyled from '../UI/hrStyled'
import PopperCustom from '../UI/popperCustom'
import ProviderName from '../UI/providerName'
import FormSelect from '../UI/Forms/formSelect'
import { loadProvidersByCareGroup } from '../../actions';

const styles = () => ({
    table: {
        width: "100%", 
        borderCollapse: "collapse" 
    },
    tableCell: {
        width: '100%',
         borderTop: "1px solid #DDD", 
         borderBottom: "1px solid #DDD"
    },
    addEmailTextCell: {
        width: "165px"
    },
    selectFormCell: {
        position: "relative", 
        top: "-16px"
    }
})

class SurveyCustomRecipientsTable extends Component {

    componentDidMount() {
        const id = localStorage.getItem("user_provider_group_id")
        if (this.props.providers && this.props.providers.length) {
            this.setState({providers: this.props.providers}, () => this.getInitialRecipients())
        } else {
            this.props.dispatch(loadProvidersByCareGroup(id))
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.recipientForm && this.props.recipientForm && nextProps.recipientForm.values !== this.props.recipientForm.values) {
            this.addRecipientToList(nextProps.recipientForm.values)
        }
        if (nextProps.providers && nextProps.providers.length && nextProps.providers !== this.props.providers) {
            this.setState({providers: nextProps.providers}, () => this.getInitialRecipients())
        }
    }

    state = {
        recipients: [],
        providers: [],
        hoverRow: false,
        anchorEl: null,
        popperOpen: false,
        popperContent: null,
    }

    getInitialRecipients = () => {
        const { providers } = this.state;
        if (this.props.patientInfo && this.props.provider) {
            this.setState({recipients: [
                [...providers.filter(provider => {return provider.value[0] === this.props.patientInfo.primary_provider.id})[0].value],
                [...providers.filter(provider => {return provider.value[0] === this.props.provider._id})[0].value]
            ]}, () =>  this.props.returnRecipients(this.state.recipients) )
        }
    }

    getRecipientName = (recipient) => {
        let addOn = "";
        if (recipient[0] === this.props.patientInfo.primary_provider.id) {
            addOn = "(primary provider)"
        } else if (recipient[0] === this.props.provider._id) {
            addOn = "(requesting provider)"
        } else {addOn = ""}
        return  <Fragment>
                    <ProviderName 
                        title={recipient[1]} 
                        firstname={recipient[2]} 
                        lastname={recipient[3]} />
                    <span style={{marginLeft: "10px"}}>{addOn}</span>
                </Fragment>
    }

    addRecipientToList = (recipient) => {
        const { recipients } = this.state;
        if (recipient && !recipients.includes(recipient.provider)) {
            this.setState({recipients: [...recipients, recipient.provider]}, 
                () => this.props.returnRecipients(this.state.recipients) )
            this.props.reset('ReportEmailForm')
        }
    }

    removeRecipientFromList = (event, recipient) => {
        const { recipients } = this.state
        const index = recipients.findIndex(r => r[0] === recipient[0])
        this.setState({recipients: [...recipients.slice(0,index), ...recipients.slice(index+1)] },
             () => this.props.returnRecipients(this.state.recipients) )
        this.handleRowLeave(event)

    }

    // Open popper
    handleRowHover = (event, recipient) => {
        const { currentTarget } = event;
        this.setState({
            anchorEl: currentTarget,
            popperContent: recipient,
            popperOpen: true,
        });
      };

    // Close popper
    handleRowLeave = (event) =>  {
        this.setState({
            hoverRow: false,
            popperOpen: false
        })
    }


    render () {
        const { classes } = this.props;
        const { providers, recipients, popperContent, popperOpen, anchorEl, hoverRow } = this.state;

        return (
            <Fragment>
                <table className={classes.table}>
                    <tbody>
                        {recipients.map((recipient, index) => {
                            return (
                                <tr
                                    key={index} 
                                    onMouseEnter={(event) => this.handleRowHover(event, recipient)} 
                                    onMouseLeave={(event) => this.handleRowLeave(event)}
                                    onMouseOver={() => this.setState({hoverRow: index})}
                                    style={{backgroundColor: hoverRow === index ? "#ededed" : "#FFF"}}
                                    >
                                        <td className={classes.tableCell}>
                                            <SurveyCheckbox 
                                                item={recipient}
                                                checkboxClick={this.removeRecipientFromList}
                                                checked={true}
                                            />
                                            <Typography variant="subtitle1" inline >
                                                {this.getRecipientName(recipient)} 
                                            </Typography>
                                        </td>
                                </tr>
                            ); 
                            
                        }) } 
                    </tbody>
                </table> 
                <br />
                <table>
                    <tbody>
                        <tr>
                            <td className={classes.addEmailTextCell}>
                                <Typography variant="subtitle1" style={{fontWeight: 500}} inline>Add email recipient: </Typography>
                            </td>
                            <td >
                                <span className={classes.selectFormCell}> 
                                    <form>
                                        <FormSelect 
                                            name="provider" 
                                            label="Select recipient" 
                                            width="200" 
                                            items={providers} 
                                            value={providers[1]}
                                            helpText={false}
                                        />
                                    </form>
                                </span>
                            </td>
                        </tr>
                    </tbody>
               </table>

                <PopperCustom anchorEl={anchorEl} placement="right" width="245px" popperContent={popperContent} popperOpen={popperOpen} >
                    <Typography variant="subtitle2" inline> PROVIDER DETAILS</Typography>
                        <HrStyled /><br />
                        {popperContent && 
                            <Fragment>
                                <Typography variant="subtitle2" gutterBottom>{this.getRecipientName(popperContent)}</Typography> 
                                <Typography variant="subtitle2" gutterBottom>{upperFirst(popperContent[4])}</Typography> 
                                <Typography variant="subtitle2" gutterBottom>{startCase(popperContent[7])} </Typography> 
                                <Typography variant="subtitle2" gutterBottom>{popperContent[8]}</Typography> 
                            </Fragment> 
                        }
                </PopperCustom>

            </Fragment>
        );
    }
}

SurveyCustomRecipientsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const formData = {
    form: 'SurveyRecipientsForm', //unique identifier for this form   
}

const mapStateToProps = (state) => {
	console.log("State : ", state);
	return {
        patientInfo: state.patient.patient.patientInfo,
        providers: state.providersByGroup.listProviders,
        loadingProviders: state.providersByGroup.loading,
        errorProviders: state.providersByGroup.error,
        provider: state.provider.provider,
        recipientForm: state.form.SurveyRecipientsForm
	}
};

SurveyCustomRecipientsTable = reduxForm(formData)(SurveyCustomRecipientsTable)
SurveyCustomRecipientsTable = connect(mapStateToProps, null)(SurveyCustomRecipientsTable)
export default  withStyles(styles, { withTheme: true })(SurveyCustomRecipientsTable);