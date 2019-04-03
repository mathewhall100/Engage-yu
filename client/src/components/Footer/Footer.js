import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from "@material-ui/core/styles"

const styles = (theme) => ({
    root: {
        margin: "0 24px 0 0", 
        borderTop: "2px solid", 
        borderColor: theme.palette.primary.dark,
        [theme.breakpoints.down('md')]: {
            marginLeft: "24px"
        }
    },
})

class Footer extends Component {
    render() {
        const { classes } = this.props
        return (
            <div className={classes.root}> 
                <br />
                <Typography variant="subtitle1" align="center" color="primary"><span style={{fontSize: "20px"}}>&copy;</span> Engage-Yu 2019</Typography>
                <br />
            </div>
        )
    }
}
Footer = withStyles(styles, { withTheme: true })(Footer);
export default Footer

