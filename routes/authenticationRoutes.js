import express from 'express'
import { authenticate, authenticateLink, changePassword, generateChangePasswordLink, getUser, login, logout,sendOtp } from '../controllers/authenticationController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { verifyLink } from '../middlewares/verifyLink.js'
const router=express.Router()
router.post("/login",login)
router.get("/authenticate",authMiddleware,authenticate)
router.post('/is-super-admin',authenticate)
router.get('/user',authMiddleware,getUser)
router.get('/logout',logout)
router.post('/send-otp',sendOtp)
router.post('/verify-link',verifyLink,authenticateLink)
router.post('/send-link',generateChangePasswordLink)
router.post('/change-password',verifyLink,changePassword)
export default router