import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { times } from 'lodash'

const styles = () => ({
    progressBarStyles: {
        textShadow: "1px 0", 
        fontWeight: 600
    }
})


class ProgressBar extends PureComponent {
    
    createProgressBar = (progress, compliance) => {
        let str = ""
        if (progress < 1) {return null}
        if (progress > 100) {progress = 100}
        times(Math.round(progress/4), (index) => {
            str += "|"
        })
        return str
    }
    render() {
        const { progress, compliance, classes } = this.props

        const getProgressBarStyles = (compliance) => {
            if (compliance >= 90) {return {color: "green"}}
               else if (compliance >= 70) {return {color: "#ffc200"}}
               else return {color: "red"};
        }

        return (
            <span className={classes.progressBarStyles} style={getProgressBarStyles(compliance)}>
                {this.createProgressBar(progress)}
            </span>
        )
    }
}

export default withStyles(styles)(ProgressBar)
