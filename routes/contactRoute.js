import express from 'express'
import { contact } from '../controllers/contactController.js'
const router=express.Router()
router.post("/enter-visitor",contact)
export default router