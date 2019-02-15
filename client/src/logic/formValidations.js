
export const validateName = (value) => {
    console.log("value: ", value)
    let errors =""
    if (!value) {errors = "*Please enter an office address!"
    } else if (!/^[a-zA-Z0-9' ]{2,30}$/i.test(value))  {
        errors = "*Invalid address. Only characters, numbers and '-' allowed"
    } else errors=""
    return errors
}