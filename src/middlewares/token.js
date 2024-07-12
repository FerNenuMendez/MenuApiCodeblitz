import crypto from 'crypto';
import { sendMail } from './mailer.js';
import { clientesService } from '../services/clientes.service';

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await clientesService.buscar({ email });
        if (!user) {
            return res.status(404).send('Cliente not found');
        }
        const token = crypto.randomBytes(20).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora

        const resetURL = `http://${req.headers.host}/reset/${token}`;
        const message = `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset</p>
        <p>Click this <a href="${resetURL}">link</a> to reset your password</p>
      `;

        await sendMail(user.email, 'Password Reset', message);

        res.status(200).send('Password reset email sent');
    } catch (err) {
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
            return res.status(400).send('Invalid or expired token');
        }

        if (password !== confirmPassword) {
            return res.status(400).send('Passwords do not match');
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        res.status(200).send('Password has been reset');
    } catch (err) {
        res.status(500).send('Server error');
    }
};