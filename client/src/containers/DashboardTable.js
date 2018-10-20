import React, { Component } from 'react';
import { Router, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm } from 'redux-form';
import moment from 'moment';
import { times, startCase } from 'lodash'

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';

import DashboardMultipleSelect from '../components/Forms/DashboardMultipleSelect';
import dashboardMultipleSelect from '../components/Forms/DashboardMultipleSelect';
import EnhancedTableHead from '../components/Tables/EnhancedTableHead'
import EnhancedTableToolbar from '../components/Tables/EnhancedTableToolbar'

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
});

const CustomTableCell = withStyles(theme => ({
  body: {
    padding: '5px',
    fontSize: 14,
  },
}))(TableCell);


// Table component

class DashboardTable extends React.Component {

  componentWillReceiveProps(nextProps) {
    // console.log("will receive : ", nextProps);
    // userId: this.state.user,
    this.setState({activeSurveysLength:  nextProps.activeSurveys.length}),
    this.setState({ tableData:  this.createData(nextProps.activeSurveys) })
    if (this.state.tableData) {
       this.setState({ tableDataFiltered: this.filterData(this.createData(nextProps.activeSurveys), this.state.personFilter, this.state.statusFilter, this.state.checked) }) }
  }


  state = {
    
    redirect: false,
    patientId: "",
    episodeId: "",

    activeSurveysLength: 0,
    tableData: [],
    tableDataFiltered: [],
    userId: "",

    order: 'desc',
    orderBy: 'start',
    selected: [],
    page: 0,
    rowsPerPage: 5,

    statusFilter: ["active"],
    personFilter: "requester",
    checked: [], 
    
    userId: "5b844946d8dc5ce848cd28a4"
  };

  createStatus = (status, records, entries, startDate, endDate, entriesPerDay) => {

    let diffDays = 0;
    let progress = 0;
    let compliance = 0;

    if (status === "active") {
      diffDays = moment(moment(), "DD.MM.YYYY").diff(moment(moment(startDate), "DD.MM.YYYY"), 'days') 
    } else {diffDays = moment(moment(endDate), "DD.MM.YYYY").diff(moment(moment(startDate), "DD.MM.YYYY"), 'days') }
    // console.log("diff days: ", diffDays)
    progress = Math.round(((diffDays*entriesPerDay)/records)*100)
    compliance = entries ? Math.round((entries/(diffDays*entriesPerDay))*100) : 0
    compliance = compliance > 100 ? 100 : compliance

    if (status === "active" && (moment().isAfter(moment(endDate)))) {
        return {
          status: "awaiting review",
          compliance: compliance,
          progress: 100,
        }
      } 
      else if (status === 'active') {
        return {
          status: "active",
          compliance: compliance,
          progress: progress
        }
      }
      else if (status === "awaiting review") { 
        return {
          status: "awaiting review",
          compliance: compliance,
          progress: 100,
        }
      } else return { status: status }
  }

  createData = (data) =>  {
    // console.log("createData: ", data)
    let counter = 0;
    let newData = [];

    data.map(d => {
      counter += 1;
      let newDataObj = { 
        id: counter, 
        _id: d._id,
        patientInfoId: d.patient_info_id,
        episodeId: d.episode_id,
        name: `${d.firstname} ${d.lastname}`, 
        number: d.hospital_id, 
        start: d.start_date, 
        end: d.end_date, 
        timeframe: `${d.start_time.slice(0,2)}:${d.start_time.slice(-2)} - ${d.end_time.slice(0,2)}:${d.end_time.slice(-2)}`, 
        status: this.createStatus(d.status, d.num_records, d.num_entries, d.start_date, d.end_date, d.entries_per_day),
        requester: d.requesting_provider_name, 
        requesterId: d.requesting_provider_id,
        primary: d.primary_provider_name,
        primaryId: d.primary_provider_id,

      };
      newData.push(newDataObj)
    })
    // console.log("newData: ", newData)
    return newData;
  };

  filterData = (data, personFilter, statusFilter, checked) => {
    return this.filterByChecked( (this.filterByStatus((this.filterByPerson(data, personFilter)), statusFilter)), checked)
  };

  // filter by requester/provider
  filterByPerson = (data, filter) => {
    //console.log("DATATOFILTER1: ", data)
    //console.log("filter1: ", filter)
    //console.log("userId: ", this.state.userId)
    let filteredData = [];
    
    switch (filter) {
      case "provider":
        filteredData = data.filter(d => d.primaryId === this.state.userId)
        break;
      case "all":
        filteredData = data.filter(d => d.requesterId === this.state.userId || d.primaryId === this.state.userId);
        break;
      default:
      filteredData = data.filter(d => d.requesterId === this.state.userId);
      
    };
    //console.log("filtered data1: ", filteredData)
    return filteredData;
  };

  // filter by status
  filterByStatus = (data, filter) => {
    // console.log("DATATOFILTER2: ", data)
    // console.log("filter2: ", filter)

    let filteredData = [];
    filter.map(f => {
      filteredData = filteredData.concat(data.filter(d => d.status.status === f))
    })
    // console.log("filtered Data2: ", filteredData)
    return filteredData;
  };

  // filter by checked
  filterByChecked = (data, filter) => {
    //console.log("DATATOFILTER3: ", data)
    //console.log("filter3: ", filter)

    if (filter.length > 0) {
      let filteredData = [];
      filteredData = data.filter(d => filter.indexOf(d._id) > -1)
      console.log("filtereddata3: ", filteredData)
      return filteredData;
      } 
      else {
        //console.log("filtereddata3: ", data);
        return data;
      }
  };

  navLinksFilter = (filter) => {
    //console.log("filter0 ", filter)
    this.setState({tableDataFiltered: this.filterData(this.state.tableData, filter, this.state.statusFilter, this.state.selected) })
    this.setState({personFilter: filter})
    //console.log("tableDataFiltered0: ", this.state.tableDataFiltered)
  };

  statusFilter = (filter) => {
    //console.log("filter0 ", filter)
    this.setState({tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, filter, this.state.selected) })
    this.setState({statusFilter: filter})
    //console.log("tableDataFiltered0: ", this.state.tableDataFiltered)
  };

  checkedFilter = () => {
    //console.log("filter0 ", this.state.checked)
    this.setState({tableDataFiltered: this.filterData(this.state.tableData, this.state.personFilter, this.state.statusFilter, this.state.selected) })
    //console.log("tableDataFiltered0: ", this.state.tableDataFiltered)
  };


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

  handleDeSelectAllClick = event => {
    this.setState({ selected: [] });
  };

  handleRowClick = (event, patientId, episodeId) => {
    // console.log("row clicked: ", event, patientId, episodeId)
    this.setState({
      patientId: patientId,
      episodeId: episodeId,
      redirect: true
    })
  }

  handleCheckClick = (event, id) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    //console.log("checkclick: ", event, id)
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  // progress bar create loop
  statusProgressBar = (progress) => {
    let progressBar = [];
    if (progress < 1) {return null}
    if(progress > 100) {progress = 100}
      times(Math.round(progress/4), (index) => progressBar.push(<span key={index}>|</span>));
    return progressBar;
  }


  render() {

    const { classes } = this.props;
    const { order, orderBy, tableDataFiltered, selected, rowsPerPage, page } = this.state;
    const { activeSurveys } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.activeSurveysLength - page * rowsPerPage);

    const rows = [
      { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
      { id: 'number', numeric: false, disablePadding: false, label: 'Hosp Id' },
      { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
      { id: 'end', numeric: false, disablePadding: false, label: 'End' },
      { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
      { id: 'progress', numeric: false, disablePadding: false, label: 'Progress' },
      { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' }
    ];

    const { redirect, patientId, episodeId } = this.state;
     if (redirect) {
       const url=`/admin/report/${patientId}&${episodeId}`
       return <Redirect to={url}/>;
     }

    return (
      <Paper className={classes.root}>

        <EnhancedTableToolbar 
          numSelected={selected.length}
          navLinksSwitch={this.state.personFilter}
          navLinksFilter={this.navLinksFilter}
          statusFilter={this.statusFilter}
          checkedFilter={this.checkedFilter}
         /> 

        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">

            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onDeSelectAllClick={this.handleDeSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.activeSurveysLength}
              displayCheckbox={true}
              rows={rows}
            />

            <TableBody>
              {tableDataFiltered ? (
                this.stableSort(tableDataFiltered, this.getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(d => {
                  const isSelected = this.isSelected(d._id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleRowClick(event, d.patientInfoId, d.episodeId)}
                      tabIndex={-1}
                      key={d.id}
                    >
                      <CustomTableCell padding="checkbox"><Checkbox checked={isSelected} onClick={event => this.handleCheckClick(event, d._id)}/></CustomTableCell>
                      <CustomTableCell component="th" scope="row" padding="none">{startCase(d.name)}</CustomTableCell> 
                      <CustomTableCell>{d.number}</CustomTableCell>
                      <CustomTableCell>{moment(d.start).format("MMM Do YYYY")}</CustomTableCell>
                      <CustomTableCell>{moment(d.end).format("MMM Do YYYY")}</CustomTableCell>
                      <CustomTableCell>{d.timeframe}</CustomTableCell>
                      <CustomTableCell >
                        <div style={{height: "30px", width: "129px", border: "1px solid #dddddd", paddingLeft: "6px", paddingTop: "2px", paddingRight: "10px", 
                          backgroundColor: d.status.status === "active" ? "#ffffff" :
                                           d.status.status === "pending" ? "#ffffff" : 
                                           d.status.status === "awaiting review" ? "#eeeeee" : 
                                           d.status.status === "delayed" ? "#ffc200" : 
                                           d.status.status === "cancelled" ? "#ff0000" : 
                                           d.status.status === "actioned" ? "#eeeeee" : 
                                           d.status.status === "archived" ? "#aaaaaa" : "#ffffff",
                          fontSize: d.status.status === "active" || d.status.status === "awaiting review" ? "18px" : "15px",
                          paddingTop: d.status.status === "active" || d.status.status === "awaiting review" ? "2px" : "5px",
                          color: d.status.status === "archived" ? "#ffffff" : "#666666"
                                        }}>
                           {d.status.status === "active" || d.status.status === "awaiting review" ? 
                              <span style={{ textShadow: "1px 0", fontWeight: 600, color: d.status.compliance >= 90 ? "green" : d.status.compliance >= 70 ? "#ffc200" : "red"}}>

                                {this.statusProgressBar(d.status.progress)}

                              </span> 
                          : d.status.status}       
                        
                        </div>
                      </CustomTableCell>
                      <CustomTableCell>Dr. {startCase(d.requester)}</CustomTableCell>
                    </TableRow>
                  );
                })
              ) : null}
            </TableBody>

          </Table>
        </div>

        <TablePagination
          component="div"
          count={this.state.activeSurveysLength}
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

      </Paper>
    );
  }
}

DashboardTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  //console.log("State : ", state);
  return {
      activeSurveys: state.activeSurveys.activeSurveys.activeList,
      user: state.user
  }
};

DashboardTable = connect(mapStateToProps)(DashboardTable)
DashboardTable = withStyles(styles, { withTheme: true })(DashboardTable)
export default DashboardTable

