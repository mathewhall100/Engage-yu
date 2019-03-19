import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography}from '@material-ui/core';


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

class DialogGeneric extends Component {
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

DialogGeneric.propTypes = {
	fullScreen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(DialogGeneric);