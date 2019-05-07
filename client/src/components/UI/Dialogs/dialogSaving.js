import React from 'react';
import PropTypes from 'prop-types';
import { Dialog, DialogContent, DialogTitle, withMobileDialog}from '@material-ui/core';
import CallBack from '../callback'


class DialogSaving extends React.Component {
	
	state = {
		open: true
	};

	render() {
		const { fullScreen } = this.props;

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
						width: "600px",
						maxWidth: "60%"
					}
				}}
			>
				<DialogTitle id="responsive-dialog-title"> </DialogTitle>
				<DialogContent>
					<CallBack text="Saving..." />
				</DialogContent>
			</Dialog>
		);
	};
};

DialogSaving.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(DialogSaving);