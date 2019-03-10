import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';



const styles = theme => ({
  	root: {
  	},
  	heading: {
    	fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: "15px"
  	},
});

const checkboxTheme = createMuiTheme({
    palette: {
        secondary: { main: '#009900' }, // This is just green.A700 as hex.
      },
})

const CheckboxPanel = (props) => {
  	const { classes, noBorder, checked } = props;
  	return (
      	<ExpansionPanel className={classes.root} style={{boxShadow: noBorder ? "none" : null}}>

        	<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
				<MuiThemeProvider theme={checkboxTheme}>
					<Checkbox  checked={checked} style={{padding: 0}}/>  
				</MuiThemeProvider>
          		<Typography inline className={classes.heading}>{props.question}</Typography>
			</ExpansionPanelSummary>
        
        	<ExpansionPanelDetails>
          		<Typography variant="subtitle2" >
					<table>
						{props.answers.map((ans, index) => 
							<tr key={index}>
								<td style={{width: '100px'}}>
									{!index ? 'Options:' : null}
								</td>
								<td>
									{index+1} {ans}
								</td>
						</tr>		
						)}
					</table>
						
					<br /> <br />

					<span>Added by:  {props.addedBy}</span>
				</Typography>
        	</ExpansionPanelDetails>

      	</ExpansionPanel>
  );
}

CheckboxPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxPanel);