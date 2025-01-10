import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateAccessToken=async(user)=>{
    const {id,role,superAdmin}=user;
    return JWT.sign({id,rolename:role.rolename,iat:Date.now(),superAdmin},process.env.JWT_SECRET,{expiresIn:'15s'})
}
const generateRefreshToken=async(user)=>{
    const {id}=user;
    return JWT.sign({id,iat:Date.now()},process.env.JWT_SECRET,{expiresIn:'12h'})
}
export {generateAccessToken,generateRefreshToken}