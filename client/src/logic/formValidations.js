import moment from 'moment'


export const validateIsRequired = (value) => {
    //console.log("valueReq: ", value);
    if (!value) {return "*Required"}
    else return "";
};

export const validateName = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{2,30}$/.test(value))  {
        return "*Must be between 2 and 30 characters, numbers, ', or -";
    } else return "";
};

export const validateAddress = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^[a-zA-Z0-9\\'\\-\\.\\,\\ ]{5,50}$/.test(value))  {
        return "*Must be between 2 and 30 characters, numbers, ', or -";
    } else return "";
};

export const validateHospId = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^[a-zA-Z0-9/-]{2,12}$/.test(value))  {
        return "*Invalid hospId. Only characters, numbers and '/' and '-' allowed";
    } else return "";
};

export const validateDOB = (value, required=false) => {
    //console.log("value: ", value);

    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^(0?[1-9]|1[012])[/-](0?[1-9]|[12][0-9]|3[01])[/-]\d{4}$/i.test(value))  {
        return "*Invalid date of birth.";
    } else if (value && parseInt(value.slice(-4), 10) > moment().format('YYYY')-16) {
        return "*Must be over 16years of age";
    } else if (value && parseInt(value.slice(-4), 10) < 1900) {
        return "*You cannot be this old!";
    } else return "";
};

export const validateGender = (value, required=false)=> {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!(value === "male" || value === "female")) {
         return "Invalid gender. Please select male or female";
     } else return "";
};

export const validateZip = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^[0-9]{5}$/.test(value))  {
        return "*Invalid zip code. Must be 5 numbers.";
    } else return "";
};

export const validateState = (value, required=false) => {
    //console.log("value: ", value);
    const states = [
        'Alabama','Alaska','American Samoa','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','District of Columbia','Federated States of Micronesia','Florida','Georgia','Guam','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Marshall Islands','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Northern Mariana Islands','Ohio','Oklahoma','Oregon','Palau','Pennsylvania','Puerto Rico','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virgin Island','Virginia','Washington','West Virginia','Wisconsin','Wyoming'
    ];
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!states.includes(value, required=false))  {
        return "*Invalid state";
    } else return "";
};

export const validateEmail = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/i.test(value)) {
            return"Invalid email address.";
    } else return "";
};

export const validateEmails = (value1, value2) => {
    //console.log("value: ", value1, " : ", value2);
    if (!value2) {return "*Required field"} 
    else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/i.test(value2)) {
        return"Invalid email address.";
    } else if (value1 && value2 && value1 !== value2) {
        return "*Entered emails do not match";
    } else return "";
};

export const validatePhone= (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s.]{0,1}[0-9]{3}[-\s.]{0,1}[0-9]{4}$/i.test(value)) {
        return "*Invalid phone number. Try (123) 456 7891 format" ;
    } else return "";
};

export const validatePhoneOther = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!/^[a-zA-Z0-9 ]{2,15}$/i.test(value)) {
        return "*Invalid phone or pager";
    } else return "";
};

export const validateStatus = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    else if (!(value === "active" || value === "inactive")) {
        return "Invalid status. Must be 'active or 'inactive' only";
    } else return "";
};

export const validatePassword = (value, required=false) => {
    //console.log("value: ", value);
    if (!value) {if (required) return "*Required field"; else return "";}
    if (value && value.length < 8) {
        return "Password must be at least 8 characters";
    } else if (!/\d{1}/i.test(value)) {
        return "Password must contain at least one number (0-9)"
    } else if (!/[!@#$%^&*]/g.test(value)) {  // need to edit this to special characters allowed by auth0
        return "Password must conatin at least one special character "
    } else return "";
};

export const validatePasswordsMatch = (value1, value2) => {
    //console.log("value: ", value1, " : ", value2);
    if (!value2) {return "*Required field"} 
    if (value1 && value2 && value1 !== value2) {
        return "*Entered passwords do not match";
    } else return "";
};

