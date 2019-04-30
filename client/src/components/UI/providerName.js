import React from 'react';
import { startCase } from 'lodash'


const ProviderName = (props) => {
    const {title="", firstname, lastname } = props

    const getName = () => {
        let msg = "";
        if (title) {
            if (title.toLowerCase() === "dr" || title.toLowerCase() === "prof") {
                msg = `${startCase(title)}. ${startCase(firstname)} ${startCase(lastname)}` 
            } else if (title.toLowerCase() === "rn" || title.toLowerCase() === "np" || title.toLowerCase() === "dnp") {
                msg = `${startCase(firstname)} ${startCase(lastname)} ${title.toUpperCase()}` 
            } else {msg = `${startCase(firstname)} ${startCase(lastname)}`}
        } else { 
            msg = `${startCase(firstname)} ${startCase(lastname)}` 
        }
        return msg;
    }

    return <span>{getName()}</span>
}

export default ProviderName