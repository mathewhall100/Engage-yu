import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import DiaryIcon from '@material-ui/icons/ListAlt';
import ReportIcon from '@material-ui/icons/BarChart';
import EditIcon from '@material-ui/icons/Edit';
import ContactIcon from '@material-ui/icons/ContactMail';

const styles = (theme) => ({
    actionIcon: {
        color: "#888888",
        fontSize: "24px",
        margin: "6px 0 0 20px",
        '&:hover': {
            color: theme.palette.primary.dark
        },
    },
    customWidth: {
        maxWidth: "100px",
    },
  });

class ActionIconGroup extends PureComponent {

    handleBtnClick = (event, btn, _id) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.props.handleActionBtn(btn, _id)
    }

    render() {
        const { _id, classes } = this.props
        return (
            <React.Fragment>
                <Tooltip title="New diary card" classes={{tooltip: classes.customWidth}} >
                    <DiaryIcon className={classes.actionIcon} onClick={(event) => this.handleBtnClick(event, "new survey", _id)} />
                </Tooltip>
                <Tooltip title="View reports" classes={{tooltip: classes.customWidth}} >
                    <ReportIcon className={classes.actionIcon} onClick={(event) => this.handleBtnClick(event, "view reports", _id)} />
                </Tooltip>
                <Tooltip title="Edit patient details" classes={{tooltip: classes.customWidth}} >
                    <EditIcon className={classes.actionIcon} onClick={(event) => this.handleBtnClick(event, "edit details", _id)} />
                </Tooltip>
                <Tooltip title="Contact patient" classes={{tooltip: classes.customWidth}} >
                    <ContactIcon className={classes.actionIcon}  onClick={(event) => this.handleBtnClick(event, "contact", _id)} />  
                </Tooltip>
            </React.Fragment>
        )
    }
}

ActionIconGroup.propTypes = {
    classes: PropTypes.object.isRequired,
};
  
export default  withStyles(styles)(ActionIconGroup);