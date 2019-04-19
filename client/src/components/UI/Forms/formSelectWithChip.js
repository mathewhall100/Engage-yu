import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Input, InputLabel, MenuItem, FormControl, Select, Chip} from '@material-ui/core';

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'wrap',    
	},
	formControl: {
		minWidth: 120,
		maxWidth: 400,
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


class FormSelectWithChip extends Component {
	
	state = {
		selected: this.props.initialSelected,
	};

	handleChange = event => {
		this.setState({ selected: event.target.value });
		this.props.selected(event.target.value)
	};

	render() {
		const { classes, menuItems, label, theme} = this.props;
		const { selected } = this.state;

		const getStyles = (item, selected) => {
			return {
                fontSize: "12px",
				fontWeight: selected  === item ? theme.typography.fontWeightRegular : theme.typography.fontWeightMedium
			}
		};
		 

		// FormSelectWithChip Select return
		return (
			<div className={classes.root}>
				<FormControl className={classes.formControl}>
				    <InputLabel htmlFor="inputLabel">{label}</InputLabel>
					<Select
						value={selected}
						onChange={this.handleChange}  
						input={<Input id="inputLabel" />}
						renderValue={selected => ( <Chip key={selected} label={selected} className={classes.chip}/> )}
						MenuProps={MenuProps}
					>
						{menuItems.map(item => (
							<MenuItem key={item} value={item} style={getStyles(item, selected)} >
								{item}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			</div>
		);
	}
}

FormSelectWithChip.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
	menuItems: PropTypes.array.isRequired,
	label: PropTypes.string
};

export default withStyles(styles, { withTheme: true })(FormSelectWithChip);