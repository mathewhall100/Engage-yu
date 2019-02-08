import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = () => ({
	root: {
		maxWidth: "600px"
	}
})

class SimpleDialog extends Component {
	state = {
		open: true
	};

	render() {
		const { classes, title, text} = this.props;

		return (
			
			<Dialog
				open={this.state.open}
				disableBackdropClick 
				onClose={this.handleClose}
				aria-labelledby="dialog-title"
				>
					<div className={classes.root}>
						<DialogTitle id="dialog-title">{title}</DialogTitle>
							<DialogContent>
								<Typography variant="subtitle1">
									{text}
								</Typography>
							</DialogContent>
						<DialogActions>
								<Button color="primary" onClick={() => this.setState({ open: false }) }>close</Button> 
						</DialogActions>	
					</div>
			</Dialog>
		
		);
	}
}

SimpleDialog.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(SimpleDialog);