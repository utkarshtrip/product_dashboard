import JWT from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const authMiddleware=async(req,res,next)=>{
    const {access,refresh}=await req.cookies
    try {
        if(!access||!refresh){
            res.status(404).send({message:"Tokens not found"})
            return 
        }else{
            JWT.verify(access,process.env.JWT_SECRET,(err,decoded)=>{
                if(err){
                    JWT.verify(refresh,process.env.JWT_SECRET,(err,decoded)=>{
                        if(err){
                            res.status(492).json({message:"Invalid tokens"})
                            return
                        }else{
                            req.body.refreshId=decoded.id
                             next()
                             return
                        }
                    });
                }   else{
                    req.body.id=decoded.id
                    req.body.superAdmin=decoded.superAdmin
                    req.body.rolename=decoded.rolename
                    next()
                    return 
                }
            });
        }
    } catch (error) {
        res.status(500).send("failed")
    }
}
export {authMiddleware}