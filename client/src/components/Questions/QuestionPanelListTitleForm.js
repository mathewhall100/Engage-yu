import React, { Component } from 'react'
import { reduxForm } from "redux-form"
import { connect } from 'react-redux'
import { withStyles, Grid, Typography } from '@material-ui/core'
import FormText from './QuestionAddFormText'
import BtnAction from '../UI/Buttons/btnAction'

const styles = theme => {

}

class QuestionPanelListNameForm extends Component {
    state = {
        error: ""
    }

    submit(values) {
        const listName = values[this.props.list._id]
        if (!listName) {
            this.setState({error: "* List name required"})
        } else if (!this.checkUnique(listName)) {
        this.setState({error: "* List name must be unique"})
        } else {
            this.props.submitListName(this.props.list._id, listName)
            this.props.reset("ListNameForm")
        }
    }

    checkUnique = (listName) => {
        const currentList = this.props.provider && this.props.provider.custom_question_lists
        const nameMatches = currentList.filter(list => {return list.list_name === listName})
        if (nameMatches && nameMatches.length > 0) {return false} else {return true}
    }

    render () {
        const { classes, list, handleSubmit } = this.props
        const { error } = this.state
        return (
            <form autoComplete="off" onSubmit={handleSubmit(this.submit.bind(this))}>
                <Grid container spacing={0} style={{marginTop: "-12px"}}>
                    <Grid item xs={9}>
                        <FormText name={list._id} label="New list name" variant="outlined" margin="dense" openFocus={true}/>
                        {error && <Typography variant="body2" color="error">{error}</Typography>}
                    </Grid>
                    <Grid iem xs={3}>
                    <span style={{position: "relative", left: "-8px", top: "24px"}}>
                        <BtnAction type="submit" text="save" />
                    </span>
                    </Grid>
                </Grid>
            </form>        
        )
    }
}

const mapStateToProps = (state) => {
    //console.log("State : ", state);
    return {
        provider: state.provider.provider,
    }
};

const formData = {
        form: 'ListNameForm',
}

QuestionPanelListNameForm = connect(mapStateToProps)(QuestionPanelListNameForm)
QuestionPanelListNameForm = reduxForm(formData)(QuestionPanelListNameForm)
export default QuestionPanelListNameForm       