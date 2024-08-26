import crypto from 'crypto';
import logger from "../middlewares/logger.js"
import sendEmail from '../middlewares/mailer.js';
import { clientesService } from "../services/clientes.service.js";

export const forgotPassword = async (req, res) => {
    const { mail } = req.body;
    try {
        const user = await clientesService.buscarLogueo(mail);
        if (!user) {
            logger.error('Cliente a restablecer contraseña no encontrado')
            return res.status(404).send('Cliente not found');
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        const resetURL = `http://localhost:3000/renew/${token}`;
        const message = `
         <h1>Has solicitado un cambio de Password</h1>
         <p>Por favor ingrese al siguiente link para resetear su contraseña</p>
         <p>Entra al siguiente <a href="${resetURL}">link</a> para resetear tu password</p>
         `;
        await sendEmail({
            to: user.mail,
            subject: 'Restablecer contraseña',
            html: message,
        });
        logger.info(`Usuario encontrado: ${JSON.stringify(user, null, 2)}`)
        res.status(200).send('Password reset email sent');
    } catch (err) {
        logger.error('Error al ejecutar forgotpassword')
        res.status(500).send('Server error');
    }
};

export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await clientesService.buscar({
            //BUSCAR POR MAIL AL USUARIO
        });

        if (!user) {
            logger.error('Token no encontrado')
            return res.status(400).send('Invalid or expired token');
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