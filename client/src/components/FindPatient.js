import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card'
import Button from '@material-ui/core/Button';

import { selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup} from '../actions/index'
import FindPatientForm from '../containers/FindPatientForm';
import FindPatientTable from '../containers/FindPatientTable';
import FindPatientDetails from '../components/FindPatientDetails';

const styles = theme => ({
    root: {
        padding: "20px"
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


class FindPatient extends Component {  
    
    componentDidMount() {
        console.log("this.props.patientInfo._id: ", this.props.patientInfo._id)
        this.props.selectConsoleTitle({title: "Find Patient"});
        //this.props.fetchListPatientsByProvider(localStorage.getItem("provider_id")) 

        if (this.props.patientInfo._id) { this.setState({displayDetails: this.props.patientInfo._id}) }
        this.props.fetchListPatientsByProvider(localStorage.getItem("provider_id")) 
    }

    state = {
        filterName: "",
        filterNumber: "",
        filterList: "",

        displayDetails: null
    }

    filterByName = (value) => {
        console.log("FilterByName: ", value);
        this.setState({filterName: value})
    }

    filterByNumber= (value) => {
        console.log("FilterByNumber: ", value);
        this.setState({filterNumber: value})
    }

    filterByList = (value) => {
        console.log("FilterByList: ", value);
        if (value === "groupPatients") {this.props.fetchListPatientsByCareGroup(localStorage.getItem("provider_group_id")) }
        else {this.props.fetchListPatientsByCareGroup(localStorage.getItem("provider_id")) }
        this.setState({filterList: value})
    }

    displayPatientDetails = (patientId) => {
        console.log("displayPatientDetails: ", patientId)
        this.setState({displayDetails: patientId ? patientId : this.state.displayDetails})
    }

    handleClickDiaryCard = (patientId) => {
        console.log("diarycard clicked: ", patientId)
        this.setState({
            redirectURL: `survey/${patientId}`,
            redirect: true
        })
    }

    handleClickReport = (patientId) => {
        console.log("report clicked: ", patientId)
        this.setState({
            redirectURL: `report/${patientId}&null`,
            redirect: true
        })
    }

    handleClickEdit = (patientId) => {
        console.log("editclicked: ", patientId)
        this.setState({
            redirectURL: `updatepatient/${patientId}`,
            redirect: true
        })
    }

    handleClickContact = (patientId) => {
        console.log("contactclicked: ", patientId)
        // this.setState({
        //     redirectURL: `contactpatient/${patientId}`,
        //     redirect: true
       //  })
    }

    handleClickClose = () => {
        console.log("handleClickClose")
        this.setState({displayDetails: "" })
    }

   
    render () {

        const { displayDetails } = this.state
        const { classes } = this.props

        const { redirect, redirectURL} = this.state;
        
        console.log("redirectUrl: ", redirectURL)
        if (redirect) {
          const url=`/admin/${redirectURL}`
          return <Redirect to={url}/>;
        }
        
        return (
                <div>

                    <Card className={classes.root}>

                        <FindPatientForm 
                            filterByName={this.filterByName} 
                            filterByNumber={this.filterByNumber} 
                            filterByList={this.filterByList}
                        />

                        <br />

                        { displayDetails && <div>
                        
                            <FindPatientDetails /> 

                            <br />

                            <Button size="small" className={classes.btn} onClick={event => this.handleClickClose()}>Close</Button>
                            <Button size="small" className={classes.btn} onClick={event => this.handleClickContact(displayDetails)}>Contact</Button>
                            <Button size="small" className={classes.btn} onClick={event => this.handleClickEdit(displayDetails)}>Edit details</Button>
                            <Button size="small" className={classes.btn} onClick={event => this.handleClickReport(displayDetails)}>View reports</Button>
                            <Button size="small" className={classes.btn} onClick={event => this.handleClickDiaryCard(displayDetails)}>New diary Card</Button>
                           
                            
                            <br />

                        </div> }
                    
                    </Card>

                    <br />

                    <FindPatientTable 
                        filterName={this.state.filterName} 
                        filterNumber={this.state.filterNumber} 
                        filterList={this.state.filterList} 
                        displayPatientDetails={this.displayPatientDetails}
                    /> 

                    <br />
                    
                </div> 
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ selectConsoleTitle, fetchListPatientsByProvider, fetchListPatientsByCareGroup }, dispatch);
}

const mapStateToProps = (state) => {
    // console.log("State : ", state);
    return {
        patientInfo: state.reportPatientData.reportPatientInfo,
        user: state.user
    }
};

// function mapStateToProps(){
//     console.log(auth);
//     return (auth);
// }

FindPatient = withStyles(styles)(FindPatient)
FindPatient = connect(mapStateToProps, mapDispatchToProps) (FindPatient)
export default FindPatient;