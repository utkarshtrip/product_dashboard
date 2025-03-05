import express from 'express'
import { contact, feedback } from '../controllers/contactController.js'
const router=express.Router()
router.post("/enter-visitor",contact)
router.post("/feedback",feedback)
export default router