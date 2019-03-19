import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableGeneric from '../UI/Tables/tableGeneric'

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

		const { summary, tableData, classes } = this.props

		return (
			<ExpansionPanel className={classes.root}>

				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} >
					<Typography variant="button">{summary}</Typography>
				</ExpansionPanelSummary>
			
				<ExpansionPanelDetails >
					{tableData && tableData.length > 0 ?
						<TableGeneric {...this.props} handleActionBtn={this.handleActionBtn}/>
						: 
						<Typography variant="body2" gutterBottom>No diary cards to display</Typography>
					}
				</ExpansionPanelDetails>

			</ExpansionPanel>
		)
	}
}

ReportPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ReportPanel);