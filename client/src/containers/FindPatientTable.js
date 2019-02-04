import React, { Component } from 'react';
import { Router, Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { times, startCase } from 'lodash'
import moment from 'moment'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { createData, filterByName, filterByNumber, filterByNameAlgo, FilterByNumberAlgo  } from '../logic/findPtTableFunctions'
import { fetchReportPatientData } from '../actions/index';
import GenericTable from '../components/Tables/GenericTable'

const styles = theme => ({
    root: {
        padding: "20px"
    },
})

class FindPatientTable extends Component {

   componentWillReceiveProps(nextProps) {
        // console.log("nextProps: ", nextProps)

        if (nextProps.listPatientsByCareGroup !== this.props.listPatientsByCareGroup) {
            this.setState({tableData: createData(nextProps.listPatientsByCareGroup) },
                () => this.setState({tableDataFiltered: this.filterData(this.state.tableData, nextProps.filterName, nextProps.filterNumber) }) )

        } else if (nextProps.listPatientsByProvider !== this.props.listPatientsByProvider) { 
            this.setState({tableData: createData(nextProps.listPatientsByProvider) },
                () => this.setState({tableDataFiltered: this.filterData(this.state.tableData, nextProps.filterName, nextProps.filterNumber) }) )

        } else if (nextProps.filterName !== this.props.filterName || nextProps.filterNumber !== this.props.filterNumber) {
            this.setState({tableDataFiltered: this.filterData(this.state.tableData, nextProps.filterName, nextProps.filterNumber) })

        } else null
    };

    state = {
        tableData: [],
        tableDataFiltered: [],
    }

    createTableData = (data) => {
        let dataArray = [];
        let counter = 0;
        data.map(d => {
            counter +=1
            let newDataObj = {
                "id": counter, 
                "_id": d._id,
                "firstname": startCase(d.firstname),
                "lastname": startCase(d.lastname),
                "dob": d.dob,
                "hospital number": d.number,
                "date enrolled": moment(d.enrolled).format("MMM Do YYYY"),
                "most recent survey": "TBA"
            };
            dataArray.push(newDataObj)
        })
        return dataArray
    };

    // Filters   
    filterData = (data, filterName, filterNumber ) => {
        const filteredData = filterByNumber(filterByName(data, filterName), filterNumber)
        let id = null
        if (filteredData.length === 1) { id = filteredData[0]._id }
            else { id = "clear" }
        this.props.fetchReportPatientData(id);
        return filteredData
      };

    // Event handlers
    handleRowClick = (row) => {
        this.props.fetchReportPatientData(row._id);
    }

    handleActionBtn = (btn, id) => {
        this.props.handleActionBtn(btn, id)
    }


    render () {

        const { classes } = this.props;
        const { tableData, tableDataFiltered } = this.state;
        const tableHeadings = ["firstname", "lastname", "dob", "hospital number", "date enrolled", "most recent survey"]

        return (
            <React.Fragment>
                { tableData && <Paper className={classes.root}>

                    <GenericTable 
                        tableHeadings={tableHeadings}
                        tableData={this.createTableData(tableDataFiltered)}
                        lastCellRightAlign={true}
                        lastCellHeading={"Actions"}
                        lastCellData={["find actions"]}
                        handleActionBtn = {this.handleActionBtn}
                        handleRowClick = {this.handleRowClick}
                        hover={true}
                    />

                </Paper> }
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchReportPatientData }, dispatch);
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        listPatientsByProvider: state.listPatientsByProvider.listPatientsByProvider.patientList,
        listPatientsByCareGroup: state.listPatientsByCareGroup.listPatientsByCareGroup.patientList,
    }
};

FindPatientTable = connect(mapStateToProps, mapDispatchToProps)(FindPatientTable)
FindPatientTable = withStyles(styles)(FindPatientTable)
export default FindPatientTable;