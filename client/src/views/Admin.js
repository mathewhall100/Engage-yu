import React, { Component, Fragment} from 'react';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Console from '../components/Console/Console';
import Account from '../components/Account/Account';
import Appbar from '../AppBar';
import Footer from '../components/Footer/Footer';

const styles = theme => ({
    root: { 
        flexGrow: 1,
        minWidth: "1160px",
        maxWidth: "1600px",
        margin: "0 auto",
        position: 'relative',
        minHeight: "100vh"
    },
    container: {
        paddingBottom: "80px" // footer height
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: '100%',
        height: "80px"
    }
});


class Admin extends Component {   
    
    render () {

        const { classes, account} = this.props;

        return (
            <Fragment>
                <CssBaseline />
                <div className={classes.root}>
                    <div className={classes.container}>
                        <Appbar />
                        {account ? <Account /> : <Console />  }
                    </div>
                    <div  className={classes.footer}>
                        <br />
                        <Footer />
                    </div>
                </div >
            </Fragment>
        );
    }
}

export default withStyles(styles)(Admin);

