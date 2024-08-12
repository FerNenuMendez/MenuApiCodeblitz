import dotenv from "dotenv"
import sgMail from "@sendgrid/mail";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
    const msg = {
        to: options.to,
        from: process.env.EMAIL_USER,//correo verificado
        subject: options.subject,
        html: options.html,
    };

    await sgMail.send(msg);
};

export default sendEmail;