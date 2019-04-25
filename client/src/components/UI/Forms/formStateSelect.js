import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import FormSelect from './formSelect';

export default class FormStateSelect extends PureComponent { 
    
    render () {
        const { name } = this.props;

        const states = [
            'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
        ];

        const getStatesList = (states) => {
            let statesList=[]
            statesList = states.map((state, index) => {
                return {id: index, value: state, text: state}
            })
            return statesList
        };

        return (
            <FormSelect name={name} label="State" items={getStatesList(states)} width={180}/>
        );
    }
}

FormStateSelect.propTypes = {
    name: PropTypes.string.isRequired
}