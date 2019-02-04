import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Chip from '@material-ui/core/Chip'

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
		selected: this.props.menuItems[0],
	};

	handleChange = event => {
		this.setState({ selected: event.target.value });
		this.props.selected(event.target.value)
	};

	render() {
		const { classes, menuItems, label, theme } = this.props;
		const { selected } = this.state

		const getStyles = (item, selection) => {
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
};

export default withStyles(styles, { withTheme: true })(FormSelectWithChip);