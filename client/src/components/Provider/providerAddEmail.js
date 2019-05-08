import { providerName } from "../../logic/textFunctions"

export const getHtmlMsg = (newProvider) => {

    const newProviderName = providerName(newProvider.title, newProvider.firstname, newProvider.lastname)
    const newProviderEmail = newProvider.email
    const newProviderPwd = newProvider.password
    const enrollingProvider = providerName(localStorage.getItem("user_provider_title"), localStorage.getItem("user_provider_firstname"), localStorage.getItem("user_provider_lastname"))
    
    const msg = {
        emailTo: newProvider.email,
        subject: `${newProviderName}: Welcome to Engage-yu`,
        text: "",
        html: 
            `<p>Dear ${newProviderName}</p>
            <h3>Welcome to Engage-Yu</h3>
            <p>You have been registered with the Engage-Yu application by your colleague, ${enrollingProvider}.</p>
            <p>You may now log in and use the application with the following credentials:</p?
            <table>
                <tbody>
                    <tr><td style="width: 10px">email:</td><td>${newProviderEmail}</td></tr>
                    <tr><td style="width: 10px">password:</td><td>${newProviderPwd}</td></tr>
                </tbody>
            </table>
            <p>This password is temporary and you will be prompted to change it to a more secure passord of your choice when you first login. Note that before you can login, you must have verified your email address by following the instructions on a separate email we have sent you.</p>
            <p>Regards</p>
            <p>The Engage-Yu team</p>
            `
    }
    return msg
}