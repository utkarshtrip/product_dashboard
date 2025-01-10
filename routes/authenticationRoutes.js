import express from 'express'
import { authenticate, login } from '../controllers/authenticationController.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
const router=express.Router()
router.post("/login",login)
router.get("/authenticate",authMiddleware,authenticate)
router.post('/is-super-admin',authenticate)

export default router