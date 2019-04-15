import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';

const styles = theme => ({

})


class AccountViewStats extends Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                View Stats
            </div>
        )
    }
}

AccountViewStats = withStyles(styles)(AccountViewStats)
export default AccountViewStats