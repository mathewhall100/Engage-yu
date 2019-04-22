import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { startCase, isEmpty } from 'lodash';
import moment from 'moment';
import { withStyles, Paper, Typography } from '@material-ui/core';
import TableGeneric from '../UI/Tables/tableGeneric';
import CallBack from '../UI/callback'
import { loadPatient, loadPatientsByProvider, loadPatientsByCareGroup } from '../../actions'
import { createData, filterByName, filterByNumber } from './patientLogic'


const styles = () => ({
    root: {
        padding: "20px 60px"
    },
})

class PatientFindTable extends Component {

    componentDidMount() {
        if (localStorage.getItem("patient_find_form_list") === "all care group patients") {
            this.props.dispatch(loadPatientsByCareGroup(localStorage.getItem("user_provider_group_id")))
        } else  {
            this.props.dispatch(loadPatientsByProvider(localStorage.getItem("user_provider_id")))
        } 

        if (JSON.parse(localStorage.getItem("patient_find_info_panel")) && !isEmpty(this.props.patientInfo)) {
            this.props.infoPanel("open")
        } else {
            this.props.infoPanel("close")
        }
    }

   componentWillReceiveProps(nextProps) {
        let tableData = []

        if (nextProps.filterList !== this.props.filterList) {
            if (nextProps.filterList === "all care group patients") {
                this.props.dispatch(loadPatientsByCareGroup(localStorage.getItem("user_provider_group_id")))
            } else  {
                this.props.dispatch(loadPatientsByProvider(localStorage.getItem("user_provider_id")))
            } 
        }

        if ((nextProps.filterList === "all care group patients" || localStorage.getItem("patient_find_form_list") === "all care group patients") && nextProps.patientsByCareGroup) {
            tableData = createData(nextProps.patientsByCareGroup)
        } else if (nextProps.patientsByProvider) {
            tableData = createData(nextProps.patientsByProvider)
        }

        this.setState({tableDataFiltered: this.filterData(
            tableData, 
            localStorage.getItem("patient_find_form_name") ? localStorage.getItem("patient_find_form_name") : nextProps.filterName, 
            localStorage.getItem("patient_find_form_hospId") ? localStorage.getItem("patient_find_form_hospId") : nextProps.filterNumber, 
        )} )
    };

    state = {
        tableData: [],
        tableDataFiltered: [],
    };

    createTableData = (data) => {
        return data.map(d => {
            return { 
                "_id": d._id,
                "firstname": startCase(d.firstname),
                "lastname": startCase(d.lastname),
                "dob": d.dob,
                "hospital number": d.number,
                "date enrolled": moment(d.enrolled).format("MMM Do YYYY"),
                "primary provider": d.provider
            }
        })
    };

    // Filters   
    filterData = (data, filterName, filterNumber) => {
        const filteredData = filterByNumber(filterByName(data, filterName), filterNumber)
        return filteredData;
    };

    // Event handlers
    handleRowClick = (row) => {
        this.props.dispatch(loadPatient(row._id))
        this.props.infoPanel("open")
    }

    handleActionClick = (btn, _id) => {
        this.props.handleActionBtn(btn, _id)
    }

    render () {
        const { classes, loadingCareGroupPatients, errorCareGroupPatients, loadingProviderPatients, errorProviderPatients } = this.props;
        const { tableDataFiltered } = this.state;
        let text = "";
        
        if (errorCareGroupPatients || errorProviderPatients) {
            if ((errorCareGroupPatients.message || errorProviderPatients.message).includes('401')) { 
                text="Whoops! Looks like you are not authorized to access this resource"
            } else {
                text="Sorry an error occurred while fetching data. Please refresh the browser (F5) or try again." 
            }
            return <CallBack title="" text={text}/>
        }

        if (loadingCareGroupPatients || loadingProviderPatients ) {
            return <CallBack />
        }

        if (tableDataFiltered.length > 0) {
            return <Paper className={classes.root}>
                <TableGeneric 
                    tableHeadings={["firstname", "lastname", "dob", "hospital number", "date enrolled", "primary provider"]}
                    tableData={this.createTableData(tableDataFiltered)}
                    lastCellRightAlign={true}
                    lastCellHeading={"Actions"}
                    lastCellData={["find actions"]}
                    handleActionBtn = {this.handleActionClick}
                    handleRowClick = {this.handleRowClick}
                    hover={true}
                />
            </Paper> 
        }

        return <Paper className={classes.root}>
                <Typography variant="subtitle1">
                    No patients meet the search criteria.
                </Typography>
            </Paper>

        return <div />

    }
}


const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        patientsByProvider: state.patientsByProvider.listPatients,
        loadingProviderPatients: state.patientsByProvider.loading,
        errorProviderPatients: state.patientsByProvider.error,

        patientsByCareGroup: state.patientsByCareGroup.listPatients,
        loadingCareGroupPatients: state.patientsByCareGroup.loading,
        errorCareGroupPatients: state.patientsByCareGroup.error,

        patientInfo: state.patient.patient.patientInfo,
        patientData: state.patient.patient.patientData
    }
};

PatientFindTable = withRouter(PatientFindTable)
PatientFindTable = connect(mapStateToProps)(PatientFindTable)
PatientFindTable = withStyles(styles)(PatientFindTable)
export default PatientFindTable;