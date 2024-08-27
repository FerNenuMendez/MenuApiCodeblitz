import logger from "./logger.js";
import sendEmail from "./mailer.js";


export async function sendRecoveryMail(user, token) {
    try {
        const resetURL = `http://localhost:3000/renew/${token}`;
        const message = `
             <h1>Hola ${user.nombre}, has solicitado un cambio de Password</h1>
             <p>Entra al siguiente <a href="${resetURL}">link</a> para resetear tu password</p>`;
        await sendEmail({
            to: user.mail,
            subject: 'Restablecer contraseña',
            html: message,
        });
        logger.info(`Mail enviado a ${user.mail}`)

    } catch (error) {
        logger.error(`Error:${err}`)
    }
}