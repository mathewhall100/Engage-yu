import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Dialog, DialogContent, DialogTitle, withMobileDialog,} from '@material-ui/core';
import BtnCloseIcon from '../Buttons/btnCloseIcon'

const styles = theme => ({
	closeIcon: {
		float: "right",
		position: 'relative', top: "-4px", left: "16px",
	}
})


class DialogCustom extends Component {

	state = {
		open: true,
	};

	handleClose = () => {
		this.setState({open: false});
	};

	render() {
	const { classes, width="800px", title="", closeIcon=false } = this.props;

	return (
		<Dialog
			open={this.state.open}
			disableBackdropClick 
			onClose={this.handleClose}
			aria-labelledby="responsive-dialog-title"
			PaperProps={{
				style: {
					border: "4px solid #28353d",
					borderRadius: "5px",
					padding: "20px 40px",
					width: width,
                    maxWidth: "60%",
                    minWidth: "600px"
				}
			}}
			>
                {closeIcon && <span className={classes.closeIcon}><BtnCloseIcon handleBtnClick={this.handleClose}/></span>}
				<DialogTitle 
					id="responsive-dialog-title"
					style={{margin: closeIcon ? "-40px 0 10px 0" : "10px 0 10px 0"}}
				>
					{title}
				</DialogTitle>
				<DialogContent>
                    {this.props.children}
				</DialogContent>
			</Dialog>
		);
	}
}

DialogCustom = withStyles(styles)(DialogCustom)
export default withMobileDialog()(DialogCustom);