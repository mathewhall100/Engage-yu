import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import { startCase } from 'lodash';
import { withStyles, Typography, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination} from '@material-ui/core';
import BtnActionGroup from '../Buttons/btnActionGroup';
import BtnActionIcons from '../Buttons/btnActionIcons';
import { stableSort, getSorting } from '../../../logic/tableSortFunctions';

const styles = () =>  ({
    root: {
        width: "100%"
    }
});

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
    };

    createSortHandler = col => event => {
        const orderBy = col;
        let order = 'desc';
        if (this.state.orderBy === col && this.state.order === 'desc') {order = 'asc'}
        this.setState({ order, orderBy });
    };

    handleRowClick = (row) => {
        console.log("row clicked: ", row)
        if (this.props.hover) {this.props.handleRowClick(row)}
    };

    handleActionBtn = (btn, _id) => {
        this.props.handleActionBtn(btn, _id)
    };

    handleChangePage = (event, page) => { this.setState({ page }) };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render () {
        const { classes, tableHeadings, tableData, lastCellRightAlign=false, lastCellHeading, lastCellData, hover=false  } = this.props;
        const { order, orderBy, rowsPerPage, page } = this.state;

        const getLastCell = (row) => {
            switch (lastCellData[0]) {
                case "report actions":
                    return <BtnActionGroup actions={lastCellData[1]} row={row} align={"right"} handleActionBtn={this.handleActionBtn} /> 
                case "find actions":
                    return <BtnActionIcons _id={row._id} handleActionBtn={this.handleActionBtn} /> 
                default: return <Typography>{lastCellData[0]}</Typography>
            }
        };

        const getTableCell = (row, idx) => {
            for (var key in row) {
                if (key === tableHeadings[idx]) 
                return  <CustomTableCell>
                            <Typography>{row[key]}</Typography>
                        </CustomTableCell>
            } 
        };

        // GenericTable component return
        return (
            <div className={classes.root}>

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
                                <CustomTableCell align="right" style={{paddingRight: 0}}>
                                    <Typography variant="subtitle2">{lastCellHeading}</Typography>
                                </CustomTableCell>
                            }
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        { stableSort(tableData, getSorting(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, idx)  => {
                                return (
                                    <TableRow key={idx} hover={hover} onClick={event => this.handleRowClick(row)} tabIndex={-1} >
                                        { tableHeadings.map((heading, idx) => {
                                            return (
                                                <React.Fragment key={idx}>
                                                    {getTableCell(row, idx)}
                                                </React.Fragment>
                                            )
                                        } )}

                                        { lastCellRightAlign && 
                                            <CustomTableCell align="right" style={{paddingRight: 0}}>
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
    tableHeadings: PropTypes.array,
    tableData: PropTypes.array.isRequired,
    lastCellRightAlign: PropTypes.bool,
    lastCellHeading: PropTypes.string,
    lastCellData: PropTypes.node,
    hover: PropTypes.bool
};

export default  withStyles(styles, { withTheme: true })(GenericTable);