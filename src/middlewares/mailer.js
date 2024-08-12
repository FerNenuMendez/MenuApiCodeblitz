import dotenv from "dotenv"
import sgMail from "@sendgrid/mail";
import logger from '../middlewares/logger.js'

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (options) => {
    try {
        const msg = {
            to: options.to,
            from: process.env.EMAIL_USER,//correo verificado
            subject: options.subject,
            html: options.html,
        };
        await sgMail.send(msg);
    } catch (error) {
        logger.error('Error enviando el correo:', error);
    }
};

export default sendEmail;