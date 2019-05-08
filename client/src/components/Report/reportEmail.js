import { startCase } from 'lodash'

export const getHtmlMsg = (patientInfo, recipients) => {

    const patient = `${startCase(patientInfo.firstname)} ${startCase(patientInfo.lastname)}`
    const emailTo = recipients.map(recipient => {return recipient[8]})

    const msg = {
        email: emailTo, 
        subject: `${patient}: Diary card report for patent: `,
        text: "",
        html: `<H3>Diary Card report for ${patient} is ready to be veiwed</h3>
                <p>Login to the Engage-Yu application to view the report and respond to the patient.</p>
                <p>Regards</p>
                <p>The Engage-Yu team</p>`,
    }
    return msg
}