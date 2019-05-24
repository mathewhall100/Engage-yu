import React, { Component, Fragment } from 'react';
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    notchedOutlineGreen: {
      borderWidth: "2px",
      borderColor: "green !important"
    },
    notchedOutlineOrange: {
      borderWidth: "2px",
      borderColor: "#FFA500 !important"
    },
    notchedOutlineYellow: {
      borderWidth: "2px",
      borderColor: "#FFD700 !important"
    },
    notchedOutlineRed: {
      borderWidth: "2px",
      borderColor: "red !important"
    },
    notchedOutlineGrey: {
      borderWidth: "2px",
      borderColor: "grey !important"
    },
  })

class FormText extends Component {  

    renderTextField(field) {
        //console.log("Field: ", field);
        const {label, type,  openFocus, margin, classes, color, meta: {touched, error}} = field;
        return (
            <Fragment>
                    <TextField
                        label={label}
                        {...field.input}   
                        onBlur={() => {return false}}
                        margin={margin}
                        style={{width: "90%" }}
                        InputProps={{
                            classes: {
                              notchedOutline: color === "green" ? classes.notchedOutlineGreen 
                                : color === "yellow" ? classes.notchedOutlineYellow
                                : color === "orange" ? classes.notchedOutlineOrange
                                : color === "red" ? classes.notchedOutlineRed
                                : color === "grey" ? classes.notchedOutlineGrey
                                : classes.notchedOutlineGrey, 
                            }
                          }}
                        inputProps={{maxLength: 80}}
                        type={type}
                        variant="outlined"
                        autoComplete="off"
                        autoFocus={openFocus}
                    />

                {<div style={{fontSize: "13px", color: "red"}}> 
                    {touched ? error : ''}
                </div> }

            </Fragment>
        );
    }

    render () {
        const { classes, name, openFocus, margin="normal", color, label, type="text" } = this.props;
        return (
            <Field 
                name={name}
                label={label}
                type={type}
                component={this.renderTextField}
                openFocus={openFocus}
                classes={classes}
                color={color}
                margin={margin}
            />
        );
    }
}

FormText.propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired
};

export default withStyles(styles)(FormText)