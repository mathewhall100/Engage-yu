import { providerName } from "../../logic/textFunctions"

export const getHtmlMsg = (patient) => {

    const newPatientName = `${patient.firstname} ${patient.lastname}`
    const newPatientEmail = patient.email
    const newPatientPwd = patient.password
    const enrollingProvider = providerName(
        localStorage.getItem("user_provider_title"), 
        localStorage.getItem("user_provider_firstname"), 
        localStorage.getItem("user_provider_lastname")
    )

    const msg = {
        emailTo: newPatientEmail,
        subject: `${newPatientName}: Welcome to Engage-yu`,
        text: "",
        html: `
            <p>Dear ${newPatientName}</p>
            <h3>Welcome to Engage-Yu</h3>
            <p>You have been registered with the Engage-Yu application by your healthcare provider, ${enrollingProvider}.</p>
            <p>You may now log in and use the application with the following credentials:</p>
            <table>
                <tbody>
                    <tr><td style="width: 100px">email:</td><td>${newPatientEmail}</td></tr>
                    <tr><td style="width: 100px">password:</td><td>${newPatientPwd}</td></tr>
                </tbody>
            </table>
            <p>This passowod is temporary and you will be prompted to change it to a more secure passord of your choice when you first login. Note that before you can login, you must have verified your email address by following the instructions on a separate email we have sent you.</p>
            
            <p>Regards,</p>
            <p>The Engage-Yu team</p>
        `
    }
    return msg
}