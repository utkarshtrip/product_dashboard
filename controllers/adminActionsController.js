import User from "../models/user.js";
import Role from "../models/role.js";
import bcrypt, { getRounds } from 'bcrypt'
import Visitor from "../models/visitor.js";
const createRole=async(req,res)=>{
    const {rolename}=req.body;
    try {
        const existingRole=await Role.findOne({where:{rolename:rolename.toLowerCase()}})
        if (existingRole) {
            res.status(409).send({message:"Role already Exists"})
        } else {
            const newRole=await Role.create({rolename:rolename.toLowerCase()},{returning:true})
            res.status(200).send(newRole);    
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const createUser=async(req,res)=>{
    const {name,email,roleId,password}=req.body
    try {
        const existingUser=await User.findOne({where:{email}})
        if (existingUser) {
            res.status(409).send({message:"User with this email already exists"})
        } else {
            const encryptedPassword=bcrypt.hashSync(password,10)
            const newUser=await User.create({name,email,roleId,password:encryptedPassword},{returning:true})
            res.status(200).send(newUser)
        }
    } catch (error) {
        res.status(500).send({error})
        
    }
}
const getUsers=async(req,res)=>{
    try {
        const users=await User.findAll({include:[{model:Role,as:'role'}]})
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error)
    }
}
const getVisitors=async(req,res)=>{
    try {
        const response=await Visitor.findAll();
        if (response) {
            res.status(200).send(response)
        } else {
            res.status(404).send({message:"user not found"})
            
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
const getRoles=async(req,res)=>{
    try {
        const roles=await Role.findAll()
        if (roles) {
        res.status(200).send(roles);    
        } else {
            res.status(404).send("No users exist.")
        }
    } catch (error) {
        res.status(500).send(error)
    }
}
export {createRole,createUser,getUsers,getRoles,getVisitors}