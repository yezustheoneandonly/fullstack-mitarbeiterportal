import { createTransport } from "nodemailer";
import { errorHandler } from "../Middleware/errorHandler.js";


const transporter = createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GOOGLE_MAIL_ACCOUNT,
        pass: process.env.GOOGLE_MAIL_NODEMAILER_PASSWORD
    }
});

export const sendEmail = (emailData) => {
    const mailOptions = {
        from: process.env.GOOGLE_MAIL_ACCOUNT,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            errorHandler(error)
        } else {
            console.log("Email sent: " + info.response);
        }
    });
}