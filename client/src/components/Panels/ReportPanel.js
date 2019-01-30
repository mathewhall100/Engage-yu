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
  	panel: {
		width: "100%",
  	},
});

class GenericPanel extends Component {

	handleActionBtn = (btn, row) => {
        this.props.actionBtnAction(btn, row)
    }

	render() {
		const { summary, classes } = this.props
		return (
			<ExpansionPanel className={classes.panel}>

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

GenericPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GenericPanel);