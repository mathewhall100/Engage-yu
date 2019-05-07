import React, {Component, Fragment}  from 'react';
import PropTypes from 'prop-types';
import { withStyles, Table, Typography, TableBody, TableCell, TableRow, TablePagination } from '@material-ui/core';
import SurveyCheckbox from './SurveyCheckbox';
import HrStyled from '../UI/hrStyled'
import PopperCustom from '../UI/popperCustom'

const CustomTableCell = withStyles({
    head: {
        padding: "5px", 
    },
    body: {
        padding: "5px",
        fontSize: 14,
    }
  })(TableCell);


class SurveyCustomQuestionTable extends Component {

    state = {
        anchorEl: null,
        popperOpen: false,
        popperType: "",
        popperContent: null,
        page: 0,
        rowsPerPage: 5,
    }

    // Popper Open
    handleRowHover = (event, type, content) => {
        console.log("PopperContent: ", type, " ", content)
        const { currentTarget } = event;
        this.setState({
          anchorEl: currentTarget,
          popperType: type,
          popperContent: content,
          popperOpen: "true",
        });
      };

    // popper close
    handleRowLeave = event =>  {
        this.setState({popperOpen: false})
    }

    handleChangePage = (event, page) => { 
        this.setState({ page }) 
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };


    render () {
        const { customQuestions=[], selected, type } = this.props;
        const { rowsPerPage, page, popperContent, popperOpen, popperType, anchorEl } = this.state;

        return (
            <Fragment>
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
                                            onMouseEnter={(event) => this.handleRowHover(event, type, item)} 
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
                    <Typography variant="body1" style={{margin: "15px"}}>
                        {type === "list" ? "No question lists saved for this provider" : "No custom questions saved for this provider"}
                    </Typography>
                }

                {customQuestions.length > 4 && 
                    <TablePagination
                        component="div"
                        count={customQuestions.length}
                        rowsPerPage={rowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]}
                        page={page}
                        backIconButtonProps={{'aria-label': 'Previous Page'}}
                        nextIconButtonProps={{'aria-label': 'Next Page'}}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                    />
                }

                {popperType === "question" && 
                    <PopperCustom anchorEl={anchorEl} placement="right" width="245px" popperContent={popperContent} popperOpen={popperOpen} >
                        <Typography variant="subtitle2" inline> CUSTOM QUESTION</Typography>
                        <HrStyled /><br />
                        <Typography variant="subtitle2" gutterBottom>Q. {popperContent.question}</Typography> 
                        <table>
                            <tbody>
                                {popperContent.answers.map((answer, index) => {
                                    return (
                                        <Typography variant="subtitle2">
                                            <tr>
                                                <td style={{width: "20px", verticalAlign: "top"}}>{index+1}.</td>
                                                <td>{answer[0].toUpperCase() + answer.slice(1)}</td>
                                            </tr> 
                                        </Typography> 
                                    )
                                }) }
                            </tbody>
                        </table>
                    </PopperCustom>
                }

                {popperType === "list" &&
                    <PopperCustom anchorEl={anchorEl} placement="right" width="245px" popperContent={popperContent} popperOpen={popperOpen} >
                        <Typography variant="subtitle2" inline> CUSTOM QUESTION LIST</Typography>
                        <HrStyled /><br />
                        <Typography variant="subtitle2" gutterBottom>Name: {popperContent.list_name}</Typography>                                 
                        <Typography variant="subtitle2" gutterBottom>Questions ({popperContent.list_questions.length}):</Typography>                      
                        <table>
                            <tbody>
                                {popperContent.list_questions.map((question, index) => {
                                    return (
                                        <Typography variant="subtitle2">
                                            <tr>
                                                <td style={{width: "24px", verticalAlign: "top"}}> {index+1}.</td>
                                                <td>{question.question}</td>
                                            </tr>
                                        </Typography> 
                                    )
                                }) }
                            </tbody>
                        </table>
                    </PopperCustom>
                }

            </Fragment>
        );
    }
}

SurveyCustomQuestionTable.propTypes = {
  classes: PropTypes.object.isRequired,

};

export default SurveyCustomQuestionTable;