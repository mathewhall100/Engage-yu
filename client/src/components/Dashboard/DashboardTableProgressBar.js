import React, { PureComponent } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { times } from 'lodash'

const styles = () => ({
    progressBarStyles: {
        textShadow: "1px 0", 
        fontWeight: 600
    }
})


class DashboardTableProgressBar extends PureComponent {
    
    createProgressBar = (progress) => {
        let str = ""
        if (progress === 0) {return null}
        if (progress > 1) {progress = 1}
        times(Math.round(progress*26), (index) => {
            str += "|"
        })
        //console.log("Status marker: ", str)
        return str
    }

    render() {
        // console.log("Render progress bar: ", this.props.progress, " ", this.props.compliance)
        const { progress, compliance, classes } = this.props

        const getProgressBarStyles = (compliance) => {
            if (compliance >= 0.9) {return {color: "green"}}
               else if (compliance >= 0.7) {return {color: "#ffc200"}}
               else return {color: "red"};
        }

        return (
            <span className={classes.progressBarStyles} style={getProgressBarStyles(compliance)}>
                {this.createProgressBar(progress)}
            </span>
        )
    }
}

export default withStyles(styles)(DashboardTableProgressBar)
