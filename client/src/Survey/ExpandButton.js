import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Button from "@material-ui/core/Button"
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"

const styles = ({
    expandBtn: {
        float: "right",
        backgroundColor: "white",
        fontSize: "14px", 
        '&:hover': {
            backgroundColor: "white",
        }
    },
    expandIconStyles: {
        fontSize: "24px",
        color: "#333",
      },
      collapseIconStyles: {
        fontSize: "24px",
        color: "#333",
        transform: "rotate(180deg)",
        transition: "transform 0.5s linear", 
      },
})


class ExpandButton extends PureComponent {  

    render () {

        const { toggle, i, classes } = this.props

        return (
            <Button 
                className={classes.expandBtn} 
                onClick={() => this.props.toggleCollapse(i)}
                >
                    <ExpandMoreIcon className={toggle ? classes.collapseIconStyles : classes.expandIconStyles}/>
            </Button>
        )
    }
};

export default withStyles(styles)(ExpandButton);