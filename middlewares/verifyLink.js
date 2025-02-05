import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const verifyLink=async(req,res,next)=>{
    const {token}=req.body
    try {
        if(!token){
            res.status(404).send({message:"invalid link"})
            return 
        }else{
            JWT.verify(token,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                  res.status(400).send("invalid link")
                  return
                }   else{
                    console.log(decoded)
                    req.body.email=decoded.email;
                    next()
                    return 
                }
            });
        }
    } catch (error) {
        res.status(500).send("server error in verify link middleware")
    }
}
export {verifyLink}