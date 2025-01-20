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
                res.cookie('access',accessToken,{httpOnly:true,maxAge:new Date(Date.now()+12*3600000)})
                res.cookie('refresh',refreshToken,{httpOnly:true,maxAge:new Date(Date.now()+12*3600000)})
                res.cookie('auth',true,{maxAge:new Date(Date.now()+12*3600000)})
                res.status(200).json({user:userExists})
            } else {
                res.status(400).json({message:"incorrect password"})
            }
        } else {
            res.status(404).json({message:"No user is available with this user"})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
const authenticate=async(req,res)=>{
    const {id,rolename,superAdmin,refreshId}=req.body
    try {
        if(id&&rolename){
            res.status(200).json({id,rolename,superAdmin})
        }else if(refreshId){
            const user=await User.findOne({where:{id:refreshId},include:[{model:Role,as:'role'}]})
            if(!user){
                res.status(404).json({message:"user not found"}); 
                return;
            }
            const accessToken= await generateAccessToken(user)
            res.cookie('access',accessToken,{httpOnly:true})
            res.status(200).json({id:user.id,rolename:user.role.rolename,superAdmin:user.superAdmin})
        }
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
}
const getUser=async(req,res)=>{
    const {id}=req.body
    try {
        const user=await User.findOne({where:{id},include:[{model:Role,as:'role'}]})
        if(user){
            res.status(200).json({user})
        }else{
            res.status(404).json({message:`user Not found`})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
const logout=async(req,res)=>{
    try {
        res.clearCookie("access",{httpOnly:true})
        res.clearCookie("refresh",{httpOnly:true})
        res.clearCookie("auth")
        res.status(200).json({message:"loggedOut"})
    } catch (error) {
        res.status(500).json({error})
    }
}

export {login,authenticate,logout,getUser}