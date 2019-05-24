import React, { Component, Fragment } from 'react';
import { startCase, upperFirst } from 'lodash'
import moment from 'moment';
import PropTypes from 'prop-types';
import { withStyles, ExpansionPanel, ExpansionPanelSummary, Typography} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/DeleteOutline'
import ArrowUpIcon from '@material-ui/icons/ArrowUpward'
import ArrowDownIcon from '@material-ui/icons/ArrowDownward'
import ExpandIcon from '@material-ui/icons/ExpandMore';
import EditIcon from '@material-ui/icons/Edit';
import ShareIcon from '@material-ui/icons/Share';
import BtnAction from '../UI/Buttons/btnAction'
import ProviderName from '../UI/providerName'
import QuestionListTitleForm from "./QuestionPanelListTitleForm"
import PopperCustom from '../UI/popperCustom'
import HrStyled from '../UI/hrStyled'

const styles = theme => ({
	root: {
		marginBottom: "4px",
		border: "2px solid",
		borderColor: "#FFF",
		borderRadius: '6px',
		'&:hover': {
            borderColor: theme.palette.primary.main,
            cursor: "pointer"
        }
	},
	heading: {
		fontSize: theme.typography.pxToRem(16),
		fontWeight: theme.typography.fontWeightMedium,
	},
	expandIcon: {
        fontSize: "26px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
    },
	listQIcon: {
		fontSize: "20px",
		color: "#666",
		float: "right",
		marginRight: "4px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
	},
	listQHover: {
		'&:hover': {
            backgroundColor: "#fafafa",
			cursor: "pointer"
		}
	},
	questionIcon: {
		fontSize: "20px",
		color: "#666",
		marginLeft: "6px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
	},
	cancelIcon: {
		fontSize: "36px",
		color: "#666",
		float: "right",
		marginRight: "4px",
        '&:hover': {
            color: theme.palette.primary.main,
            cursor: "pointer"
        }
	},
	
});


class questionPanel extends Component  {

	state = {
		expand: false,
		editTitle: false,
		editListName: false,
		updateQuestion: false, 
		deleteList: false,
		anchorEl: null,
        popperOpen: false,
        popperType: "",
        popperContent: null,
	}

	expandClick = () => {
		this.setState({expand: !this.state.expand})
		this.setState({editListName: false})
		this.setState({editQuestionName: false})
		this.setState({deleteList: false})
		this.setState({deleteQuestion: false})
	}

	stopProp = (event) => {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
	}

	editListName = (event, id) => {
		console.log("edit list name: ", id)
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.setState({editListName: true})
	}

	handleUpdateListName = (listId, newListName) => {
		this.props.updateListName(listId, newListName)
		this.setState({editListName: false})
	}

	handleUpdateQuestionName = (questionId, newQuestionName) => {
		this.props.updateQuestionName(questionId, newQuestionName)
		this.setState({editQuestionName: false})
	}

	deleteList = (event, id) => {
		console.log("Delete list: ", id)
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.setState({deleteList: true})
	}

	handleDeleteList = (listId) => {
		this.props.deleteList(listId)
		this.setState({deleteList: false})
	}

	handleDeleteCancel = () => {
		this.setState({deleteList: false})
		this.setState({deleteQuestion: false})
	}

	handleUpdateQuestion = (event, id) => {
		console.log("update question: ", id)
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.props.updateQuestion(id)
	}

	deleteQuestion = (event, id) => {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.setState({deleteQuestion: true})
	}

	handleShareQuestion = (event, id) => {
		event.stopPropagation();
		event.nativeEvent.stopImmediatePropagation();
		this.props.shareQuestion(id)
	}

	handleDeleteQuestion = (questionId) => {
		this.props.deleteQuestion(questionId)
		this.setState({deleteQuestion: false})
	}

	handleUpArrow = (q, id) => {
		console.log("up arrow: ", q, " ", id)
		this.props.moveQuestionUpInList(q, id)
		this.handleRowLeave()

	}

	handleDownArrow = (q, id) => {
		console.log("down arrow: ", q, " ", id)
		this.props.moveQuestionDownInList(q, id)
		this.handleRowLeave()
	}

	handleDeleteQuestionFromList = (q, id) => {
		console.log("delete: ", q, " ", id)
		this.props.deleteQuestionFromList(q, id)
		this.handleRowLeave()
	}

	// Popper Open
	handleRowHover = (event, content) => {
		console.log("PopperContent: ", content)
		const { currentTarget } = event;
		this.setState({
			listQHover: true,
			anchorEl: currentTarget,
			popperContent: content,
			popperOpen: "true",
		});
	};

	// popper close
	handleRowLeave = event =>  {
		this.setState({popperOpen: false})
	}

	render () {

		const { classes, type, question, allowUpdate, showShare, list } = this.props;
		const { expand, editListName, deleteList, deleteQuestion, popperOpen, popperContent, anchorEl} = this.state

		if (type === "question") {
			return (
				<ExpansionPanel className={classes.root} >

					<ExpansionPanelSummary expandIcon={<ExpandIcon className={classes.expandIcon}/>}  onClick={() => this.expandClick()}>
						{deleteQuestion ?
							<span onClick={(event) => this.stopProp(event)}>
								<Typography variant="subtitle1" inline style={{marginRight: "14px"}}>
									Confirm delete 
									<span className={classes.heading}> '{question.question}'</span></Typography>
								<BtnAction type="button" text="delete" warning={true} index={question._id} handleAction={this.handleDeleteQuestion} />
							</span>
							:
							<Fragment>
								{question && question.question && <Typography className={classes.heading}>{upperFirst(question.question)}</Typography> }	
								{expand && allowUpdate &&
									<span style={{marginRight: "10px", marginLeft: "4px", minWidth: "120px"}}>
										{showShare && <ShareIcon 
											className={classes.questionIcon}
											onClick={(event) => this.handleShareQuestion(event, question._id)}
										/>}
										<EditIcon 
											className={classes.questionIcon} 
											onClick={(event) => this.handleUpdateQuestion(event, question._id)}
										/>
										<DeleteIcon 
											className={classes.questionIcon} 
											onClick={(event) => this.deleteQuestion(event, question._id)}
										/>
									</span>
								}	
							</Fragment>
						}
					</ExpansionPanelSummary>

					<div>
						<Typography variant="subtitle2" style={{marginTop: "-8px"}}>
							<table>
								<tbody>
									{question && question.answers && question.answers.map((ans, index) =>
										<tr key={index}>
											<td style={{width: '24px'}}></td>
											<td>{index+1}. {upperFirst(ans)}</td>
										</tr>	
									)}
								</tbody>
							</table>
						</Typography>

						{ question && question.added_by && 
							<Typography align="right" style={{marginRight: "16px"}}>
								Added by &nbsp;
								<ProviderName 
									title={question.added_by.title} 
									firstname={question.added_by.firstname}
									lastname={question.added_by.lastname}
								/>
								<br />
								&nbsp; {moment(question.date_added).format("MMM Do YYYY")}
								<br />
							</Typography>
						}
					</div>

					<br />

				</ExpansionPanel>
			)
		}

		if (type === "list") {
			return (
				<Fragment>
					<ExpansionPanel className={classes.root}>

						<ExpansionPanelSummary  expandIcon={<ExpandIcon className={classes.expandIcon}/> } className={classes.expandPanel} onClick={() => this.expandClick()}>
							{editListName ?
								<span onClick={(event) => this.stopProp(event)}>
									<QuestionListTitleForm list={list} submitListName={this.handleUpdateListName}/>
								</span>
								:
								deleteList ?
									<span onClick={(event) => this.stopProp(event)}>
										<Typography variant="subtitle1" inline style={{marginRight: "14px"}}>
											Confirm delete 
											<span className={classes.heading}> '{list.list_name}'</span></Typography>
										<BtnAction type="button" text="delete" warning={true} index={list._id} handleAction={this.handleDeleteList} />
									</span>
									:
									<Fragment>
										<Typography className={classes.heading}>{upperFirst(list.list_name)}</Typography>
										{expand && 
											<span style={{marginRight: "10px", marginLeft: "4px", minWidth: "120px"}}>
												<EditIcon 
													className={classes.questionIcon} 
													onClick={(event) => this.editListName(event, list._id)}
												/>
												<DeleteIcon 
													className={classes.questionIcon} 
													onClick={(event) => this.deleteList(event, list._id)}
												/>
												
											</span>}
									</Fragment>
								
							}
						</ExpansionPanelSummary>

						<div style={{padding: "0px 4px 8px 24px"}}>
							<Typography variant="subtitle2" style={{marginTop: "-8px"}}>
								<table style={{width: "100%", borderCollapse: "collapse"}}>
									<tbody>
										{list && list.list_questions && list.list_questions.map((q, index) => 
											q ? 
												<tr 
													key={index} 
													onMouseEnter={(event) => this.handleRowHover(event, q)} 
													onMouseLeave={(event) => this.handleRowLeave(event, q)}
													className={classes.listQHover}
												>
													<td style={{border: "none"}}>{index+1}. {q.question ? upperFirst(q.question): null}</td>
													<td style={{border: "none", minWidth: "120px"}}>
														<DeleteIcon 
															className={classes.listQIcon} 
															style={{marginRight: "12px"}}
															onClick={() => this.handleDeleteQuestionFromList(q, list._id)}
														/>

														{list.list_questions.length > 1 && index === list.list_questions.length-1 && 
															<ArrowUpIcon 
																className={classes.listQIcon} 
																onClick={() => this.handleUpArrow(q, list._id)}
															/>
														}
														{list.list_questions.length > 1 && index !== list.list_questions.length-1 && 
															<ArrowDownIcon 
																className={classes.listQIcon} 
																onClick={() => this.handleDownArrow(q, list._id)}
															/>
														}
													</td>
												</tr> 
											: null
										)}
									</tbody>
								</table>
							</Typography>
						</div>

					</ExpansionPanel>
					
					<PopperCustom anchorEl={anchorEl} popperContent={popperContent} popperOpen={popperOpen} placement="left">
						<Typography variant="subtitle2" inline>CUSTOM QUESTION</Typography>
						<HrStyled />
						{popperContent && <Fragment>
							<Typography variant="subtitle2" gutterBottom>Q. {popperContent.question}</Typography> 
							<table>
								<tbody>
									{popperContent.answers.map((answer, index) => {
										return (
											<Typography variant="subtitle2">
												<tr>
													<td style={{width: "20px", verticalAlign: "top"}}>{index+1}.</td>
													<td>{upperFirst(answer)}</td>
												</tr> 
											</Typography> 
										)
									}) }
								</tbody>
							</table>
						</Fragment> }
					</PopperCustom>

				</Fragment>
			)
		}
	}
}

questionPanel.propTypes = {
	classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(questionPanel);