import React, { Component } from 'react'
import { Field } from 'redux-form';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import lime from '@material-ui/core/colors/lime';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import amber from '@material-ui/core/colors/amber';
import grey from '@material-ui/core/colors/grey';
import DoneIcon from '@material-ui/icons/Done';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    button0: {
        backgroundColor: red[500],
        width: '100%',
        borderWith: '5px',
        maxWidth: 360,
        '&:hover': {
            backgroundColor: red[700],
            borderColor: '#0062cc',
        },
    },
    button1 : {
        backgroundColor : lime[500],
        width: '100%',
        borderWith: '5px',
        maxWidth: 360,
        '&:hover': {
            backgroundColor: lime[700],
            borderColor: '#0062cc',
        },
        '&:focus': {
            boxShadow: 'none',
            backgroundColor: lime[900],
            borderColor: '#000000',
            borderStyle : 'solid',
            borderWidth : '5px'
        },
    },
    button2 : {
        backgroundColor : green[500],
        width: '100%',
        borderWith: '5px',
        maxWidth: 360,
        '&:hover': {
            backgroundColor: green[700],
            borderColor: '#0062cc',
        },
    },
    button3: {
        backgroundColor: amber[500],
        width: '100%',
        borderWith: '5px',
        maxWidth: 360,
        '&:hover': {
            backgroundColor: amber[700],
            borderColor: '#0062cc',
        },
    },
    button4: {
        backgroundColor: grey[500],
        width: '100%',
        borderWith: '5px',
        maxWidth: 360,
        '&:hover': {
            backgroundColor: grey[700],
            borderColor: '#0062cc',
        },
    },
});

class ButtonList extends Component {
    renderButtonList(field) {
        console.log("Field in button list : " , field)
        const { input: { value, onChange }, items, question, classes, meta: { pristine, touched, error } } = field
        return (
            <div>
                <h3>{question} : </h3>
                {items.map((item, index) => {
                    return(
                        <div>
                            <Button key={item.label} variant="contained" type="button" className={ index === 0 ? classes.button0: [index === 1 ? classes.button1 : [index === 2 ? classes.button2 : [index === 3 ? classes.button3 : index === 4 ? classes.button4 : null]]]} onClick={() => onChange(item.value)}>{item.label}</Button>
                            {value === item.value ? <DoneIcon /> : null}
                        </div>
                        
                    )
                })
                }
            </div>
        )
    }

    render() {
        const { classes, items, name, hints,index } = this.props;
        return <Field question={name} name={index} items={items} hints={hints} classes={classes} component={this.renderButtonList} />
    }
}
ButtonList.propTypes = {
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ButtonList);