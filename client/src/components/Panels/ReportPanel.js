import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GenericTable from '../Tables/GenericTable'

const styles = () => ({
  	root: {
		width: "100%",
  	},
});

class ReportPanel extends Component {

	handleActionBtn = (btn, row) => {
        this.props.handleActionBtn(btn, row)
    }

	render() {
		const { summary, classes } = this.props
		return (
			<ExpansionPanel className={classes.root}>

				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
					<Typography variant="button">{summary}</Typography>
				</ExpansionPanelSummary>
			
				<ExpansionPanelDetails >
					<GenericTable {...this.props} handleActionBtn={this.handleActionBtn}/>
				</ExpansionPanelDetails>

			</ExpansionPanel>
		)
	}
}

ReportPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportPanel);