import crypto from 'crypto';
import logger from "../middlewares/logger.js"
import { clientesService } from "../services/clientes.service.js";
import { hashear, tokenExpirado } from '../models/utils/utils.js';
import { sendRecoveryMail } from '../middlewares/recoveryMail.js';


//SOLICITAR LINK DE RECUPERO
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
        user.resetPasswordExpires = Date.now() + 7200000; // 2 horas
        await clientesService.actualizarResetPassword(user._id, {
            resetPasswordToken: user.resetPasswordToken,
            resetPasswordExpires: user.resetPasswordExpires,
        });
        sendRecoveryMail(user, token)
        res.status(200).send('Mail de recuperacion de contraseña enviado');
    } catch (err) {
        logger.error(`Error:${err}`)
        res.status(404).send('Usuario no encontrado');
    }
};

// COMPROBAR TOKEN Y CAMBIAR PASSWORD
export const resetPassword = async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
    try {
        const user = await clientesService.buscarPorToken(token);
        const newPass = hashear(password)
        await clientesService.actualizarPassword(user._id, newPass);
        logger.info('Contraseña actualizada correctamente');
        res.status(200).send('Password reset successfully');
    } catch (err) {
        logger.error('Error al ejecutar resetPassword')
        res.status(500).send('Server error');
    }
};