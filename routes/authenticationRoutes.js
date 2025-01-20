import express from 'express'
import { authenticate, getUser, login, logout } from '../controllers/authenticationController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router=express.Router()
router.post("/login",login)
router.get("/authenticate",authMiddleware,authenticate)
router.post('/is-super-admin',authenticate)
router.get('/user',authMiddleware,getUser)
router.get('/logout',logout)

export default router