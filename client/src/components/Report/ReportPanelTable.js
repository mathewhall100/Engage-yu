import React, {Component, Fragment}  from 'react';
import { startCase, isEmpty, isEqual } from 'lodash'
import moment from 'moment'
import PropTypes from 'prop-types';
import { withStyles,Table, Typography, TableHead, TableBody, TableCell, TableRow, TablePagination, TableSortLabel } from '@material-ui/core';
import NoteIcon from '@material-ui/icons/EventNote'
import { stableSort, getSorting } from '../../logic/tableSortFunctions';
import BtnActionGroup from '../UI/Buttons/btnActionGroup';
import BtnCloseIcon from '../UI/Buttons/btnCloseIcon'
import HrStyled from '../UI/hrStyled'
import PopperCustom from '../UI/popperCustom'

const styles = (theme) =>  ({
    root: {
        width: "100%"
    },
    tableCellItem: {
        '&:hover': {
            cursor: "pointer",
            backgroundColor: "#EEE"
        }
    },
    noteIcon: {
        position: "relative",
        top: "-6px", 
        fontSize: "20px", 
        color: "#888",
        '&:hover': {
            color: "#2d404b"
        }
    }
})

const CustomTableCell = withStyles(theme => ({
    head: {
        padding: "5px", 
    },
    body: {
        padding: "5px",
        fontSize: 14,
        '&:hover': {
            borderRadius: "8px",
        }
    },
  }))(TableCell);


class ReportPanelTable extends Component {

    componentWillReceiveProps(nextProps) {
        if (nextProps.popperClose) {this.setState({popperOpen: false}) }
    }

    state = {
        anchorEl: null,
        popperOpen: false,      
        popperContent: null,
        popperIndex: [],
        arrowRef: null,
        order: 'desc',
        orderBy: 'start',
        page: 0,
        rowsPerPage: 5,
    }

    createSortHandler = col => event => {
        const orderBy = col;
        let order = 'desc';
        if (this.state.orderBy === col && this.state.order === 'desc') {order = 'asc'}
        this.setState({ order, orderBy });
    };

    // Popper arrow 
    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    // event handlers
    handleElemClick = (event, heading, row, popperIndex) => {
        if (!this.state.popperOpen || !isEqual(popperIndex, this.state.popperIndex)) {
            const { currentTarget } = event;
            let msg = {};
            let popperContent;
            this.setState({popperOpen: false}) 
            msg = row.messages.filter(msg => msg.msg_id === heading.slice(0, -3).toLowerCase())[0]
            if (msg) {
                popperContent = 
                    <Fragment>
                        <Typography variant="subtitle2" inline>{heading.slice(0, -3).toUpperCase()} MESSAGE</Typography>
                        <span style={{float: 'right', marginTop: "-16px", marginLeft: "4px"}}><BtnCloseIcon handleBtnClick={this.handleElemLeave}/></span> 
                        <HrStyled /><br />
                        <Typography variant="subtitle2" gutterBottom>
                        <table>
                            <tbody>
                                <tr><td>Sent by: </td><td>{row[heading]}</td></tr>
                                <tr><td>Sent at: </td><td>{moment(msg.msg_date).format("MMMM Do YYYY, h:mm:ss a")}</td></tr>
                                <tr><td>Recipient: </td><td>{startCase(this.props.patient)}</td></tr>
                                <tr><td>Status: </td><td>{msg.read ? `Read on ${moment(msg.time_read).format("MMMM Do YYYY, h:mm:ss a")}` : `Not yet read by recipient`}</td></tr>
                            </tbody>
                        </table>
                        </Typography>
                        <br /> 
                        <Typography variant="subtitle2" style={{fontWeight: "bold"}} gutterBottom>{startCase(msg.msg_title)}</Typography>  
                        <Typography variant="subtitle2" gutterBottom align="justify">{msg.msg_body}</Typography> 
                        <br />
                        
                    </Fragment>
                } else {
                    popperContent = <Typography variant="subtitle2" align="center">NO MESSAGE TO SHOW</Typography>    
                }
            this.setState(state => ({
                anchorEl: currentTarget,
                popperContent,
                popperIndex,
                popperOpen: true
            }));
        } else {
            this.setState({popperOpen: false}) 
        }
    };

    handleElemLeave = event =>  {
        this.setState(state => ({popperOpen: false}))
    }

    handleActionBtn = (btn, _id) => {
        this.props.handleActionBtn(btn, _id)
    };

    handleChangePage = (event, page) => {
        this.setState({ page })
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value })
    };


    render () {
        const { classes, activeEpisode, tableHeadings, tableData, lastCellHeading, lastCellData } = this.props;
        const { order, orderBy, rowsPerPage, page, popperContent, popperOpen, anchorEl } = this.state;

        const getTableCell = (row, idx) => {
            for (var key in row) {
                if (key === tableHeadings[idx]) 
                return  <Typography inline>{row[key]}</Typography>
            } 
        };

        const RenderPopperContent = () => {
            if (!isEmpty(popperContent)) return <span>{popperContent}</span>
        }

        return (
            <div className={classes.root}>

                <Table aria-labelledby="tableTitle" >

                    <TableHead>
                        <TableRow>
                            { tableHeadings.map(col => {
                                return (
                                    <CustomTableCell key={col}
                                        sortDirection={orderBy === col ? order : false}>
                                        <TableSortLabel
                                            active={orderBy === col}
                                            direction={order}
                                            onClick={this.createSortHandler(col)}
                                        >
                                            <Typography variant="subtitle2">{startCase(col)}</Typography>
                                        </TableSortLabel>
                                    </CustomTableCell>
                                );
                            } )}
                            <CustomTableCell align="right" style={{paddingRight: "5px"}}>
                                <Typography variant="subtitle2">{lastCellHeading}</Typography>
                            </CustomTableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { stableSort(tableData, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index)  => {
                                return (
                                    <TableRow key={index} style={{backgroundColor: row._id === activeEpisode ? "#EEE" : "#FFF"}}>
                                        {tableHeadings.map((heading, idx) => {
                                            return (
                                                <CustomTableCell key={idx}>
                                                    {getTableCell(row, idx)}
                                                    {(
                                                        (heading === "requested by" && !isEmpty(row.messages.filter(msg => msg.msg_id === "requested")))
                                                        ||
                                                        (heading === "actioned by" && !isEmpty(row.messages.filter(msg => msg.msg_id === "actioned")))
                                                        ||
                                                        (heading === "archived by" && !isEmpty(row.messages.filter(msg => msg.msg_id === "archived")))
                                                        || 
                                                        (heading === "cancelled by" && !isEmpty(row.messages.filter(msg => msg.msg_id === "cancelled")))
                                                    ) ? 
                                                        <NoteIcon 
                                                            onClick={(event) => this.handleElemClick(event, heading, row, [index, idx])}
                                                            className={classes.noteIcon}
                                                        />
                                                        : 
                                                        null
                                                    }
                                                </CustomTableCell>
                                            )
                                        } )}
                                        <CustomTableCell align="right" style={{paddingRight: "5px"}}>
                                            <BtnActionGroup 
                                                actions={lastCellData} 
                                                row={row} 
                                                align={"right"} 
                                                handleActionBtn={this.handleActionBtn}

                                            />
                                        </CustomTableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>

                </Table>

                {tableData.length > 4 && 
                    <TablePagination
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                }

                <PopperCustom anchorEl={anchorEl} placement="top" width="320px" popperContent={popperContent} popperOpen={popperOpen}> 
                    <RenderPopperContent />
                </PopperCustom>

            </div>
        );
    }
}

ReportPanelTable.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default  withStyles(styles, { withTheme: true })(ReportPanelTable);