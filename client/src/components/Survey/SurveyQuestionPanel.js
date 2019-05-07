import React, { Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import { withStyles, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, Checkbox, Typography} from '@material-ui/core';
import ExpandIcon from '@material-ui/icons/ExpandMore';
import ProviderName from '../UI/providerName'

const styles = theme => ({
	root: {
	},
	heading: {
		fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightMedium,
		marginLeft: "15px"
	},
	expandIcon: {
        fontSize: "26px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
});

const checkboxTheme = createMuiTheme({
		palette: {
				secondary: { main: '#009900' }, // This is just green.A700 as hex.
			},
})

const SurveyCustomQuestionPanel = (props) => {

	const { classes, noBorder, checked, question } = props;
		
		return (
				<ExpansionPanel className={classes.root} style={{boxShadow: noBorder ? "none" : null}}>

					<ExpansionPanelSummary expandIcon={<ExpandIcon className={classes.expandIcon}/> } >
						<MuiThemeProvider theme={checkboxTheme}>
							<Checkbox  checked={checked} onClick={(event) => props.handleCheckBoxClick(event, question)} style={{padding: 0}}/>  
						</MuiThemeProvider>
							<Typography inline className={classes.heading}>{question.question}</Typography>
					</ExpansionPanelSummary>
				
					<ExpansionPanelDetails>
							<Typography variant="subtitle2" style={{marginTop: "-8px"}}>
					<table>
						<tbody>
							{question.answers.map((ans, index) => 
								<tr key={index}>
									<td style={{width: '36px'}}></td>
									<td>{index+1}. {ans[0].toUpperCase() + ans.slice(1)}</td>
								</tr>		
							)}
						</tbody>
					</table>

					<br />

					<span style={{marginLeft: "40px"}}>
						{question.added_by ? 
							<Fragment>
								Added by &nbsp;
								<ProviderName 
									title={question.added_by.title} 
									firstname={question.added_by.firstname}
									lastname={question.added_by.lastname}
								/>
								&nbsp; on {moment(question.date_added).format("MMM Do YYYY")}
							</Fragment>
							:
							`Default question`
						}			
					</span>

				</Typography>
					</ExpansionPanelDetails>

				</ExpansionPanel>
	);
}

SurveyCustomQuestionPanel.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SurveyCustomQuestionPanel);