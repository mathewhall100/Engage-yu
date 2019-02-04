import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import ActionBtnGroup from '../Buttons/actionBtnGroup'
import ActionIconGroup from '../Buttons/actionIconGroup'

import { desc, stableSort, getSorting } from '../../logic/sortFunctions'

const CustomTableCell = withStyles(theme => ({
    head: {
        padding: "5px", 
    },
    body: {
        padding: "5px",
        fontSize: 14,
    },
  }))(TableCell);


class GenericTable extends Component {

    state = {
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

    handleRowClick = (row) => {
        console.log("row clicked: ", row)
        if (this.props.hover) {this.props.handleRowClick(row)}
    }

    handleActionBtn = (btn, row) => {
        this.props.handleActionBtn(btn, row)
    }

    handleChangePage = (event, page) => { this.setState({ page }) };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render () {

        const { tableHeadings, lastCellRightAlign, lastCellHeading, tableData, lastCellData, actions, hover, classes } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;

        const getLastCell = (row) => {
            switch (lastCellData[0]) {
                case "report actions":
                    return <ActionBtnGroup actions={lastCellData[1]} row={row} handleActionBtn={this.handleActionBtn} />; break
                case "find actions":
                    return <ActionIconGroup row={row} handleActionBtn={this.handleActionBtn} />; break
                default: return <Typography>{lastCellData[0]}</Typography>
            };
        };

        const getTableCell = (row, idx) => {
            for (var key in row) {
                if (key == tableHeadings[idx]) 
                return  <CustomTableCell>
                            <Typography>{row[key]}</Typography>
                        </CustomTableCell>
            } 
        }

        // GenericTable component return
        return (
            <div style={{width: "100%"}}>

                <Table aria-labelledby="tableTitle">

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
                            }, this)}
                            { lastCellRightAlign && 
                                <CustomTableCell align="right">
                                    <Typography variant="subtitle2">{lastCellHeading}</Typography>
                                </CustomTableCell>
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { stableSort(tableData, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(row  => {
                                return (
                                    <TableRow hover={hover} onClick={event => this.handleRowClick(row)} tabIndex={-1} key={row.id}>
                                        { tableHeadings.map((heading, idx) => {
                                            return (
                                                getTableCell(row, idx)
                                            )
                                        } )}

                                        { lastCellRightAlign && 
                                            <CustomTableCell align="right">
                                                {getLastCell(row)}
                                            </CustomTableCell>
                                        } 
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>

                </Table>

                { tableData.length > 5 && 
                    <TablePagination
                        component="div"
                        rowsPerPageOptions={[5, 10, 25]}
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />  }

            </div>
        );
    }
}

GenericTable.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default  withStyles({ withTheme: true })(GenericTable);