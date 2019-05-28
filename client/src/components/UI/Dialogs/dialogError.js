import React, { Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import { withMobileDialog, Typography, Dialog, DialogContent, DialogTitle }from '@material-ui/core'
import BtnAction from '../Buttons/btnAction'
import BtnActionLink from '../Buttons/btnActionLnk'
import BtnCloseIcon from '../Buttons/btnCloseIcon'

const styles = theme => ({
	closeIcon: {
		float: "right",
		position: 'relative', top: "-4px", left: "16px",
	}
})


class DialogError extends Component {
	
	state = {
		open: true
	};

	handleClose = () => {
		this.setState({open: false});
	};
	
	render() {
		const { classes, type="close", title="", text="", cancelUrl="#", closeIcon=false } = this.props;

		return (
			<Dialog
				open={this.state.open}
				disableBackdropClick 
				onClose={this.handleClose}
				aria-labelledby="responsive-dialog-title"
				PaperProps={{
					style: {
						border: "4px solid #d32f2f",
						borderRadius: "5px",
						padding: "20px 40px",
						width: "660px",
					}
				}}
			>
				{closeIcon && <span className={classes.closeIcon}><BtnCloseIcon handleBtnClick={this.handleClose}/></span>}

				<DialogTitle 
					id="responsive-dialog-title"
					style={{margin: closeIcon ? "-40px 0 10px 0" : "10px 0 10px 0"}}
				>
					{title ? title : "Operation failed!"}
				</DialogTitle>

				<DialogContent>
					<Typography variant="subtitle1" gutterBottom>
						{text ? text : "Whoops! Something went wrong and the requested action could not be performed at this time. This is likely temporary,  so please try refreshing the browser or trying again shortly."}
					</Typography>
					{type === "try cancel" ? 
						<Fragment>
							<Typography variant="subtitle1" guttterBottom>Click 'Return' to review and try again, or 'Cancel' to quit</Typography>
							<br/><br />
								<BtnAction type="button" text="try again" marginRight={true} handleAction={this.handleClose} /> 
								<BtnActionLink url={cancelUrl} text="cancel" warning={true}/>
							<br />
						</Fragment>
						:
						<Fragment>
							<br/><br />
								<BtnAction type="button" text="close" marginRight={true} handleAction={this.handleClose} /> 
							<br />
						</Fragment>
					}
				</DialogContent>

			</Dialog>
		);
	};
};

DialogError.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
	text: PropTypes.string.isRequired,
	cancelUrl: PropTypes.string.isRequired,
};

export default withMobileDialog()(DialogError);