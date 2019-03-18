import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { FormControlLabel } from '@material-ui/core';
import { Field } from 'redux-form';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { RadioButton, RadioButtonGroup } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';
import FormLabel from '@material-ui/core/FormLabel';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

class CheckboxList extends React.Component {

    renderCheckboxList(field) {
        console.log("Field in checkboxlist : ", field);
        const { input, meta: { pristine, touched, error }, children, name, items, hints, classes  } = field
        console.log("children : ", children);
        return (
            <div >
                <FormLabel component="legend" >{input.name}</FormLabel>
                <List>
                    <ListItem>
                        <RadioGroup
                            {...input}
                            onChange={(event, value) => input.onChange(value)}
                            style={{ display: 'flex', flexDirection: 'column' }}
                        >
                            {items.map(item =>
                                <ListItem
                                    key={item.value}
                                    value={item.value}
                                    label={item.label}
                                    role={undefined}
                                    dense
                                    button
                                    className={classes.listItem}
                                >
                                    <FormControlLabel
                                        key={item.label}
                                        value={item.value.toString()}
                                        control={<Radio />}
                                        label={item.label}
                                    >
                                        <Radio key={item.value} value={item.value.toString()} label={item.label} />
                                    </FormControlLabel>
                                </ListItem>
                            )}
                        </RadioGroup>
                        <div style={{ fontSize: "13px", color: "red" }}>
                            {touched ? error : ''}
                        </div>
                        <div style={{ fontSize: "13px", color: "green" }}>
                            {!pristine ? <DoneIcon /> : ''}
                        </div>
                    </ListItem>
                    
                    
                </List>
            </div>
        );
    }

    render() {
        const { classes, items, name, hints  } = this.props;
        console.log("In checkbox list : ", this.props);

        return (
            <Field name={name} type='radio' items={items} hints={hints} classes={classes} component={this.renderCheckboxList}>
                
            </Field>
        );
    }
}

CheckboxList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxList);