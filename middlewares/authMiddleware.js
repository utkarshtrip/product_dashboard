import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
import { refreshAccessToken } from '../controllers/authenticationController.js'
dotenv.config()
const authMiddleware=async(req,res,next)=>{
    const {access,refresh}=await req.cookies
    try {
        if(!access||!refresh){
            res.status(401).send("invalid tokens")
        }else{
        if(JWT.verify(access,process.env.JWT_SECRET)){
            req.body.id=JWT.decode(access,process.env.JWT_SECRET)?.id
            req.body.rolename=JWT.decode(access,process.env.JWT_SECRET)?.rolename
            req.body.superAdmin=JWT.decode(access,process.env.JWT_SECRET)?.superAdmin
            next()
        }else if(JWT.verify(refresh,process.env.JWT_SECRET)){
            const id=verify(refresh, process.env.JWT_SECRET)
            const newAccessToken=refreshAccessToken()
        }
    }
    } catch (error) {
        res.status(500).send("failed")
    }
}
export {authMiddleware}