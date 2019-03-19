import React, { Component } from 'react';
import moment from 'moment';
import { withStyles, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    iconStyles: {
        margin: 0, 
        padding: 0,
        fontSize: "32px",
        lineHeight: "16px"
    }
})

const CustomTableCell = withStyles(theme => ({
    head: {
      padding: "0 5px",
      fontSize: "16px",
      color: theme.palette.primary.main,
      borderBottom: "2px solid",
      borderColor: theme.palette.primary.main,
    },
    body: {
        color: theme.palette.primary.main,
        padding: '0 5px',
        border: "none",
        fontSize: "15px"
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
        const { classes, records, startTime, index, question} = this.props

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

                 <TableBody>
                    <TableRow style={{height: "10px"}}></TableRow> 
                    {records.map((rec, idx) => {
                        return (
                            <React.Fragment key={idx}>
                               
                                {rec.time === startTime && 
                                    <TableRow>  
                                        <CustomTableCell colSpan={3} >
                                            Day: {rec.day}: {moment(rec.scheduled_datetime).format("MMM Do YYYY")} 
                                            <hr style={{opacity: 0.5}}/>
                                        </CustomTableCell>
                                    </TableRow>
                                }

                                <TableRow>
                                    <CustomTableCell>
                                        {`${rec.time.slice(0, 2)}:${rec.time.slice(-2)}` }
                                    </CustomTableCell>

                                    {rec.valid && rec.data[index].question_answers.map((ans, idx)=> {
                                        return (
                                            <CustomTableCell key={idx} align="center">
                                                {ans === true ? <DoneIcon className={classes.iconStyles} style={{color: this.getIconColor(idx) }} /> : null}
                                            </CustomTableCell>
                                        ) 
                                    })} 
                                </TableRow>
                            </React.Fragment>
                        )
                    }) }
                </TableBody>

            </Table> 
        )
    }
}

ReportEntriesTable = withStyles(styles, {withTheme: true})(ReportEntriesTable)
export default ReportEntriesTable