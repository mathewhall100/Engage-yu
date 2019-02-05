import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const styles = theme => ({
    coloredCellStyles: {
        fontWeight: "bold",
        textAlign: "center",
        fontSize: '13px',
    }
})

const CustomTableCell = withStyles(theme => ({
    head: {
      padding: "5px",
      fontSize: "14px",
      color: "#000000"
    },
    body: {
        padding: '5px',
        border: "none",
        fontSize: "16px",
        height: "auto",
      },
  }))(TableCell);


class ReportTable extends React.Component {

    tableCellOpacity = (answer) => {
        if (answer === 0) {return 0;}
        const opacity = (Math.round((0.5 + ( (answer/this.props.numDays) /2)) * 10))/10
        return opacity;
    };

    tableCellColor = (index) => {
        switch (index) {
            case 0: return "green"; break;
            case 1: return "#ffc200"; break;
            case 2: return "orange"; break; 
            case 3: return "red"; break;
            default: return "grey";
        }
    };

    tableAnswer = (answer) => {
        if (answer === 0) {return 0;}
        return Math.round(((answer)/(this.props.numDays))*100)
    };

    render () {
        const { classes } = this.props
        return (

            <Table style={{ width: '100%'}}>   

                <TableHead >
                    <TableRow>
                        <CustomTableCell style={{width: "20%"}}>
                            Time
                        </CustomTableCell>
                        {this.props.question.answers.map((answer, index) => {
                            return (
                                <CustomTableCell key={index} align="center" style={{width: "16%"}}>
                                    {answer}
                                </CustomTableCell>
                            )
                        })}
                    </TableRow>
                </TableHead>  

                <TableBody>
                    <br />
                    {this.props.displayData.map((d, index) => {
                        return (
                            <TableRow key={index} style={{height: "40px"}}>

                                <CustomTableCell>
                                    {`${d.time.slice(0, 2)}:${d.time.slice(-2)}`}
                                </CustomTableCell>

                                {d.questions[this.props.displayQuestion].answers.map((answer, i)=> {
                                    return (
                                        <CustomTableCell key={i}
                                            className={classes.coloredCellStyles}
                                            style={{
                                                opacity: this.tableCellOpacity(answer),
                                                backgroundColor: this.tableCellColor(i)
                                            }}
                                        >
                                            ({this.tableAnswer(answer)}%)      
                                        </CustomTableCell>
                                    ) 
                                })}

                            </TableRow>
                        )
                    })}
                </TableBody>

            </Table> 
        )
    }
}

ReportTable = withStyles(styles, {withTheme: true})(ReportTable)
export default ReportTable
               