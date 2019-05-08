import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button, withMobileDialog, Typography}from '@material-ui/core'
import DialogCustom from './dialogCustom'


class DialogError extends React.Component {
	
	state = {
		open: true
	};

	render() {
		const { text, cancelUrl } = this.props;

		return (
			<DialogCustom title="Opertaion failed!" width="600px">
				<Typography variant="subtitle1" gutterBottom>{text}</Typography>
				<Typography variant="subtitle1">Click 'Return' to review and try again, or 'Cancel' to quit</Typography>
				<br/><br />
					<Button color="primary" autoFocus onClick={() => this.setState({ open: false }) }>Try again</Button> 
					<Button color="primary" component={Link} to={cancelUrl} >Cancel</Button>
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