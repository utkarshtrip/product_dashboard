import { User } from "../models/user.js"
const contact=async(req,res)=>{
    const {name,email,phone,industry,organization,demo}=req.body
    console.log(demo)
    try {
        const user=await User.create({name,email,phone,industry,organization,demo})
        console.log(user)
        res.status(200).send({user,message:'Form Submitted'})
    } catch (error) {
        res.status(500).send({error})
    }
}
export {contact}