import React, { Component, Fragment } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
    root: {
        margin: "0 24px 0 0", 
        [theme.breakpoints.down('md')]: {
            marginLeft: "24px"
        }
    },
})

class Footer extends Component {
    render() {
        const { classes } = this.props
        return (
            <Fragment>
                <Typography variant="subtitle1" align="center" color="secondary"><span style={{fontSize: "20px"}}>&copy;</span> Engage-Yu 2019</Typography>
                <Typography variant="subtitle1" align="center" color="secondary" gutterBottom>Patient engagement solutions for Parkinson disease.</Typography>
            </Fragment>
        )
    }
}
Footer = withStyles(styles, { withTheme: true })(Footer);
export default Footer