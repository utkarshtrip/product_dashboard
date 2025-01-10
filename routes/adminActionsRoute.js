import express from 'express'
import { createRole, createUser, getUsers, getRoles, getVisitors } from '../controllers/adminActionsController.js'
const router=express.Router()
router.post('/create-role',createRole)
router.post('/create-user',createUser)
router.get('/get-users',getUsers)
router.get("/get-roles",getRoles)
router.get('/get-visitors',getVisitors)
export default router