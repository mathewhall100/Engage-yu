import React, {Component}  from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SurveyCheckbox from './SurveyCheckbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import Fade from '@material-ui/core/Fade';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography'
import moment from 'moment'


const styles = (theme) =>  ({
    // Popper
    popper: {
        zIndex: 100,
        '&[x-placement*="right"] $arrow': {
            left: 0,
            marginLeft: '-0.9em',
            height: '3em',
            width: '1em',
            '&::before': {
                borderWidth: '1em 1em 1em 0',
                borderColor: `transparent ${theme.palette.common.white} transparent transparent`,
            },
          },
      },
      arrow: {
        position: 'absolute',
        fontSize: 12,
        width: '3em',
        height: '3em',
        '&::before': {
            content: '""',
            margin: 'auto',
            display: 'block',
            width: 0,
            height: 0,
            borderStyle: 'solid',
        },
      },
})

const CustomTableCell = withStyles(theme => ({
    head: {
        padding: "5px", 
    },
    body: {
        padding: "5px",
        fontSize: 14,
    },
  }))(TableCell);


class CustomQuestionTable extends Component {

    state = {
        anchorEl: null,
        popperOpen: false,
        popperType: "",
        popperContent: null,
        arrowRef: null,
        page: 0,
        rowsPerPage: 5,
    }

    handleRowHover = (event, type, content) => {
        console.log("PopperContent: ", type, " ", content)
        const { currentTarget } = event;
        this.setState(state => ({
          anchorEl: currentTarget,
          popperType: type,
          popperContent: content,
          popperOpen: "true",
        }));
      };

    handleRowLeave = event =>  {
        this.setState(state => ({
            popperOpen: false
        }))
    }

    // Popper arrow 
    handleArrowRef = node => {
        this.setState({
            arrowRef: node,
        });
    };

    handleChangePage = (event, page) => { this.setState({ page }) };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render () {

        const { classes, customQuestions, selected, type } = this.props;
        const { rowsPerPage, page, popperContent, popperOpen, popperType, arrowRef, anchorEl } = this.state;


        // GenericTable component return
        return (
            <React.Fragment>
                {customQuestions.length > 0 ? 
                    <Table>
                        <TableBody >
                            {customQuestions
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((item, index) => {
                                    return (
                                        <TableRow 
                                            key={index} 
                                            hover 
                                            onMouseOver={(event) => this.handleRowHover(event, type, item)} 
                                            onMouseLeave={(event) => this.handleRowLeave(event, item)}
                                            >
                                                <CustomTableCell>
                                                    <SurveyCheckbox 
                                                        item={item}
                                                        checked={type === "list" ? selected.list_name === item.list_name : selected.filter(q => q._id === item._id).length > 0 }
                                                        checkboxClick={this.props.checkboxClick}
                                                    />
                                                    <Typography variant="body2" inline style={{marginLeft: "15px"}}>{type === "list" ? item.list_name[0].toUpperCase() + item.list_name.slice(1) : item.question}</Typography>
                                                </CustomTableCell>
                                        </TableRow>
                                    ); 
                                })
                            } 
                        </TableBody>
                    </Table> 
                    :
                    <Typography variant="body1" style={{margin: "15px"}}>No questions to display</Typography>
                }

                {customQuestions.length > 4 && 
                    <TablePagination
                        component="div"
                        count={customQuestions.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                }


                <Popper 
                    open={popperOpen} 
                    anchorEl={anchorEl} 
                    placement={'right'} 
                    className={classes.popper}
                    modifiers={{
                        arrow: {
                          enabled: true,
                          element: arrowRef,
                        },
                      }}
                    >
                        <span className={classes.arrow} ref={this.handleArrowRef} />
                        <Paper style={{width: "245px"}}>
                            <Fade in={popperOpen} timeout={600}>
                                <React.Fragment>

                                    { popperContent && popperType === "question" &&
                                        <div style={{padding: "20px 20px 20px 30px"}}> 
                                            <Typography style={{fontSize: "16px", fontWeight: 500}}>{popperContent.question}</Typography> 
                                            <br /> 
                                                <table>
                                                    <tbody>
                                                        {popperContent.answers.map((answer, index) => {
                                                            return (
                                                                <Typography variant="subtitle2">
                                                                    <tr>
                                                                        <td style={{width: "20px", verticalAlign: "top"}}>{index+1}. </td>
                                                                        <td>{answer[0].toUpperCase() + answer.slice(1)}</td>
                                                                    </tr> 
                                                                </Typography> 
                                                            )
                                                        }) }
                                                    </tbody>
                                                </table>
                                            <br />
                                            <Typography variant="subtitle2">
                                                {!popperContent.addedBy ? `Added ` : popperContent.addedBy === `Default question` ? `Default question.` : `Added by ${popperContent.addedBy}.`}
                                                {popperContent.date_added ? ` on ${moment(popperContent.date_added).format("MMM Do YYYY")}` : null}
                                            </Typography>
                                        </div>
                                    }

                                    { popperContent && popperType === "list" &&
                                        <div style={{padding: "20px"}}> 
                                            <Typography style={{fontSize: "16px", fontWeight: 500}}>List: {popperContent.list_name}</Typography> 
                                            <hr className={classes.hrStyled} />
                                            <br />
                                            <table>
                                                <tbody>
                                                    {popperContent.list_questions.map((question, index) => {
                                                        return (
                                                            <Typography variant="subtitle2">
                                                                <tr>
                                                                    <td style={{width: "20px", verticalAlign: "top"}} >Q{index+1}.</td>
                                                                    <td>{question.question}</td>
                                                                </tr>
                                                            
                                                            </Typography> 
                                                        )
                                                    }) }
                                                </tbody>
                                            </table>
                                        </div>
                                    }

                                    </React.Fragment>
                             </Fade>
                        </Paper>
                </Popper>

            </React.Fragment>
        );
    }
}

CustomQuestionTable.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default  withStyles(styles, { withTheme: true })(CustomQuestionTable);