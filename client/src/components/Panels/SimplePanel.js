import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
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

const SimplePanel = (props) => {
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
}

SimplePanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimplePanel);