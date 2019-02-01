import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBar';

const styles = () => ({
    statusBarStyles: {
        height: "30px", 
        width: "129px", 
        border: "1px solid #dddddd", 
        paddingLeft: "6px", 
        paddingTop: "2px", 
        paddingRight: "10px"
    },
})


class StatusBar extends PureComponent {
    render() {

        const { status, progress, compliance, classes } = this.props

        const getStatusBarStyles = (status) => {
            switch (status) {
                case "active": 
                   return {backgroundColor: "#ffffff", fontSize: "18px", paddingTop: "2px"}; break
                case "awaiting review": 
                   return {backgroundColor: "#eeeeee", fontSize: "18px", paddingTop: "2px"}; break
                case "actioned": 
                   return {backgroundColor: "#eeeeee", fontSize: "15px", paddingTop: "5px"}; break
               case "delayed": 
                   return {backgroundColor: "#ffc200", fontSize: "15px", paddingTop: "5px"}; break
               case "cancelled":
                   return {backgroundColor: "#ff0000", fontSize: "15px", paddingTop: "5px"}; break
               case "archived":
                   return {backgroundColor: "#aaaaaa", color: "#666666", fontSize: "15px", paddingTop: "5px"}; break
               default:
                   return {backgroundColor: "#ffffff", fontSize: "15px", paddingTop: "5px"};
            }
        }

        return (

            <div className={classes.statusBarStyles} style={getStatusBarStyles(status)} >
                {status === "active" || status === "awaiting review" ? 
                    <ProgressBar {...this.props} /> 
                : status}       
            </div>

        )
    }
}

export default withStyles(styles)(StatusBar)