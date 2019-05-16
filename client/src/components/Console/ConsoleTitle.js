import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles, Typography } from '@material-ui/core'

const styles = (theme) => ({
    consoleTitle: {
		fontWeight: 500,
		paddingLeft: "10px",
		[theme.breakpoints.up('lg')]: {
			paddingTop: "10px",
		}, 
	},
})

class ConsoleTitle extends Component {

    render () {

        const { classes } = this.props

        return (
            <Typography variant="h5" className={classes.consoleTitle}>
                {this.props.consoleTitle ? this.props.consoleTitle.title : "Dashboard"}
            </Typography>
        );
    }
}

function mapStateToProps(state) {
    return {
        consoleTitle: state.consoleTitle,
    };
}   

export default connect(mapStateToProps)(withStyles(styles) (ConsoleTitle));