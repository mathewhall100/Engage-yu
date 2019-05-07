import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Typography,ExpansionPanel,ExpansionPanelSummary,ExpansionPanelDetails } from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import ReportPanelTable from './ReportPanelTable'

const styles = (theme) => ({
  	root: {
		width: "100%",
	  },
	  expandIcon: {
        fontSize: "26px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
});

class ReportPanel extends Component {

	state = {
		popperClose: false
	}

	handleActionBtn = (btn, row) => {
        this.props.handleActionBtn(btn, row)
    }

	render() {

		const { summary, tableData, classes } = this.props

		return (
			<ExpansionPanel className={classes.root} > 

		<ExpansionPanelSummary expandIcon={<ExpandIcon className={classes.expandIcon}/>} onClick={() => this.setState({popperClose: true})} >
					<Typography variant="button">{summary}</Typography>
				</ExpansionPanelSummary>
			
				<ExpansionPanelDetails >
					{tableData && tableData.length > 0 ?
						<ReportPanelTable 
							{...this.props} 
							popperClose={this.state.popperClose} 
							handleActionBtn={this.handleActionBtn}
						/>
						: 
						<Typography 
							variant="body2" 
							gutterBottom>No diary cards to display
						</Typography>
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