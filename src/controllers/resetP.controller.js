import crypto from 'crypto';
import logger from "../middlewares/logger.js"
import { sendMail } from '../middlewares/mailer.js';
import { clientesService } from "../services/clientes.service.js";

export const forgotPassword = async (req, res) => {
    const { mail } = req.body;
    try {
        const user = await clientesService.buscar({ mail });
        if (!user) {
            logger.error('Cliente a restablecer contraseña no encontrado')
            return res.status(404).send('Cliente not found');
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        const resetURL = `http:${req.headers.host}/reset/${token}`;
        const message = `
         <h1>Password Reset Request</h1>
         <p>You requested a password reset</p>
         <p>Click this <a href="${resetURL}">link</a> to reset your password</p>
         `;
        //await sendMail(user.mail, 'Password Reset', message);
        logger.info(`Usuario encontrado: ${JSON.stringify(user, null, 2)}`)
        res.status(200).send('Password reset email sent');
    } catch (err) {
        logger.error('Error al ejecutar forgotpassword')
        res.status(500).send('Server error');
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    try {
        const user = await clientesService.buscar({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            logger.error('Token no encontrado')
            return res.status(400).send('Invalid or expired token');
        }

        if (password !== confirmPassword) {
            logger.error('Passwords no coinciden')
            return res.status(400).send('Passwords do not match');
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        logger.info('Contraseña restablecida con exito')
        res.status(200).send('Password has been reset');
    } catch (err) {
        logger.error('Error al ejecutar resetPassword')
        res.status(500).send('Server error');
    }
};