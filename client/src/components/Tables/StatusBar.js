import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ProgressBar from './ProgressBar';

const styles = () => ({
    statusBarStyles: {
        height: "30px", 
        width: "132px", 
        border: "1px solid #dddddd", 
        paddingLeft: "6px", 
        paddingTop: "2px", 
        paddingRight: "10px"
    },
})


class StatusBar extends PureComponent {
   

    render() {
        
        //console.log("Render status bar: ", this.props.adjustedStatus)

        const { adjustedStatus, classes } = this.props

        const getStatusBarStyles = (adjustedStatus) => {
            switch (adjustedStatus) {
                case "active": 
                   return {backgroundColor: "#ffffff", fontSize: "18px", paddingTop: "2px"}
                case "awaiting review": 
                   return {backgroundColor: "#eeeeee", fontSize: "18px", paddingTop: "2px"}
                case "actioned": 
                   return {backgroundColor: "#eeeeee", fontSize: "15px", paddingTop: "5px"}
               case "delayed": 
                   return {backgroundColor: "#ffc200", fontSize: "15px", paddingTop: "5px"}
               case "cancelled":
                   return {backgroundColor: "#ff0000", fontSize: "15px", paddingTop: "5px"}
               case "archived":
                   return {backgroundColor: "#aaaaaa", color: "#666666", fontSize: "15px", paddingTop: "5px"}
               default:
                   return {backgroundColor: "#ffffff", fontSize: "15px", paddingTop: "5px"};
            }
        }

        return (

            <div className={classes.statusBarStyles} style={getStatusBarStyles(adjustedStatus)} >
                {adjustedStatus === "active" || adjustedStatus === "awaiting review" ? 
                    <ProgressBar {...this.props} /> 
                : <span>
                    {adjustedStatus}...
                </span>}       
            </div>

        )
    }
}

export default withStyles(styles)(StatusBar)