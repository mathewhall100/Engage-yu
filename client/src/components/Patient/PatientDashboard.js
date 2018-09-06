import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },

    flex: {
        flexGrow: 1,
    },

    welcomeText: {
        marginRight: 20,
    },

    menuButton: {
        '&:hover': {
            backgroundColor: "#1a242b",
        },
        hover: {},
    },
});


class PatientDashboard extends Component {  
    
    componentDidMount() {
        console.log("here in pat dash");
    }

    render () {
        const { classes } = this.props;
        return (
                <div>
                    Questionnaires
                        <div>
                            <div style={{backgroundColor: "#2d404b"}} />
                            <Typography component='h1' variant='headline' noWrap>
                                {this.props.title}
                            </Typography>
                            <Divider />
                            <Typography component='h3' variant='headline'>
                                Default Question :
                            </Typography>

                            
                            <Divider />
                            <Typography component='h3' variant='headline'>
                                Custom Questions :
                            </Typography>

                            
                            <Divider />
                        </div>
                    
                </div >
        );
    }
}

function mapDispatchToProps(dispatch) {
    //<DefaultQuestion menuButton={classes.menuButton} radioGroup={classes.group} formControl={classes.formControl} handleChange={this.handleDefaultQuestionChange} defaultQuestion={this.props.defaultQuestion} renderQuestionnaires={this.renderQuestionnaires} stateName = {this.state.defaultQuestion} /> 
    //<CustomQuestions menuButton={classes.menuButton} radioGroup={classes.group} formControl={classes.formControl} handleChange={this.handleCustomQuestionChange} customQuestions={this.props.customQuestions} renderQuestionnaires={this.renderQuestionnaires} stateName= {this.state.customQuestions} />
    return bindActionCreators({}, dispatch);
}
function mapStatToProps(state){
    console.log("SK : ", state);
    return {
        auth: state.auth,
    }
}
PatientDashboard.propTypes = {
    classes : propTypes.object.isRequired
}
export default connect(mapStatToProps, mapDispatchToProps) (PatientDashboard)
