import React from 'react';
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

const ITEM_HEIGHT = 45;
const ITEM_PADDING_TOP = 8;

const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP,
			width: 150,
		},
	},
};

class DashboardMultipleSelect extends React.Component {
	
	state = {
		selection: [this.props.menuItems[0]],
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
		 

		// DashboardMultipleSelect return
		return (
			<div className={classes.root}>
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

DashboardMultipleSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DashboardMultipleSelect);