import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Input, InputLabel, MenuItem, FormControl, Select, Chip} from '@material-ui/core';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',    
	},
	formControl: {
		margin: theme.spacing.unit,
		minWidth: 120,
		maxWidth: 400,
	},
	chips: {
		display: "flex",
		flexWrap: "wrap",
	},
	chip: {
		color: theme.palette.primary.main,
		fontWeight: 500
	}
});

const MenuProps = {
	PaperProps: {
		style: {
			width: 150,
		},
	},
};

class FormMultipleSelectWithChips extends React.Component {
	
	state = {
		selection: this.props.initialStatus,
	};

	handleChange = event => {
		this.setState({ selection: event.target.value });
		this.props.selectStatus(event.target.value)
	};

	render() {
		const { classes, theme } = this.props;
		const { selection } = this.state

		const getStyles = (item, selection) => {
			return {
				fontWeight: selection.indexOf(item) === -1 ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
			}
		 };
		 

		return (
			<div className={classes.root}>
			{console.log("selection: ", selection)}
				<FormControl className={classes.formControl}>
				<InputLabel htmlFor="select-multiple-chip">Filter by status</InputLabel>
					<Select
						multiple
						value={selection}
						onChange={this.handleChange}  
						input={<Input id="select-multiple-chip" />}
						renderValue={selection => (
							<div className={classes.chips}>
								{selection.map(selected => (
									<Chip key={selected} label={selected} className={classes.chip}/>
								))}
							</div>
						)}
						MenuProps={MenuProps}
					>
						{this.props.menuItems.map(item => (
							<MenuItem key={item} value={item} style={getStyles(item, selection)} >
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		);
	}
}

FormMultipleSelectWithChips.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(FormMultipleSelectWithChips);