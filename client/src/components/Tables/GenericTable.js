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
import ActionBtnGroup from '../Buttons/actionBtnGroup'


const styles = theme => ({
    table: {
        width: "100%",
        minWidth: 1020,
    },
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

    handleActionBtn = (btn, row) => {
        this.props.handleActionBtn(btn, row)
    }

    render () {

        const { tableHeadings, lastCellRightAlign, lastCellHeading, tableData, lastCellData, actions, classes } = this.props;
        //console.log("tableData: ", tableData)

        const getLastCell = (row) => {
            if (actions) {
                return <ActionBtnGroup actions={actions} row={row} handleActionBtn={this.props.handleActionBtn} />
            }
            else {return lastCellData}
        }

        return (
            <Table className={classes.table} aria-labelledby="tableTitle">

                <TableHead>
                    <TableRow>
                        {tableHeadings.map(col => {
                            return (
                                <CustomTableCell key={col}>
                                    <Typography variant="subtitle2">{startCase(col)}</Typography>
                                </CustomTableCell>
                            )
                        })}
                        {lastCellRightAlign && 
                            <CustomTableCell align="right">
                                <Typography variant="subtitle2">{lastCellHeading}</Typography>
                            </CustomTableCell>
                        }
                    </TableRow>
                </TableHead>

                <TableBody>
                    {tableData.map((row, rowIndex) => {
                        return (
                            <TableRow key={rowIndex}>
                                {row.map((col, colIndex) => {
                                    return ( 
                                        colIndex > 0 ? (
                                            <CustomTableCell key={colIndex}>
                                                <Typography >{col}</Typography>
                                            </CustomTableCell>
                                        ) : null
                                    )
                                })}
                                {lastCellRightAlign && 
                                    <CustomTableCell align="right">
                                        {getLastCell(row)}
                                    </CustomTableCell>
                                }
                            </TableRow>
                        )
                        })}
                </TableBody>

            </Table>
        );
    }
}

GenericTable.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default  withStyles(styles, { withTheme: true })(GenericTable);