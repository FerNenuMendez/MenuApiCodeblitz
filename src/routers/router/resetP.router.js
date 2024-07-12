import { Router } from "express";
import { forgotPassword, resetPassword } from '../../controllers/resetP.controller.js'

export const resetPRouter = Router()

resetPRouter.post('/forgot-password', forgotPassword)
resetPRouter.post('/reset-password/:token', resetPassword)

resetPRouter.get('/test', (req, res) => {
    res.send('Api Funcionando OK')
})