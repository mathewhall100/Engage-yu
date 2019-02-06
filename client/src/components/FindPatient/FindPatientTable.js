import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startCase } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { createData, filterByName, filterByNumber, filterByNameAlgo, FilterByNumberAlgo  } from '../../logic/findPtTableFunctions';
import { fetchReportPatientData } from '../../actions/index';
import GenericTable from '../Tables/GenericTable';

const styles = () => ({
    root: {
        padding: "20px"
    },
})

class FindPatientTable extends Component {

   componentWillReceiveProps(nextProps) {
        //console.log("nextProps: ", nextProps)
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

    fetchSelectedPatientInfo = (_id) => {
        let patientInfo, patientData;
        const url = `/api/patient_info/find/${_id}`
        axios.get(url)
        .then( res => {
            patientInfo = res.data
            axios.get(`/api/patient_data/${patientInfo.patient_data_id}`)
            .then( res => {
                patientData = res.data
                console.log("axios patientInfo: ", patientInfo)
                console.log("axios patientData: ", patientData)
                this.props.fetchReportPatientData(patientInfo, patientData)
            })
            localStorage.setItem("patient_id", _id) 
        })
    }

    // Filters   
    filterData = (data, filterName, filterNumber ) => {
        
        if (localStorage.getItem("patient_id")) { 
            return data.filter(pt => pt._id === localStorage.getItem("patient_id")) 
        } else {
            const filteredData = filterByNumber(filterByName(data, filterName), filterNumber)
            if (filteredData.length === 1) { 
                this.fetchSelectedPatientInfo(filteredData[0]._id)
            } else { 
                localStorage.setItem("patient_id", "")
                this.props.fetchReportPatientData([],[])
            }
            return filteredData
        }
    }

    // Event handlers
    handleRowClick = (row) => {
        this.fetchSelectedPatientInfo(row._id)
    }

    handleActionBtn = (btn, _id) => {
        this.props.handleActionBtn(btn, _id)
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