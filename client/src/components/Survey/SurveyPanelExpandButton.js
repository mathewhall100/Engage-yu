import React, { PureComponent } from 'react';
import { withStyles, Button } from '@material-ui/core'
import ExpandIcon from "@material-ui/icons/ExpandMore"

const styles = (theme) => ({
    expandBtn: {
        float: "right",
        marginTop: "-4px",
        backgroundColor: "white",
        fontSize: "14px", 
        '&:hover': {
            backgroundColor: "white",
        }
    },
    expandIconStyles: {
        fontSize: "26px",
        color: "#888",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
      collapseIconStyles: {
        fontSize: "26px",
        color: "#888",
        transform: "rotate(180deg)",
        transition: "transform 0.5s linear", 
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
})


class SurveyPanelExpandButton extends PureComponent {  

    render () {

        const { toggle, i, classes } = this.props

        return (
            <Button 
                className={classes.expandBtn} 
                onClick={() => this.props.toggleCollapse(i)}
                >
                    <ExpandIcon className={toggle ? classes.collapseIconStyles : classes.expandIconStyles}/>
            </Button>
        )
    }
};

export default withStyles(styles)(SurveyPanelExpandButton);