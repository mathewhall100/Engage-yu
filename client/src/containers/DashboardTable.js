import React, { Component } from 'react';
//import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import orderBy from 'lodash/orderBy'



function createData(data) {
  let counter = 0;
  let newData = [];
  let newDatum = {};

  data.map(datum => {
    counter += 1;
    let newDatum = { 
      id: counter, 
      _id: datum._id,
      name: `${datum.firstname} ${datum.lastname}`, 
      number: datum.hospital_id, 
      start: datum.start_date, 
      end: datum.end_date, 
      timeframe: `${datum.start_time.slice(0,2)}:${datum.start_time.slice(-2)} - ${datum.end_time.slice(0,2)}:${datum.end_time.slice(-2)}`, 
      status: datum.status,
      requester: datum.requesting_provider_name
    };
    newData.push(newDatum)
  })
  console.log("newData: ", newData)
  return newData;
}


function desc(a, b, orderBy) {
  console.log("a: ", a, " b: ", b)
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function stableSort(array, cmp) {
  console.log("array: ", array, " cmp: " , cmp )

  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
  // order = direction, orderBy = id of column to sort 
  console.log("order, orderBy: ", order, orderBy)

  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}


const rows = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'number', numeric: false, disablePadding: false, label: 'Hosp Id' },
  { id: 'start', numeric: false, disablePadding: false, label: 'Start' },
  { id: 'end', numeric: false, disablePadding: false, label: 'End' },
  { id: 'timeframe', numeric: false, disablePadding: false, label: 'Timeframe' },
  { id: 'status', numeric: false, disablePadding: false, label: 'Status' },
  { id: 'requester', numeric: false, disablePadding: false, label: 'Requester' }
];


class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {rows.map(row => {
            return (
              <TableCell
                key={row.id}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === row.id}
                    direction={order}
                    onClick={this.createSortHandler(row.id)}
                  >
                    {row.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
});



let EnhancedTableToolbar = props => {
  const { numSelected, classes } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title" id="tableTitle">
            My Active Surveys.
          </Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        <Tooltip title="Filter list"> 
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: '100%',
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
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);



class DashboardTable extends React.Component {
  state = {
    order: 'desc',
    orderBy: 'start',
    selected: [],
    page: 0,
    rowsPerPage: 5,
    tableData: [],

    activeSurveysLength: 0,
  };

  componentWillReceiveProps(nextProps) {
    this.setState({ 
        activeSurveysLength:  nextProps.activeSurveys.length,
        tableData: this.state.tableData === [] ? this.state.tableData : createData(nextProps.activeSurveys)     
    })
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = 'desc';

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    this.setState({ order, orderBy });
  };

  handleSelectAllClick = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.tableData.map(active => active.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
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

  render() {
    const { classes } = this.props;
    const { order, orderBy, tableData, selected, rowsPerPage, page } = this.state;
    const { activeSurveys } = this.props;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.activeSurveysLength - page * rowsPerPage);

    console.log("ActiveSurveyprops: ", activeSurveys)

    return (
      <Paper className={classes.root}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table} aria-labelledby="tableTitle">

            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={this.state.activeSurveysLength}
            />

            <TableBody>
              {activeSurveys ? (
                stableSort(tableData, getSorting(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(active => {
                  const isSelected = this.isSelected(active._id);
                  return (
                    <TableRow
                      hover
                      onClick={event => this.handleClick(event, active._id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={active.id}
                      selected={isSelected}
                    >
                      <CustomTableCell padding="checkbox">
                        <Checkbox checked={isSelected} />
                      </CustomTableCell>
                      <CustomTableCell component="th" scope="row" padding="none">
                        {active.name}
                      </CustomTableCell>
                      <CustomTableCell>{active.number}</CustomTableCell>
                      <CustomTableCell>{moment(active.start).format("MMM Do YYYY")}</CustomTableCell>
                      <CustomTableCell>{moment(active.end).format("MMM Do YYYY")}</CustomTableCell>
                      <CustomTableCell>{active.timeframe}</CustomTableCell>
                      <CustomTableCell>{active.status}</CustomTableCell>
                      <CustomTableCell>Dr. {active.requester}</CustomTableCell>
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
  console.log("State : ", state);
  return {
      activeSurveys: state.activeSurveys.activeSurveys.activeList
  }
};
DashboardTable = connect(mapStateToProps)(DashboardTable)
DashboardTable = withStyles(styles, { withTheme: true })(DashboardTable)
export default DashboardTable

