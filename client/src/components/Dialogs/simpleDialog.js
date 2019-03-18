import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';


const styles = (theme) => ({
	root: {
		maxWidth: "600px"
	},
	btn: { 
        marginLeft: '0 15px 15px 0',
        backgroundColor: "#eeeeee",
        borderColor: theme.palette.primary.main,
        borderRadius: "5px",
        textDecoration: "none",
        '&:hover': {
            backgroundColor: "#dddddd",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
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
							<Button color="primary" className={classes.btn}onClick={() => this.setState({ open: false }) }>close</Button> 
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