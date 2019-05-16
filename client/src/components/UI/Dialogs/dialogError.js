import React from 'react';
import PropTypes from 'prop-types';
import { withMobileDialog, Typography}from '@material-ui/core'
import BtnAction from '../Buttons/btnAction'
import BtnActionLink from '../Buttons/btnActionLnk'
import DialogCustom from './dialogCustom'


class DialogError extends React.Component {
	
	state = {
		open: true
	};

	closeDialog = () => {
		this.props.closeDialog()
	}
	

	render() {
		const { text, cancelUrl } = this.props;

		return (
			<DialogCustom title="Operation failed!" width="600px">
				<Typography variant="subtitle1" gutterBottom>{text}</Typography>
				<Typography variant="subtitle1">Click 'Return' to review and try again, or 'Cancel' to quit</Typography>
				<br/><br />
					<BtnAction type="button" text="try again" marginRight={true} handleAction={this.closeDialog} /> 
					<BtnActionLink url={cancelUrl} text="cancel" warning={true}/>
				<br />
			</DialogCustom>
		);
	};
};

DialogError.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	cancelUrl: PropTypes.string.isRequired,
};

export default withMobileDialog()(DialogError);