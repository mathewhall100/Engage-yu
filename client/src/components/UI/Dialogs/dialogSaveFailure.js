import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, withMobileDialog, Typography}from '@material-ui/core';


class DialogSaveFailure extends React.Component {
	
	state = {
		open: true
	};

	render() {
		const { fullScreen, text, cancelUrl } = this.props;

		return (
			<Dialog
				fullScreen={fullScreen}
				open={this.state.open}
				disableBackdropClick 
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
				PaperProps={{
					style: {
					border: "2px solid  #28353d",
					borderRadius: "5px",
					padding: "20px 40px",
					width: "800px",
                    minWidth: "600px",
                    maxWidth: "60%"
					}
				}}
			>
				<DialogTitle id="responsive-dialog-title">Operation Failed!</DialogTitle>
				<DialogContent>
					<Typography variant="subtitle1" gutterBottom>{text}</Typography>
					<Typography variant="subtitle1">Click 'Return' to review and try again, or 'Cancel' to quit</Typography>
				</DialogContent>
				<DialogActions>
					<Button color="primary" autoFocus onClick={event => this.setState({ open: false }) }>Try again</Button> 
					<Button color="primary" component={Link} to={cancelUrl} >Cancel</Button>
				</DialogActions>
			</Dialog>
		);
	};
};

DialogSaveFailure.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	cancelUrl: PropTypes.string.isRequired,
};

export default withMobileDialog()(DialogSaveFailure);