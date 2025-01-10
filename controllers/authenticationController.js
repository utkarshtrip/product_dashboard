import User  from "../models/user.js"
import bcrypt from 'bcrypt'
import { generateAccessToken, generateRefreshToken } from "../services/jwtAuth.js"
import Role from '../models/role.js'

const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const userExists=await User.findOne({where:{email},include:[{model:Role,as:'role'}]})
        if (userExists) {
            const correctPassword= bcrypt.compareSync(password,userExists.password)
            if (correctPassword) {
                const accessToken=await generateAccessToken(userExists)
                const refreshToken=await generateRefreshToken(userExists)
                res.cookie('access',accessToken,{httpOnly:true})
                res.cookie('refresh',refreshToken,{httpOnly:true})
                res.status(200).send(userExists)
            } else {
                res.status(400).send({message:"incorrect password"})
            }
        } else {
            res.status(404).send("No user is available with this user")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const authenticate=async(req,res)=>{
    const {id,rolename,superAdmin}=req.body
    try {

        res.status(200).send({id,rolename,superAdmin})
    } catch (error) {
        res.status(500).send("server error")
    }
}
const refreshAccessToken=async({id})=>{
    try {
        const userExists=await User.findOne({id})
        if (userExists) {
            const newAccessToken=generateAccessToken(userExists)
            return newAccessToken
        }
    } catch (error) {
        return null;
    }
}

export {login,authenticate,refreshAccessToken}