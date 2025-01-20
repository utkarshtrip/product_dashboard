import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateAccessToken=async(user)=>{
    const {id,role,superAdmin}=user;
    return JWT.sign({id,rolename:role.rolename,superAdmin},process.env.JWT_SECRET,{expiresIn:'15m'})
}
const generateRefreshToken=async(user)=>{
    const {id}=user;
    return JWT.sign({id},process.env.JWT_SECRET,{expiresIn:'12h'})
}
export {generateAccessToken,generateRefreshToken}