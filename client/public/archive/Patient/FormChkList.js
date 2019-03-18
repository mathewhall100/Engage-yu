import React, { Component } from 'react';
import { Field } from "redux-form";
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});


class CheckboxGroup extends Component {

    static propTypes = {
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired
        })).isRequired
    };

    checkboxGroup() {
        const { options, input} = this.props;

        options.map((option, index) => {
            return (
                <div className="checkbox" key={index}>
                    <label>
                        <input type="checkbox"
                            name={`${input.name}[${index}]`}
                            value={option.name}
                            checked={input.value.indexOf(option.name) !== -1}
                            onChange={(event) => {
                                const newValue = [...input.value];
                                if (event.target.checked) {
                                    newValue.push(option.name);
                                } else {
                                    newValue.splice(newValue.indexOf(option.name), 1);
                                }

                                return input.onChange(newValue);
                            }} />
                        {option.name}
                    </label>
                </div>)
        });
    }

    render() {
        const { items, name } = this.props;
        return (
            <div>
                <Field name={name} component={CheckboxGroup} options={items} /> 
            </div>
        )
    }
}

export default withStyles(styles)(CheckboxGroup);