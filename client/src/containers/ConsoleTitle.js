import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const styles = (theme) => ({
    consoleTitle: {
		fontWeight: 500,
		paddingLeft: "4px",
		[theme.breakpoints.up('lg')]: {
			paddingTop: "10px",
		}, 
	},
})

class ConsoleTitle extends Component {


    render () {

        const { classes } = this.props

        if (!this.props.consoleTitle) {
            return <div>Dashboard</div>;
        }

        return (
            <Typography variant="h5" className={classes.consoleTitle}>
                {this.props.consoleTitle.title}
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