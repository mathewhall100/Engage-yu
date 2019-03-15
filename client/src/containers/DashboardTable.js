import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import { startCase } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import EnhancedTableHead from '../components/Tables/EnhancedTableHead';
import EnhancedTableToolbar from '../components/Tables/EnhancedTableToolbar';
import StatusBar from '../components/Tables/StatusBar'
import { fetchActiveSurveys } from '../actions/index';
import { createStatus, filterByPerson, filterByStatus, filterByChecked } from '../logic/dashboardTableFunctions';
import { desc, stableSort, getSorting } from '../logic/sortFunctions'
import patient_dataAPI from '../utils/patient_data.js'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: "100%",
    },
    tableWrapper: {
        overflowX: 'auto'
    },
});

const checkboxTheme = createMuiTheme({
    palette: {
        secondary: { main: '#666'}, // '#009900'This is just green.A700 as hex.
      },
})

const CustomTableCell = withStyles(theme => ({
  body: {
    padding: '5px',
    fontSize: 14
  },
}))(TableCell);


// Table component
class DashboardTable extends Component {

    componentDidMount() {
        // Fetch list of active surveys and save to redux store
        patient_dataAPI.fetchActive(localStorage.getItem("provider_id"))
        .then(res => {
            console.log("result: ", res.data)
            let surveys = []; 
            if (res.data.length < 1) {console.log("No active surveys retrieved")}
                else {
                    surveys = res.data.map(ep => {return {...ep, ...createStatus(ep)} })
                    console.log("survey: ", surveys)
                    this.props.fetchActiveSurveys(surveys);
                }
            })
            .catch(err => {
                console.log(`OOPS! A fatal problem occurred and your request could not be completed`);
                console.log(err);
                console.log("No active surveys retrieved")
                // inform user
        })
    }

    componentWillReceiveProps(nextProps) {
        // Load list of activeSurveys from store and create data object
        // Then filter data object by survey status (default: active), scope (deafult: requester only) and checkbox selection (default: none)
        if (nextProps.activeSurveys !== this.props.activeSurveys) {
            console.log("nextprops setState: ", nextProps.activeSurveys)
            this.setState({ tableData: nextProps.activeSurveys},
            () => this.setState({ 
                tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, this.state.statusFilter, this.state.checked) 
            }) )
        }
    }

    state = {
        redirect: false,
        patientId: "",
        episodeId: "",
        tableData: [],
        tableDataFiltered: [],
        order: 'desc',
        orderBy: 'start',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        statusFilter: ["active"],
        personFilter: "requester",
        checked: [], 
    };

    // Filter table constents functions by provider and status (provider_id in local storage from login)
    filterData = (data, personFilter, statusFilter, checked) => {
        console.log("providerId ", localStorage.getItem("provider_id"))
        return filterByChecked( (filterByStatus((filterByPerson(data, localStorage.getItem("provider_id"), personFilter)), statusFilter)), checked)
    };

    // Refilter in response to user selecting a navLink
    navLinksFilter = (filter) => {
        this.setState({tableDataFiltered: this.filterData(this.state.tableData, filter, this.state.statusFilter, this.state.selected) },
            () => this.setState({personFilter: filter})
        )
    };

    // Refilter in response to user selecting different status 
    statusFilter = (filter) => {
        this.setState({tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, filter, this.state.selected) }, 
            () => this.setState({statusFilter: filter})
        )
    };

    // Refilter in response to user selecting specific surveys using checkboxes
    checkedFilter = () => {
        this.setState({tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, this.state.statusFilter, this.state.selected) }, )
    };

    // event handlers
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {order = 'asc'}
        this.setState({ order, orderBy });
    };

    handleDeSelectAllClick = event => { 
        this.setState({ selected: [] }, () => this.checkedFilter())
    };

    handleRowClick = (patientId, episodeId) => {
        //console.log("rowClick: ", patientId)
        localStorage.setItem("patient_id", patientId)
        this.setState({redirect: episodeId})
        // const url=`/admin/report/${episodeId}`
        // this.props.history.push(url)
    }

    handleCheckBoxClick = (event, id) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        switch (selectedIndex) {
            case -1:
                newSelected = newSelected.concat(selected, id); break
            case 0:
                newSelected = newSelected.concat(selected.slice(1)); break
            case selected.length - 1:
                newSelected = newSelected.concat(selected.slice(0, -1)); break
            default: 
                newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1))
        }
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {this.setState({ page }); };

    handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }); };

    render() {

        const { classes } = this.props;
        const { order, orderBy, tableDataFiltered, selected, rowsPerPage, page } = this.state;
        
        const rows = [
            { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
            { id: 'number', numeric: false, disablePadding: false, label: 'Hosp Id' },
            { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
            { id: 'end', numeric: false, disablePadding: false, label: 'End' },
            { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
            { id: 'progress', numeric: false, disablePadding: false, label: 'Progress' },
            { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' }
        ];

        // DashboardTable return
        return (
            <Paper className={classes.root}>

            {this.state.redirect && 
                <Redirect to={{
                    pathname: "/admin/report",
                    state: { episodeId: this.state.redirect }
                }} />
            }

                <EnhancedTableToolbar 
                    numSelected={selected.length}
                    navLinksSwitch={this.state.personFilter}
                    navLinksFilter={this.navLinksFilter}
                    statusFilter={this.statusFilter}
                    checkedFilter={this.checkedFilter}
                /> 

                <div className={classes.tableWrapper}>
                    <Table aria-labelledby="tableTitle">

                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onDeSelectAllClick={this.handleDeSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.tableDataFiltered.length}
                            displayCheckbox={true}
                            rows={rows}
                            />

                        <TableBody>
                            { stableSort(tableDataFiltered, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((d, index)=> {
                                    return (
                                        <TableRow hover onClick={event => this.handleRowClick(d.patientInfoId, d.episodeId)} tabIndex={-1} key={index} >
                                            <CustomTableCell padding="checkbox">
                                                <MuiThemeProvider theme={checkboxTheme}>
                                                    <Checkbox checked={this.state.selected.indexOf(d.episodeId) !== -1} onClick={event => this.handleCheckBoxClick(event, d.episodeId)}/>
                                                </MuiThemeProvider>
                                            </CustomTableCell>
                                            <CustomTableCell component="th" scope="row" padding="none">{startCase(d.name)}</CustomTableCell> 
                                            <CustomTableCell>{d.number}</CustomTableCell>
                                            <CustomTableCell>{moment(d.start).format("MMM Do YYYY")}</CustomTableCell>
                                            <CustomTableCell>{moment(d.end).format("MMM Do YYYY")}</CustomTableCell>
                                            <CustomTableCell>{d.timeframe}</CustomTableCell>
                                            <CustomTableCell>
                                                <StatusBar adjustedStatus={d.adjustedStatus} compliance={d.compliance} progress={d.progress} />
                                            </CustomTableCell>
                                            <CustomTableCell>Dr. {startCase(d.requester)}</CustomTableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>

                    </Table>
                </div>

                <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25]}
                    count={tableDataFiltered.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />

            </Paper>
        );
    }
}

DashboardTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchActiveSurveys }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State1 : ", state);
    return {
        activeSurveys: state.activeSurveys.activeSurveys,
        user: state.user
    }
};

DashboardTable = withRouter(DashboardTable)
DashboardTable = connect(mapStateToProps, mapDispatchToProps)(DashboardTable)
DashboardTable = withStyles(styles, { withTheme: true })(DashboardTable)
export default DashboardTable
