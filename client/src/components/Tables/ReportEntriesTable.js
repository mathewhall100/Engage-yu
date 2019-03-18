import React, { Component } from 'react';
import { times } from 'lodash';
import moment from 'moment';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    iconStyles: {
        fontSize: "32px"
    }
})

const CustomTableCell = withStyles(theme => ({
    head: {
      padding: "5px",
      fontSize: "14px",
      color: theme.palette.primary.main,
      borderBottom: "2px solid",
      borderColor: theme.palette.primary.main,
    },
    body: {
        padding: '5px',
        border: "none",
        fontSize: "16px",
        height: "auto",
      },
  }))(TableCell);

class ReportEntriesTable extends Component {

    getIconColor = (index) => {
        switch (index) {
            case 0: return "green"; 
            case 1: return "#ffc200"; 
            case 2: return "orange";  
            case 3: return "red"; 
            default: return "grey";
        }
    };

    render () {
        const { classes, records, numDays, index, question } = this.props
        return (
            <Table> 
                <TableHead >
                    <TableRow>
                        <CustomTableCell style={{width: "24%"}}>Time</CustomTableCell>
                        {question.answers.map((answer, idx) => {
                            return (
                                <CustomTableCell align="center" style={{width: "15%"}} key={idx}>
                                    {answer}
                                </CustomTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>  

                {times(numDays, (day) => {
                    return ( 
                    <TableBody  key={day}>

                        <TableRow style={{height: "10px"}}></TableRow> 

                        <TableRow> 
                            <CustomTableCell colSpan={3} >
                                Day: {day}: {moment(records[(day)*records.length/numDays].scheduled_datetime).format("MMM Do YYYY")} 
                                <hr style={{opacity: 0.5}}/>
                            </CustomTableCell>
                        </TableRow> 

                        {times((records.length/numDays), (time) => {
                            return (
                                <TableRow key={time}>

                                    <CustomTableCell>
                                        {`${records[((day)*records.length/numDays)+time].time.slice(0, 2)}:${records[((day)*records.length/numDays)+time].time.slice(-2)}`}
                                    </CustomTableCell>

                                    {records[((day)*records.length/numDays)+time].data[index].question_answers.map((answer, index)=> {
                                        return (
                                            <CustomTableCell align="center" key={index}>
                                                {answer === true ? <DoneIcon className={classes.iconStyles} style={{color: this.getIconColor(index) }} /> : null}
                                            </CustomTableCell>
                                        ) 
                                    })} 

                                </TableRow>
                            )
                        })}

                    </TableBody>)
                })}
            </Table> 
        )
    }
}

ReportEntriesTable = withStyles(styles, {withTheme: true})(ReportEntriesTable)
export default ReportEntriesTable