import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import DiaryIcon from '@material-ui/icons/ListAlt'
import ReportIcon from '@material-ui/icons/BarChart'
import EditIcon from '@material-ui/icons/Edit'
import ContactIcon from '@material-ui/icons/ContactMail'

const styles = (theme) => ({
    actionIcon: {
        color: "#888888",
        fontSize: "24px",
        margin: "6px 0 0 20px",
        '&:hover': {
            color: theme.palette.primary.dark
        },
    }
  });

class ActionIconGroup extends PureComponent {

    handleBtnClick = (event, btn, row) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        this.props.handleActionBtn(btn, row)
    }

    render() {
        const { row, classes } = this.props
        return (
            <React.Fragment>
                <DiaryIcon className={classes.actionIcon} onClick={(event) => this.handleBtnClick(event, "new survey", row)} />
                <ReportIcon className={classes.actionIcon} onClick={(event) => this.handleBtnClick(event, "view reports", row)} />
                <EditIcon className={classes.actionIcon} onClick={(event) => this.handleBtnClick(event, "edit details", row)} />
                <ContactIcon className={classes.actionIcon}  onClick={(event) => this.handleBtnClick(event, "contact", row)} />  
            </React.Fragment>
        )
    }
}

ActionIconGroup.propTypes = {
    classes: PropTypes.object.isRequired,
  
};
  
export default  withStyles(styles)(ActionIconGroup);