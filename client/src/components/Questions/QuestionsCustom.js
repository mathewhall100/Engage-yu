import React, { Component, Fragment } from 'react';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash'
import { withStyles, Typography, Grid, Table, TableBody, TableCell, TableHead, TableRow, TableSortLabel, TablePagination} from '@material-ui/core'
import BtnAction from '../UI/Buttons/btnAction';
import FormText from './QuestionAddFormText'
import CallBack from '../UI/callback'
import HrStyled from '../UI/hrStyled'
import DialogError from '../UI/Dialogs/dialogError'
import { selectConsoleTitle, loadQuestions, loadProvider} from '../../actions';
import providerAPI from '../../utils/provider'
import question_customAPI from '../../utils/question_custom'
import QuestionPanel from './QuestionPanel'
import QuestionCustomAddDialog from './QuestionCustomAddDialog'
import QuestionCustomUpdateDialog from './QuestionCustomUpdateDialog'



const styles = theme => ({
    root: {
        display: 'flex', 
        flexDirection: 'row',
        justifyContent: "space-around",
        marginRight: '-20px',
        backgroundColor: "#FAFAFA",

    },
    container: {
        width: "33.33%",
        padding: "20px",
        backgroundColor: "#FAFAFA",
    },
    newListFormText: {
        backgroundColor: "#FFF"
    }
})

class QuestionsCustom extends Component {


    componentDidMount() {
        this.props.dispatch(selectConsoleTitle({title: "Customize Questions", menuIndex: 5}));
        this.props.dispatch(loadQuestions());
        this.props.dispatch(loadProvider(localStorage.getItem('user_provider_id')));
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.customQuestions && nextProps.customQuestions !== this.props.customQuestions) {
            this.setState({genQuestions: nextProps.customQuestions})
            this.setState({defQuestion: nextProps.defaultQuestion})
        }

        if (nextProps.provider && nextProps.provider.custom_questionLists !== this.props.provider.custom_question_lists) {
            this.setState({
                myQuestions: nextProps.provider.custom_questions,
                myLists: nextProps.provider.custom_question_lists
            })
        }
    }

    state = {
        genQuestions: [],
        defQuestion: {},
        myQuestions: [],
        newQuestionDialog: false,
        updateQuestionDialog: false, 
        refreshPostDelete: false,
        failed: false,
        myLists: [],
        page: 0,
        rowsPerPage: 9,
        pageB: 0,
        rowsPerPageB: 10,
    }

    updateDb = (action, list) => {
        const providerId = this.props.provider._id
        this.setState({error: ""})

        if (action === "newShared") {
            question_customAPI.create(list) // list- draggedqueston here
            .then(result => {
                this.props.dispatch(loadQuestions())
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }

        if (action === "all") {
            const questionArr = list
            providerAPI.saveAllQuestions(providerId, questionArr)
            .then(result => {
                this.props.dispatch(loadProvider(providerId))
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }

        if (action === "deleteSharedQuestion" ) {  
            const questionId = list._id // should be question of course
            this.setState({refreshPostDelete: true})
            question_customAPI.delete(questionId)
            .then(result => {
                this.props.dispatch(loadQuestions())
                this.setState({refreshPostDelete: false})
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }

        if (action === "deleteQuestion" ) {  
            const questionId = list._id // should be question of course
            this.setState({refreshPostDelete: true})
            providerAPI.deleteQuestion(providerId, {questionId: questionId})
            .then(result => {
                this.props.dispatch(loadProvider(providerId))
                this.setState({refreshPostDelete: false})
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }

        if (action === "add") {
            const listObj = list;
            providerAPI.addNewList(providerId, listObj)
            .then(result => {
                this.props.dispatch(loadProvider(providerId))
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }

        if (action === "update") {
            const listObj = {
                listId: list._id,
                listData:list
            }
            providerAPI.updateList(providerId, listObj)
            .then(result => {
                this.props.dispatch(loadProvider(providerId))
            })                
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }

        if (action === "delete" ) {  
            const listObj = {
                listId: list._id
            }
            this.setState({refreshPostDelete: true})
            providerAPI.deleteList(providerId, listObj)
            .then(result => {
                this.props.dispatch(loadProvider(providerId))
                this.setState({refreshPostDelete: false})
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                this.setState({failed: true})
            })
        }
    }

    onDragOver = (event) => {
        event.preventDefault();
    }

    onDragStart = (event, q) => {
        console.log("dragStart: ", q);
        event.dataTransfer.setData("question", JSON.stringify(q))
    }

    onDrop = (event, loc, id) => {
        if (loc === "onq")  {
            event.stopPropagation();
            event.nativeEvent.stopImmediatePropagation();
        }
        let myQuestions = this.state.myQuestions;
        let genQuestions = this.state.genQuestions;
        let draggedQuestion = JSON.parse(event.dataTransfer.getData("question"));
        let alreadyExists = myQuestions.filter(q => {return q.question === draggedQuestion.question}).length
        let alreadyShared = genQuestions.filter(q => {return q.question === draggedQuestion.question}).length
        let targIndex = -1;
        let fromIndex = -1;
        myQuestions.map((q, index) => {
            if (q._id === id) {targIndex = index}
        })
        myQuestions.map((q, index) => {
            if (q._id === draggedQuestion._id) {fromIndex = index}
        })
        if (loc === "onq" && !alreadyExists) {
            myQuestions.splice(targIndex, 0, draggedQuestion)
        }
        if (loc === "onq" && fromIndex > -1 && alreadyExists === 1) {
            if (fromIndex < targIndex) {
                 myQuestions.splice(targIndex+1, 0, draggedQuestion)
                 myQuestions.splice(fromIndex, 1)
            } else if (fromIndex > targIndex) {
                    myQuestions.splice(targIndex, 0, draggedQuestion)
                    myQuestions.splice(fromIndex+1, 1)
            } else null
        }
        if (loc === "onq" && fromIndex < 0 && alreadyExists) {
             myQuestions = myQuestions
        }
        if (loc === "mcq" && fromIndex > -1 && alreadyExists === 1) {
            myQuestions.splice(fromIndex, 1)
            myQuestions.push(draggedQuestion)
        }
        if (loc === "mcq" && !alreadyExists) {
            myQuestions.push(draggedQuestion)
        }
        this.updateDb("all", myQuestions)

        if (loc === "mql") {
            let list = this.state.myLists.filter(l => {return l._id === id})[0]
            list.list_questions.push(draggedQuestion)
            this.updateDb("update", list)
        }

        if (loc === "shq" && !alreadyShared) {
            const addedBy = {
                added_by: {
                    ref: this.props.provider.id,
                    id: this.props.provider._id,
                    title: this.props.provider.title,
                    firstname: this.props.provider.firstname,
                    lastname: this.props.provider.lastname,
                    role: this.props.provider.role
                }
            }
            this.updateDb("newShared", {...addedBy, ...draggedQuestion})
        }
    }

    submitList(values) {
        console.log("submitted: ", values)
        this.setState({error: ""})
        const listName = values.newList
        if (!listName) {
            this.setState({error: "* List name required"})
        } else if (!this.checkUnique(listName)) {
            this.setState({error: "* List name must be unique"})
        } else {
            const newList = {
                list_name: values.newList,
                list_questions: [this.state.defQuestion]
            }
            this.updateDb("add", newList)
            this.props.reset("AddListForm")
        }
    }

    checkUnique = (listName) => {
        const currentList = this.props.provider && this.props.provider.custom_question_lists
        const nameMatches = currentList.filter(list => {return list.list_name === listName})
        if (nameMatches && nameMatches.length > 0) {return false} else {return true}
    }

    submitQuestion(values) {
        console.log("submitted: ", values)
        this.setState({newQuestion: values.newQuestion })
        this.setState({newQuestionDialog: true})
        this.props.reset("AddListForm")
    }

    dialogClose = () =>  {
        this.setState({newQuestionDialog: false})
        this.setState({updateQuestionDialog: false})
    }

    updateQuestion = (questionId) => {
        console.log("update question")
        let question = this.state.myQuestions.filter(q => {return q._id === questionId})[0]
        this.setState({updateQuestion: question})
        this.setState({updateQuestionType: "custom"})
        this.setState({updateQuestionDialog: true})
    }

    deleteQuestion = (questionId) => {
        console.log("delete  question: ", questionId)
        let question = this.state.myQuestions.filter(q => {return q._id === questionId})[0]
        this.updateDb("deleteQuestion", question)
    }

    updateSharedQuestion = (questionId) => {
        console.log("update shared question")
        let question = this.state.genQuestions.filter(q => {return q._id === questionId})[0]
        this.setState({updateQuestion: question})
        this.setState({updateQuestionType: "shared"})
        this.setState({updateQuestionDialog: true})
    }

    shareQuestion = (questionId) => {
        console.log("share question: ", questionId)
        let question = this.state.myQuestions.filter(q => {return q._id === questionId})[0]
        let alreadyShared = this.state.genQuestions.filter(q => {return q.question === question.question}).length
        if (!alreadyShared) {
            const addedBy = {
                added_by: {
                    ref: this.props.provider.id,
                    id: this.props.provider._id,
                    title: this.props.provider.title,
                    firstname: this.props.provider.firstname,
                    lastname: this.props.provider.lastname,
                    role: this.props.provider.role
                }
            }
            this.updateDb("newShared", {...addedBy, ...question})
        }
    }

    deleteSharedQuestion = (questionId) => {
        console.log("delete question: ", questionId)
        let question = this.state.genQuestions.filter(q => {return q._id === questionId})[0]
        this.updateDb("deleteSharedQuestion", question)
    }

    updateListName = (listId, newListName) => {
        console.log("Update list title: ", listId, " ", newListName)
        let list = this.state.myLists.filter(l => {return l._id === listId})[0]

        list.list_name = newListName
        this.updateDb("update", list)
    }

    deleteList = (listId) => {
        console.log("Deletelist: ", listId)
        let list = this.state.myLists.filter(l => {return l._id === listId})[0]
        this.updateDb("delete", list)
    }

    deleteQuestionFromList = (q, id) => {
        console.log("delete question from list: ", q, " ", id)
        let list = this.state.myLists.filter(l => {return l._id === id})[0]
        let questionIndex = list.list_questions.indexOf(q)
        list.list_questions.splice(questionIndex, 1)
        this.updateDb("update", list)
    }

    moveQuestionUpInList = (q, id) => {
        console.log("move question up in list: ", q, " ", id)
        let list = this.state.myLists.filter(l => {return l._id === id})[0]
        let questionIndex = list.list_questions.indexOf(q)
        let questionAbove = list.list_questions[questionIndex-1]
        list.list_questions[questionIndex-1] = list.list_questions[questionIndex]
        list.list_questions[questionIndex] = questionAbove
        this.updateDb("update", list)
     }

    moveQuestionDownInList = (q, id) => {
        console.log("move question up in list: ", q, " ", id)
        let list = this.state.myLists.filter(l => {return l._id === id})[0]
        let questionIndex = list.list_questions.indexOf(q)
        let questionAbove = list.list_questions[questionIndex+1]
        list.list_questions[questionIndex+1] = list.list_questions[questionIndex]
        list.list_questions[questionIndex] = questionAbove
        this.updateDb("update", list)
    }

    handleChangePage = (event, page) => { 
        this.setState({ page }) 
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleChangePageB = (event, page) => { 
        this.setState({ pageB: page }) 
    };

    handleChangeRowsPerPageB = event => {
        this.setState({ rowsPerPageB: event.target.value });
    };


    render() {
        const { classes, loadingQuestions, loadingProvider, errorQuestions, errorProvider, handleSubmit } = this.props
        const {genQuestions, defQuestion, myQuestions, myLists, newQuestion, newQuestionDialog, updateQuestion, updateQuestionType, updateQuestionDialog, rowsPerPage, page, rowsPerPageB, pageB, refreshPostDelete, failed, error } = this.state

        // if (loadingQuestions || loadingProvider) {
        //     return <CallBack />
        // }

        if (refreshPostDelete) {
             return <CallBack />
         }
        
        if (errorQuestions || errorProvider) {
            return <DialogError />
        }

        return (
            <div className={classes.root}>

                <div className={classes.container}>
                    <Typography variant="h6" gutterBottom align="center">Default Question</Typography>
                    <HrStyled /> <br />

                    <QuestionPanel type="question" question={defQuestion} />
                    <br />

                    <Typography variant="h6" gutterBottom align="center">Shared Custom Questions</Typography>
                    <HrStyled />
                    <Table style={{marginTop: "14px"}}>
                        <TableBody>
                            <TableRow>
                                <TableCell style={{padding: 0, border: "none"}}>
                                    {genQuestions
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((question, index) => {

                                        return (
                                            <div key={index} 
                                                onDragStart = {(event) => this.onDragStart(event, question)}
                                                draggable 
                                                onDragOver={(event)=> this.onDragOver(event)}
                                                onDrop={(event)=>{this.onDrop(event, "shq", question._id)} }
                                                style={{marginBottom: "4px"}}
                                            >
                                                <QuestionPanel 
                                                    type="question"
                                                    allowUpdate={question.added_by.id === this.props.provider._id}
                                                    updateQuestion={this.updateSharedQuestion}
                                                    deleteQuestion= {this.deleteSharedQuestion} 
                                                    question={question} 
                                                />
                                            </div>
                                        )
                                    })}
                                </TableCell> 
                            </TableRow>
                        </TableBody>
                    </Table>
                    {genQuestions.length > 4 && 
                        <TablePagination
                            component="div"
                            rowsPerPageOptions={[5, 10, 25]}
                            count={genQuestions.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{'aria-label': 'Previous Page'}}
                            nextIconButtonProps={{'aria-label': 'Next Page'}}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                            
                        /> 
                    }  
                
                </div>

                <div className={classes.container} 
                    onDragOver={(event)=> this.onDragOver(event)}
                    onDrop={(event)=>{this.onDrop(event, "mcq")} }
                >
                    <Typography variant="h6" gutterBottom align="center">My Custom Questions</Typography>
                    <HrStyled />

                    <form autoComplete="off" onSubmit={handleSubmit(this.submitQuestion.bind(this))}>
                        <Grid container spacing={0}>
                            <Grid item xs={10}>
                                <FormText name="newQuestion" label="Enter new question" width="90%" className={classes.newListFormText}/>
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{float: "right", position: "relative", top: "36px"}}>
                                    <BtnAction type="submit" text="add" />
                                </span>
                            </Grid>
                        </Grid>
                    </form>

                    <div style={{marginTop: "12px"}}></div>

                    {isEmpty(myQuestions) ? 
                        <Typography variant="subtitle1" align="justify" >
                            No questions. Drag and drop questions from 'All Custom Questions' or create a new question above.
                        </Typography>
                        :
                        <Fragment>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell style={{padding: 0, border: "none"}}>
                                            {myQuestions
                                            .slice(pageB * rowsPerPageB, pageB * rowsPerPageB + rowsPerPageB)
                                            .map((question, index) => {
                                                return (
                                                    <div key={index}
                                                    onDragStart = {(event) => this.onDragStart(event, question)}
                                                    draggable 
                                                    onDragOver={(event)=> this.onDragOver(event)}
                                                    onDrop={(event)=>{this.onDrop(event, "onq", question._id)} }
                                                    style={{marginBottom: "4px"}}
                                                    >
                                                        <QuestionPanel 
                                                            type="question" 
                                                            allowUpdate={true}
                                                            showShare={true}
                                                            question={question} 
                                                            updateQuestion={this.updateQuestion}
                                                            shareQuestion={this.shareQuestion}
                                                            deleteQuestion= {this.deleteQuestion} 
                                                        />
                                                    </div>
                                                )
                                            }) }    
                                        </TableCell> 
                                    </TableRow>
                                </TableBody>
                            </Table>
                            {myQuestions.length > 9 && 
                                <TablePagination
                                    component="div"
                                    rowsPerPageOptions={[5, 10, 25]}
                                    count={myQuestions.length}
                                    rowsPerPage={rowsPerPageB}
                                    page={pageB}
                                    backIconButtonProps={{'aria-label': 'Previous Page'}}
                                    nextIconButtonProps={{'aria-label': 'Next Page'}}
                                    onChangePage={this.handleChangePageB}
                                    onChangeRowsPerPage={this.handleChangeRowsPerPageB}
                                />  
                            }
                        </Fragment>
                    }
                </div>

                <div className={classes.container}>
                    <Typography variant="h6" gutterBottom align="center">My Question Lists</Typography>
                    <HrStyled />
                    
                    <form autoComplete="off" onSubmit={handleSubmit(this.submitList.bind(this))}>
                        <Grid container spacing={0}>
                            <Grid item xs={10}>
                                <FormText name="newList" label="New list name" width="90%" className={classes.newListFormText}/>
                                {error && <Typography variant="body2" color="error">{error}</Typography>}
                            </Grid>
                            <Grid item xs={2}>
                                <span style={{float: "right", position: "relative", top: "36px"}}>
                                    <BtnAction type="submit" text="add" />
                                </span>
                            </Grid>
                        </Grid>
                    </form>

                    <div style={{marginTop: "12px"}}></div>

                    {isEmpty(myLists) ? 
                        <Typography variant="subtitle1" align="justify" >
                            No lists. Create a list above then drag and drop questions to populate it. 
                        </Typography>
                        :
                        myLists.map((list, index) => {
                            return (
                                <div  key={index}
                                    onDragOver={(event)=> this.onDragOver(event)}
                                    onDrop={(event)=>{this.onDrop(event, "mql", list._id)}}
                                    style={{marginBottom: "4px"}}
                                >
                                    <QuestionPanel 
                                        type="list" 
                                        list={list} 
                                        updateListName={this.updateListName}
                                        deleteList= {this.deleteList} 
                                        moveQuestionUpInList={this.moveQuestionUpInList} 
                                        moveQuestionDownInList={this.moveQuestionDownInList} 
                                        deleteQuestionFromList={this.deleteQuestionFromList} 
                                    />
                                </div>
                            )
                        })
                    }
                </div>

                 {newQuestionDialog && <QuestionCustomAddDialog newQuestion={newQuestion} dialogClose={this.dialogClose} /> }
                 {updateQuestionDialog && <QuestionCustomUpdateDialog updateQuestion={updateQuestion} updateQuestionType={updateQuestionType} dialogClose={this.dialogClose} /> }
                 {failed && <DialogError text="Whoops! Something went wrong and the patient's details could not be updated at this time. Please try again. If the problem persist, contact your It help" />} 

            </div>
        )
    }
}

const mapStateToProps = (state) => {
    console.log("State : ", state);
    return {
        defaultQuestion: state.questions.questions.defaultQuestion,
        customQuestions: state.questions.questions.customQuestions,
        errorQuestions: state.questions.error,
        loadingQuestions: state.questions.loading,

        provider: state.provider.provider,
        loadingProvider: state.provider.loading,
        errorProvider: state.provider.error,
    }
};

const formData = {
        form: 'AddListForm', //unique identifier for this form 
}

QuestionsCustom = reduxForm(formData)(QuestionsCustom)
QuestionsCustom = connect(mapStateToProps) (QuestionsCustom)
QuestionsCustom = withStyles(styles)(QuestionsCustom)
export default QuestionsCustom