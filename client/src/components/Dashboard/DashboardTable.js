import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import { startCase } from 'lodash';
import PropTypes from 'prop-types';
import { withStyles, Table, TableBody, TableCell, TablePagination, TableRow, Paper, Checkbox, Typography} from '@material-ui/core';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import TableEnhancedTableHead from '../UI/Tables/tableEnhancedTableHead';
import Callback from '../UI/callback'
import DashboardTableToolbar from './DashboardTableToolbar';
import DashboardTableStatusBar from './DashboardTableStatusBar';
import { loadActiveSurveys, loadPatient } from '../../actions';
import { filterByPerson, filterByStatus, filterByChecked } from './dashboardLogic';
import { stableSort, getSorting } from '../../logic/tableSortFunctions';

const styles = () => ({
    root: {
        padding: "10px 20px",
    },
    tableWrapper: {
        marginLeft: "8px",
        marginBottom: "36px",
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


class DashboardTable extends Component {

    componentDidMount() {
        // Load list of active surveys and save to redux store
        this.props.dispatch(loadActiveSurveys(localStorage.getItem("provider_id")));
    }

    componentWillReceiveProps(nextProps) {
        // Load list of activeSurveys from store
        // Then filter by survey status (default: active), scope (deafult: requester only) and checkbox selection (default: none)
        // Gives this.state.tableDataFiltered array.
        if (nextProps.activeSurveys ) {
            this.setState({ tableData: nextProps.activeSurveys},
                () => this.setState({ 
                    tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, this.state.statusFilter, this.state.checked) 
                }) 
            );
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
        return filterByChecked( (filterByStatus((filterByPerson(data, localStorage.getItem("provider_id"), personFilter)), statusFilter)), checked);
    };

    // Refilter in response to user selecting a navLink
    navLinksFilter = (filter) => {
        this.setState({tableDataFiltered: this.filterData(this.state.tableData, filter, this.state.statusFilter, this.state.selected) },
            () => this.setState({personFilter: filter})
        );
    };

    // Refilter in response to user selecting different status 
    statusFilter = (filter) => {
        this.setState({tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, filter, this.state.selected) }, 
            () => this.setState({statusFilter: filter})
        );
    };

    // Refilter in response to user selecting specific surveys using checkboxes
    checkedFilter = () => {
        this.setState({tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, this.state.statusFilter, this.state.selected) } );
    };

    // Event handlers
    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
        if (this.state.orderBy === property && this.state.order === 'desc') {order = 'asc'}
        this.setState({ order, orderBy });
    };

    handleDeSelectAllClick = () => { this.setState({ selected: [] }, () => this.checkedFilter());};

    handleRowClick = (patientId, episodeId) => {
        this.props.dispatch(loadPatient(patientId))
        this.props.history.push({pathname: '/admin/report', state: {episodeId: episodeId} })
    };

    handleCheckBoxClick = (event, id) => {
        event.stopPropagation();
        event.nativeEvent.stopImmediatePropagation();
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        switch (selectedIndex) {
            case -1:
                newSelected = newSelected.concat(selected, id); break;
            case 0:
                newSelected = newSelected.concat(selected.slice(1)); break;
            case selected.length - 1:
                newSelected = newSelected.concat(selected.slice(0, -1)); break;
            default: 
                newSelected = newSelected.concat(selected.slice(0, selectedIndex),selected.slice(selectedIndex + 1));
        }
        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {this.setState({ page }); };

    handleChangeRowsPerPage = event => { this.setState({ rowsPerPage: event.target.value }); };

    render() {

        const { classes, error, loading, activeSurveys } = this.props;
        const { order, orderBy, tableDataFiltered, selected, rowsPerPage, page } = this.state;
        
        const rows = [
            { id: 'name', numeric: false, disablePadding: true, label: 'Patient Name' },
            { id: 'number', numeric: false, disablePadding: false, label: 'Hosp Id' },
            { id: 'start', numeric: false, disablePadding: false, label: 'Start Date' },
            { id: 'end', numeric: false, disablePadding: false, label: 'End Date' },
            { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
            { id: 'progress', numeric: false, disablePadding: false, label: 'Progress' },
            { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' }
        ];

        if (error) {
            return <div>Error! {error.message}</div>
        }

        if (loading || !activeSurveys) {
            return <Callback />
        }

        return (
            <Paper className={classes.root}>

                <DashboardTableToolbar 
                    numSelected={selected.length}
                    navLinksSwitch={this.state.personFilter}
                    navLinksFilter={this.navLinksFilter}
                    statusFilter={this.statusFilter}
                    checkedFilter={this.checkedFilter}
                /> 

                <div className={classes.tableWrapper}>
                    <Table aria-labelledby="tableTitle">

                        <TableEnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onDeSelectAllClick={this.handleDeSelectAllClick}
                            onRequestSort={this.handleRequestSort}
                            rowCount={this.state.tableDataFiltered.length}
                            displayCheckbox={true}
                            rows={rows}
                            />

                        {tableDataFiltered.length ? 
                            <TableBody>
                                {console.log("tableDataFiltered: ", tableDataFiltered)}
                                { stableSort(tableDataFiltered, getSorting(order, orderBy))
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((d, index)=> {
                                        return (
                                            <TableRow hover onClick={event => this.handleRowClick(d.patientInfoId, d.episodeId)} tabIndex={-1} key={index} >
                                                <CustomTableCell>
                                                    <MuiThemeProvider theme={checkboxTheme}>
                                                        <Checkbox style={{paddingLeft: 0}} checked={this.state.selected.indexOf(d.episodeId) !== -1} onClick={event => this.handleCheckBoxClick(event, d.episodeId)}/>
                                                    </MuiThemeProvider>
                                                </CustomTableCell>
                                                <CustomTableCell component="th" scope="row" padding="none">{startCase(d.name)}</CustomTableCell> 
                                                <CustomTableCell>{d.number}</CustomTableCell>
                                                <CustomTableCell>{moment(d.start).format("MMM Do YYYY")}</CustomTableCell>
                                                <CustomTableCell>{moment(d.end).format("MMM Do YYYY")}</CustomTableCell>
                                                <CustomTableCell>{d.timeframe}</CustomTableCell>
                                                <CustomTableCell>
                                                    <DashboardTableStatusBar adjustedStatus={d.adjustedStatus} compliance={d.compliance} progress={d.progress} />
                                                </CustomTableCell>
                                                <CustomTableCell>Dr. {startCase(d.requester)}</CustomTableCell>
                                            </TableRow>
                                        );
                                    })
                                }
                            </TableBody>
                            : 
                            <TableBody>
                                <TableRow>   
                                    <CustomTableCell style={{border: "none"}}>
                                        <Typography variant="subtitle1" style={{margin: "40px 0"}}>No active surveys to display at this time.</Typography>
                                    </CustomTableCell>
                                </TableRow>
                            </TableBody>
                        }   
                    </Table>
                </div>

                {tableDataFiltered.length > 4 && 
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
                }

            </Paper>
        );
    }
}

DashboardTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    //console.log("State @dashboard: ", state);
    return {
        activeSurveys: state.activeSurveys.surveys,
        loading: state.activeSurveys.loading,
        error: state.activeSurveys.error,
        user: state.user
    };
};

DashboardTable = withRouter(DashboardTable);
DashboardTable = connect(mapStateToProps)(DashboardTable);
DashboardTable = withStyles(styles, { withTheme: true })(DashboardTable);
export default DashboardTable;
