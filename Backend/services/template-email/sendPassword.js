import { sendEmail } from "../emailService.js";

const sendPassword = (email, password) => {
    const emailData = {
        to: email,
        subject: 'Your Password',
        text: `Here is your password: ${password}`
    }
    sendEmail(emailData);
}

export default sendPassword 