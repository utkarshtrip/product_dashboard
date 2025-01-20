import User from "../models/user.js";
import Role from "../models/role.js";
import bcrypt from 'bcrypt'
import Visitor from "../models/visitor.js";
import { Model, Op,col } from "sequelize";
import Visit from "../models/visit.js";
import Product from "../models/product.js";
import { countVisits } from "../services/countVisits.js";
const createRole=async(req,res)=>{
    const {rolename}=req.body;
    try {
        const existingRole=await Role.findOne({where:{rolename:rolename.toLowerCase()}})
        if (existingRole) {
            res.status(409).json({message:"Role already Exists"})
        } else {
            const newRole=await Role.create({rolename:rolename.toLowerCase()},{returning:true})
            res.status(200).json({newRole});    
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
const createUser=async(req,res)=>{
    const {name,email,roleId,password}=req.body
    try {
        const existingUser=await User.findOne({where:{email}})
        if (existingUser) {
            res.status(409).json({message:"User with this email already exists"})
        } else {
            const encryptedPassword=bcrypt.hashSync(password,10)
            const newUser=await User.create({name,email,roleId,password:encryptedPassword},{returning:true})
            res.status(200).json({newUser})
        }
    } catch (error) {
        res.status(500).json({error})
        
    }
}
const getUsers=async(req,res)=>{
    try {
        const users=await User.findAll({include:[{model:Role,as:'role'}]})
        res.status(200).json({users});
    } catch (error) {
        res.status(500).json({error})
    }
}
const getVisitors=async(req,res)=>{
    try {
        const visitors=await Visitor.findAll();
        if (visitors) {
            res.status(200).json({visitors})
        } else {
            res.status(404).json({message:"user not found"})
            
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
const getRoles=async(req,res)=>{
    try {
        const roles=await Role.findAll()
        if (roles) {
        res.status(200).json({roles});    
        } else {
            res.status(404).json({message:"No users exist."})
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
const getVisits=async(req,res)=>{
    const {filter}=req.params
    let visitCounts=0
    let targetDate=null;
    const visitData={}
    let finalVisits=null
    try {
        switch (filter){
            case "today":
                targetDate=new Date(Date.now()-24*3600000)
                const today=await Visit.findAll({where:{updatedAt:{[Op.gt]:targetDate}},include:[{model:Product, as:'product',attributes:['name']},{model:Visitor, as:'visitor',attributes:['name','email','industry','organization']}]})
                today.forEach(visit=>{
                    const visits=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1);
                    // visitData.includes()
                    if (visitData[visit.product.name]) {
                        visitData[visit.product.name] += visits;
                    } else {
                        visitData[visit.product.name] = visits;
                    }
                visitCounts+=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1)
            })
                res.status(200).json({visitData,visits:today,visitCounts})
                break;
                case "week":
                    targetDate=new Date(Date.now()-7*24*3600000)
                    const lastWeek=await Visit.findAll({where:{updatedAt:{[Op.gt]:targetDate}},include:[{model:Product, as:'product',attributes:['name']},{model:Visitor, as:'visitor',attributes:['name','email','industry','organization']}]})
                    lastWeek.forEach(visit=>{
                        const visits=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1);
                        if (visitData[visit.product.name]) {
                            visitData[visit.product.name] += visits;
                        } else {
                            visitData[visit.product.name] = visits;
                        }
                    visitCounts+=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1)
                })
                finalVisits = Object.entries(visitData).sort((a, b) => b[1] - a[1]).map(([key, value]) => ({ [key]: value })); 
                res.status(200).json({visitData:finalVisits,visits:lastWeek,visitCounts})
                break;
                    case "month":
                        targetDate=new Date(Date.now()-30*24*3600000)
                        const lastMonth=await Visit.findAll({where:{updatedAt:{[Op.gt]:targetDate}},include:[{model:Product, as:'product',attributes:['name']},{model:Visitor, as:'visitor',attributes:['name','email','industry','organization']}]})
                        lastMonth.forEach(visit=>{
                            const visits=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1);
                            if (visitData[visit.product.name]) {
                                visitData[visit.product.name] += visits;
                            } else {
                                visitData[visit.product.name] = visits;
                            }
                            visitCounts+=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1)
                        })
                        finalVisits = Object.entries(visitData).sort((a, b) => b[1] - a[1]).map(([key, value]) => ({ [key]: value })); 
                        res.status(200).json({visitData:finalVisits,visits:lastMonth,visitCounts})
                        break;
                        case "year":
                            targetDate=new Date(Date.now()-365*24*3600000)
                            const lastYear=await Visit.findAll({where:{updatedAt:{[Op.gt]:targetDate}},include:[{model:Product, as:'product',attributes:['name']},{model:Visitor, as:'visitor',attributes:['name','email','industry','organization']}]})
                            lastWeek.forEach(visit=>{
                                const visits=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1);
                                if (visitData[visit.product.name]) {
                                    visitData[visit.product.name] += visits;
                                } else {
                                    visitData[visit.product.name] = visits;
                                }
                                visitCounts+=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1)
                            })
                            finalVisits = Object.entries(visitData).sort((a, b) => b[1] - a[1]).map(([key, value]) => ({ [key]: value })); 
                            res.status(200).json({visitData:finalVisits,visits:lastMonth,visitCounts})
                            break;
                            case "custom":
                                targetDate=new Date(Date.now()-365*24*3600000)
                                const custom=await Visit.findAll({where:{updatedAt:{[Op.gt]:targetDate}},include:[{model:Product, as:'product',attributes:['name']},{model:Visitor, as:'visitor',attributes:['name','email','industry','organization']}]})
                                lastWeek.forEach(visit=>visitCounts+=countVisits(visit.visitDates,targetDate,0,visit.visitDates.length-1))
                        res.status(200).json({custom})
                        break;
        }
    } catch (error) {
        res.status(500).json({error})
    }
}
const getProducts=async(req,res)=>{
    try {
        const products=await Product.findAll()
        res.status(200).json({products})
    } catch (error) {
        res.status(500).json({error})
    }
}
const visitorsMetrix=async(req,res)=>{
    try {
        const newVisitors=await Visitor.count({where:{lastVisit:
            {[Op.not]:col('createdAt')}
        }})
        const reVisitors=await Visitor.count({where:{lastVisit:
            {[Op.gt]:col('createdAt')}
        }})
        res.status(200).json({newVisitors,reVisitors})
    } catch (error) {
        res.status(500).json({error})
    }
}
export {createRole,createUser,getUsers,getRoles,getVisitors,visitorsMetrix,getVisits,getProducts}