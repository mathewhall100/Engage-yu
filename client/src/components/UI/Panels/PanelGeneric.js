import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
		root: {
			width: '100%',
				marginBottom: "15px"
		},
		heading: {
			fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: "15px"
		},
});

const PanelGeneric = (props) => {
	const { classes, title, content} = props;
	
	return (
		<ExpansionPanel className={classes.root}>
			<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<Typography inline className={classes.heading}>{title}</Typography>
			</ExpansionPanelSummary>
			<ExpansionPanelDetails>
					<Typography variant="subtitle2" >{content}</Typography>
			</ExpansionPanelDetails>
		</ExpansionPanel>
	);
};

PanelGeneric.propTypes = {
	classes: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
};

export default withStyles(styles)(PanelGeneric);