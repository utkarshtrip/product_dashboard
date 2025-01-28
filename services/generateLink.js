import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const generateLink=({email,purpose,origin})=>{
    const token= JWT.sign({email,purpose},process.env.JWT_SECRET,{expiresIn:'5m'})
    return `${origin}/${purpose}/${token}`
}
export {generateLink}