import React , { PureComponent } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        margin: "50px 200px"
    },
    progress: {

    }
})

class Callback extends PureComponent {

    render () {
        const { classes } = this.props        
        return(
            <div className={classes.root}>
                Loading...
                <br />
                <br />
                <CircularProgress className={classes.progress} color="primary" />
            </div>
        )
    }
}

export default withStyles(styles)(Callback);