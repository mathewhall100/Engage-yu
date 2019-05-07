import { startCase } from 'lodash'

// ***** construct provider name from title, first and las names in database *****
export const providerName = (title, firstname, lastname) => {
    if (title.toLowerCase() === "dr" || title.toLowerCase() === "prof") {
        return `${startCase(title)}. ${startCase(firstname)} ${startCase(lastname)}` 
    } else if (title.toLowerCase() === "rn" || title.toLowerCase() === "np" || title.toLowerCase() === "dnp") {
        return `${startCase(firstname)} ${startCase(lastname)} ${title.toUpperCase()}` 
    } else return `${startCase(firstname)} ${startCase(lastname)}` 
}
