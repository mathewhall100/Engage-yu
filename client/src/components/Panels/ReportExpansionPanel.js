import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import moment from "moment";

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import color from '@material-ui/core/colors/deepPurple';

const styles = theme => ({
    root: {
        width: '100%',
        boxShadow: "none",
        marginTop: "5px" 
    },
    heading: {
        fontSize: theme.typography.pxToRem(16),
        fontWeight: theme.typography.fontWeightBold,
    },
    label: {

    },
    text: {

    },
    table: {
      minWidth: 1020,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    viewBtnAlone: {
        padding: "5px",
        float: "right",
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    viewBtnCompany: {
        padding: "5px",
        marginRight: "20px",
        float: "right",
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    archiveBtn: {
        padding: "5px",
        float: "right",
        color: "#ffffff",
        backgroundColor: "#2d404b",
        '&:hover': {
            backgroundColor: "#28353d",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
    cancelBtn: {
        float: 'right',
        color: "#ffffff",
        textDecoration: "none",
        backgroundColor: "#c62828",
        '&:hover': {
            backgroundColor: "#871c1c",
        },
        hover: {},
    },

  });

const CustomTableCell = withStyles(theme => ({
    head: {
        padding: "5px", 
    },
    body: {
        padding: "5px",
        width: "auto",
        fontSize: 14,
    },
  }))(TableCell);

class Panel extends Component {

    handleClickView = (event, id) => {
        console.log("episode id: ", id)
    };

    handleClickCancel = (event, id) => {
        console.log("episode id: ", id)
    };

    render () {

        const { classes } = this.props;
        const { tableData, actions } = this.props;
        console.log("tableData: ", tableData)

        return (
            <div className={classes.root}>
                <ExpansionPanel>

                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>{this.props.title}</Typography>
                    </ExpansionPanelSummary>

                    <ExpansionPanelDetails>
                        <Table className={classes.table} aria-labelledby="tableTitle">
                            <TableHead>
                                <TableRow>
                                    {this.props.tableHeadings.map(col => {
                                        return (
                                            <CustomTableCell key={col.id}>
                                                {col.label}
                                            </CustomTableCell>
                                        )
                                    })}
                                    <CustomTableCell >
                                        <span style={{float: "right"}}>Actions</span>
                                    </CustomTableCell>
                                    
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {this.props.tableData.map((n, nIndex) => {
                                    //console.log("n: ", tableData)
                                    return (
                                        <TableRow key={nIndex}>
                                            {n.map((i, iIndex) => {
                                               
                                                return ( 
                                                    iIndex > 0 ? (
                                                    <CustomTableCell key={iIndex}>
                                                        <Typography className={classes.text}>{i}</Typography>
                                                    </CustomTableCell>
                                                    ) : null
                                                )
                                            })}

                                            <CustomTableCell >
                                                {actions.indexOf("cancel") !== -1 &&
                                                    <Button size="small" className={classes.cancelBtn} onClick={event => this.handleClickCancel(event, n[0])}>Cancel</Button>}
                                                {actions.indexOf("archive") !== -1 &&
                                                    <Button size="small" className={classes.archiveBtn} onClick={event => this.handleClickArchive(event, n[0])}>Archive</Button>}
                                                {actions.indexOf("view") !== -1 && actions.length === 1 &&
                                                    <Button size="small" className={classes.viewBtnAlone} onClick={event => this.handleClickView(event, n[0])}>View</Button>}
                                                {actions.indexOf("view") !== -1 && actions.length > 1 &&
                                                    <Button size="small" className={classes.viewBtnCompany} onClick={event => this.handleClickView(event, n[0])}>View</Button>}
                                                
                                            </CustomTableCell>
                                        </TableRow>
                                    )
                                    })}
                            
                            </TableBody>
                        </Table>
                    </ExpansionPanelDetails>

                </ExpansionPanel>
            </div>
        );
    }
}

Panel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(Panel);