import express from 'express'
import { createRole, createUser, getUsers, getRoles, getVisitors, visitorsMetrix, getVisits, getProducts } from '../controllers/adminActionsController.js'
const router=express.Router()
router.post('/create-role',createRole)
router.post('/create-user',createUser)
router.get('/get-users',getUsers)
router.get("/get-roles",getRoles)
router.get('/get-visitors',getVisitors)
router.get('/visitors-metrix',visitorsMetrix)
router.get('/get-visits/:filter',getVisits)
router.get('/get-products',getProducts)
export default router