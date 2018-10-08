import React, { Component } from 'react';
import { Router, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { times, startCase } from 'lodash'
import moment from 'moment'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TablePagination from '@material-ui/core/TablePagination';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import EnhancedTableHead from '../components/Tables/EnhancedTableHead'


const styles = theme => ({
    root: {
        padding: "20px"
    },
    table: {
        minWidth: 1020,
      },
    btn: {
        backgroundColor: "#eeeeee",
        textDecoration: "none",
        borderRadius: "5px",
        padding: "5px",
        marginLeft: "20px",
        float: "right",
        '&:hover': {
            backgroundColor: "#dddddd",
        },
        '&:disabled': {
            color: 'grey'
        },
        hover: {},
        disabled: {},
    },
})

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


class FindPatientTable extends Component {


   async componentWillReceiveProps(nextProps) {
        console.log("nextProps: ", nextProps)
        await this.setState({
            filterName: this.createFilterName(nextProps.filterName),
            filterNumber: this.createFilterNumber(nextProps.filterNumber) 
        })
        if (nextProps.listPatientsByProvider) {
            this.setState({
                tableData: this.createData(nextProps.listPatientsByProvider),
                tableDataFiltered: this.filterData(this.createData(nextProps.listPatientsByProvider))
            })
        }
    }


    state = {
        patientList: "",
        tableData: [],
        tableDataFiltered: [],
        filterName: "",

        order: 'desc',
        orderBy: 'start',
        selected: [],
        page: 0,
        rowsPerPage: 5,

        displayDetailsBox: false
    }

    // create functions

    createData = (data) => {
        let counter = 0;
        let newData = [];

        data.map(d => {
            counter += 1;
            let newDataObj = { 
              id: counter, 
              _id: d._id,
              firstname: d.firstname,
              lastname: d.lastname,
              number: d.hospital_id, 
              dob: d.dob, 
              enrolled: d.date_enrolled, 
            };
            newData.push(newDataObj)
          })
        // console.log("newData: ", newData)
        return newData;
    };

    createFilterName = (filterName) => {
        return filterName;
        }

    createFilterNumber = (filterNumber) => {
        return filterNumber;
        }

    // filters   
    
    filterData = (data) => {
        return this.filterByNumber(this.filterByName(data))
      };

    filterByNameAlgorithm(firstname, lastname) {
         let str = "", nameA = "", nameB = "";
         str = firstname.toLowerCase().trim() + lastname.toLowerCase().trim();

         if ( str.includes(this.state.filterName.toLowerCase().trim() )) {return true} 

         if (this.state.filterName.includes(" ")) {
             nameA = this.state.filterName.slice(0, this.state.filterName.indexOf(" ")).toLowerCase().trim()
             nameB = this.state.filterName.slice(this.state.filterName.indexOf(" ")).toLowerCase().trim()
             if (firstname.toLowerCase().trim().includes(nameA) && (lastname.toLowerCase().trim().includes(nameB))) {return true}
             if (firstname.toLowerCase().trim().includes(nameB) && (lastname.toLowerCase().trim().includes(nameA))) {return true}
         }

         if (this.state.filterName.includes(",")) {
             nameA = this.state.filterName.slice(0, this.state.filterName.indexOf(",")).toLowerCase().trim().replace(/\W/g, "")
             nameB = this.state.filterName.slice(this.state.filterName.indexOf(",")+1).toLowerCase().trim().replace(/\W/g, "")
             if (firstname.toLowerCase().trim().includes(nameA) && (lastname.toLowerCase().trim().includes(nameB))) {return true}
             if (firstname.toLowerCase().trim().includes(nameB) && (lastname.toLowerCase().trim().includes(nameA))) {return true}
         } 

         return false
    } 

    filterByNumberAlgorithm(number) {
        let str = "";
        str = number.toLowerCase();
        if ( str.includes(this.state.filterNumber.toLowerCase().trim()) )  {return true} else {return false}
    }

    filterByName = (data) => {
        let filteredData = [];
        filteredData = data.filter(d => 
            this.filterByNameAlgorithm(d.firstname, d.lastname) 
        )
        return filteredData;
    }

    filterByNumber = (data) => {
        let filteredData = [];
        filteredData = data.filter(d =>
            this.filterByNumberAlgorithm(d.number)
        )
        return filteredData
    }

    // Sort functions

    desc = (a, b, orderBy) => {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
    };

    stableSort = (array, cmp)=>  {
        const stabilizedThis = array.map((el, index) => [el, index]);
        stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
        });
        return stabilizedThis.map(el => el[0]);
    };

    getSorting = (order, orderBy) => {
        return order === 'desc' ? (a, b) => this.desc(a, b, orderBy) : (a, b) => -this.desc(a, b, orderBy);
    };

    // event handlers

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {
        order = 'asc';
        }
        this.setState({ order, orderBy });
    };

    handleRowClick = (event, patient) => {
        console.log("row clicked: ", event, " ", patient)
        this.setState({displayDetailsBox: true})
    }

    handleClickDetails = (id) => {
        console.log("details clicked: ", id)
    }
    handleClickDiaryCards = (id) => {
        console.log("diarycard clicked: ", id)
    }
    handleClickReport = (id) => {
        console.log("report clicked: ", id)
    }
    handleClickEdit = (id) => {
        console.log("editclicked: ", id)
    }
    handleClickContact = (id) => {
        console.log("contact clicked: ", id)
    }

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    render () {

        const { classes } = this.props;
        const { order, orderBy, tableData, tableDataFiltered, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.activeSurveysLength - page * rowsPerPage);

        const rows = [
            { id: 'firstname', numeric: false, disablePadding: false, label: 'Firstname' },
            { id: 'lastname', numeric: false, disablePadding: false, label: 'Lastname' },
            { id: 'dob', numeric: false, disablePadding: false, label: 'DOB' },
            { id: 'number', numeric: false, disablePadding: false, label: 'Hospital Number' },
            { id: 'enrolled', numeric: false, disablePadding: false, label: 'Date Enrolled' },
            { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' }
        ]

        return (
            <div>
                {tableData && <Paper className={classes.root}>

                    <Table className={classes.table}>

                        <EnhancedTableHead
                            numSelected={0}
                            displayCheckbox={false}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={this.handleRequestSort}
                            rowCount={tableData.length}
                            rows={rows}
                        />

                        <TableBody>

                            {this.stableSort(tableDataFiltered, this.getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(d => {
                                    return (
                                        <TableRow
                                            hover
                                            onClick={event => this.handleRowClick(event, d._id)}
                                            tabIndex={-1}
                                            key={d.id}
                                        >
                                            <CustomTableCell><Typography className={classes.text}>{startCase(d.firstname)}</Typography></CustomTableCell>
                                            <CustomTableCell><Typography className={classes.text}>{startCase(d.lastname)}</Typography></CustomTableCell>
                                            <CustomTableCell><Typography className={classes.text}>{d.dob}</Typography></CustomTableCell>
                                            <CustomTableCell><Typography className={classes.text}>{d.number}</Typography></CustomTableCell>
                                            <CustomTableCell><Typography className={classes.text}>{moment(d.enrolled).format("MMM Do YYYY")}</Typography></CustomTableCell>

                                            <CustomTableCell >
                                                <Button size="small" className={classes.btn} onClick={event => this.handleClickDetails(event, d._id)}>Details</Button>
                                                <Button size="small" className={classes.btn} onClick={event => this.handleClickDiaryCard(event, d._id)}>Diary Card</Button>
                                                <Button size="small" className={classes.btn} onClick={event => this.handleClickReport(event, d._id)}>Report</Button>
                                                <Button size="small" className={classes.btn} onClick={event => this.handleClickEdit(event, d._id)}>Edit</Button>
                                                <Button size="small" className={classes.btn} onClick={event => this.handleClickContact(event, d._id)}>Contact</Button>
                                            </CustomTableCell>

                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>

                    <TablePagination
                        component="div"
                        count={tableData.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                            'aria-label': 'Previous Page',
                        }}
                        nextIconButtonProps={{
                            'aria-label': 'Next Page',
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />

                </Paper> }
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        listPatientsByProvider: state.listPatientsByProvider.listPatientsByProvider.patientList,
        user: state.user
    }
};

FindPatientTable = connect(mapStateToProps)(FindPatientTable)
FindPatientTable = withStyles(styles)(FindPatientTable)
export default FindPatientTable;