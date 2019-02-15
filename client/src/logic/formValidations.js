
export const validateIsRequired = (value) => {
    console.log("value: ", value)
    if (!value) {return"*Required"}
    else return ""
}

export const validateName = (value) => {
    console.log("value: ", value)
    if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(value))  {
        return "*Invalid address. Only characters, numbers and '-' allowed"
    } else return ""
}

export const validateZip = (value) => {
    if (!/^[0-9]{5}$/i.test(value))  {
        return "*Invalid zip code. Must be 5 numbers."
    } else return ""
}

export const validateEmail= (value) => {
    console.log("value: ", value)
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/i.test(value)) {
        return"Invalid email address."
    } else return ""
}

export const validatePhone= (value) => {
    console.log("value: ", value)
    if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/i.test(value)) {
        return "*Invalid phone number. Try (123) 456 7891 format" 
    } else return ""
}

    export const validatePhoneOther = (value) => {
    if (!/^[a-zA-Z0-9 ]{2,15}$/i.test(value)) {
    return "*Invalid phone or pager" 
    } else return ""
}