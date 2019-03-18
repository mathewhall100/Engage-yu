import React, { PureComponent } from 'react'
import { withStyles } from "@material-ui/core/styles"
import Typography from '@material-ui/core/Typography'
import ActionLnk from '../Buttons/actionLnk'
import ActionBtn from '../Buttons/actionBtn'

const styles = theme => ({
    root: {
        maxWidth: "920px",
        display: 'flex', 
        flexDirection: 'row'
    },
    textPosn: {
        margin: '20px 40px 0 40px'
    },
    selectPosn: {
        marginRight: "40px"
    },
    btn: {
        height: "26px", 
        margin: "20px 12px 20px 16px"
    }
});  

class FindForm extends PureComponent {

    render () {
        const { classes, title, select, url, btn, submitting, pristine } = this.props
        return (
            <div className={classes.root}>   
                <Typography variant="h6" className={classes.textPosn}>{title}</Typography>
                <span className={classes.selectPosn}>
                    {select} 
                </span>
                <span className={classes.btn} >
                    <ActionBtn type="submit" disabled={submitting || pristine} text="submit" />
                </span>
                <Typography variant="h6" className={classes.textPosn}>or</Typography>
                <span className={classes.btn} >
                    <ActionLnk url={url} disabled={false} text={btn} />
                </span>
            </div>
        )
    }
}

export default withStyles(styles)(FindForm)