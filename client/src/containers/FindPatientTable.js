import React, { Component } from 'react';
import { Router, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { times, startCase } from 'lodash'
import moment from 'moment'

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
import { fetchReportPatientData, fetchSurveyQuestions, fetchSurveyPatientDetails } from '../actions/index';


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
        marginLeft: "15px",
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


   componentWillReceiveProps(nextProps) {
        //console.log("nextProps: ", nextProps)
        let data = [];
        if (nextProps.listPatientsByProvider) {
            if (nextProps.filterList === "groupPatients" && nextProps.listPatientsByCareGroup) {data = this.createData(nextProps.listPatientsByCareGroup)}
            else {data = this.createData(nextProps.listPatientsByProvider)}
               
            this.setState({
                tableData: data,
                tableDataFiltered: this.filterData(data, nextProps.filterName, nextProps.filterNumber, nextProps.filterList)
            })
        }
    }

    state = {
        redirect: false,
        redirectURL: "",

        tableData: [],
        tableDataFiltered: [],

        order: 'desc',
        orderBy: 'start',
        selected: [],
        page: 0,
        rowsPerPage: 5,

        displayRowActions: false
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


    // filters   
    filterData = (data, filterName, filterNumber, filterList) => {
        //console.log("Data to filter: ", data)
        const filteredData = this.filterByNumber(this.filterByName(data, filterName), filterNumber)
        //console.log("filteredData: ", filteredData)

        if (filteredData.length === 1) {
            this.setState({displayRowActions: filteredData[0]._id }) 
            this.props.fetchReportPatientData(filteredData[0]._id );
            this.props.displayPatientDetails(filteredData[0]._id )
            return filteredData
        } else {
            this.props.displayPatientDetails(null)
            return filteredData}
      };

    filterByName = (data, filterName) => {
        let filteredData = [];
        filteredData = data.filter(d => 
            this.filterByNameAlgorithm(d.firstname, d.lastname, filterName) 
        )
        return filteredData;
    }

    filterByNumber = (data, filterNumber) => {
        let filteredData = [];
        filteredData = data.filter(d =>
            this.filterByNumberAlgorithm(d.number, filterNumber)
        )
        return filteredData
    }

    filterByNameAlgorithm(firstname, lastname, filterName) {
         let str = "", nameA = "", nameB = "";
         str = firstname.toLowerCase().trim() + lastname.toLowerCase().trim();

         if ( str.includes(filterName.toLowerCase().trim() )) {return true} 

         if (filterName.includes(" ")) {
             nameA = filterName.slice(0, filterName.indexOf(" ")).toLowerCase().trim()
             nameB = filterName.slice(filterName.indexOf(" ")).toLowerCase().trim()
             if (firstname.toLowerCase().trim().includes(nameA) && (lastname.toLowerCase().trim().includes(nameB))) {return true}
             if (firstname.toLowerCase().trim().includes(nameB) && (lastname.toLowerCase().trim().includes(nameA))) {return true}
         }

         if (filterName.includes(",")) {
             nameA = filterName.slice(0, filterName.indexOf(",")).toLowerCase().trim().replace(/\W/g, "")
             nameB = filterName.slice(filterName.indexOf(",")+1).toLowerCase().trim().replace(/\W/g, "")
             if (firstname.toLowerCase().trim().includes(nameA) && (lastname.toLowerCase().trim().includes(nameB))) {return true}
             if (firstname.toLowerCase().trim().includes(nameB) && (lastname.toLowerCase().trim().includes(nameA))) {return true}
         } 
         return false
    } 

    filterByNumberAlgorithm(number, filterNumber) {
        let str = "";
        str = number.toLowerCase();
        if ( str.includes(filterNumber.toLowerCase().trim()) )  {return true} else {return false}
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

    handleRowClick = (event, rowId) => {
        console.log("row clicked: ", event, " ", rowId)
        this.setState({displayRowActions: this.state.displayRowActions === rowId ? null : rowId})
        this.props.fetchReportPatientData(rowId);
        this.props.displayPatientDetails(rowId)
    }

    // handleClickDiaryCard = (event, patientId) => {
    //     console.log("diarycard clicked: ", patientId)
    //     this.setState({
    //         redirectURL: `survey/${patientId}`,
    //         redirect: true
    //     })
    // }

    // handleClickReport = (event, patientId) => {
    //     console.log("report clicked: ", patientId)
    //     this.setState({
    //         redirectURL: `report/${patientId}&null`,
    //         redirect: true
    //     })
    // }

    // handleClickEdit = (event, patientId) => {
    //     console.log("editclicked: ", patientId)
    //     this.setState({
    //         redirectURL: `updatepatient/${patientId}`,
    //         redirect: true
    //     })
    // }

    handleClickContact = (event, id) => {
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
        const { order, orderBy, tableData, tableDataFiltered, rowsPerPage, page, displayRowActions } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.activeSurveysLength - page * rowsPerPage);

        const rows = [
            { id: 'firstname', numeric: false, disablePadding: false, label: 'Firstname' },
            { id: 'lastname', numeric: false, disablePadding: false, label: 'Lastname' },
            { id: 'dob', numeric: false, disablePadding: false, label: 'DOB' },
            { id: 'number', numeric: false, disablePadding: false, label: 'Hospital Number' },
            { id: 'enrolled', numeric: false, disablePadding: false, label: 'Date Enrolled' },
            // { id: 'actions', numeric: false, disablePadding: false, label: ' ' }
        ]

        const { redirect, redirectURL} = this.state;
        console.log("redirectUrl: ", redirectURL)
        if (redirect) {
          const url=`/admin/${redirectURL}`
          return <Redirect to={url}/>;
        }

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

                                            {/* <CustomTableCell  style={{width: "450px", paddingRight: "0px"}}>
                                                {displayRowActions == d._id && <div>
                                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickContact(event, d._id)}>Contact</Button>
                                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickEdit(event, d._id)}>Edit details</Button>
                                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickReport(event, d._id)}>View reports</Button>
                                                    <Button size="small" className={classes.btn} onClick={event => this.handleClickDiaryCard(event, d._id)}>New diary Card</Button>
                                                </div> }
                                            </CustomTableCell>  */}

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

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchSurveyQuestions, fetchReportPatientData, fetchSurveyPatientDetails }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        listPatientsByProvider: state.listPatientsByProvider.listPatientsByProvider.patientList,
        listPatientsByCareGroup: state.listPatientsByCareGroup.listPatientsByCareGroup.patientList,
        user: state.user
    }
};

FindPatientTable = connect(mapStateToProps, mapDispatchToProps)(FindPatientTable)
FindPatientTable = withStyles(styles)(FindPatientTable)
export default FindPatientTable;