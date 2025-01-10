import Visitor from "../models/visitor.js"

const contact=async(req,res)=>{
    const {name,email,phone,industry,organization,visits,interest}=req.body
    /**
     * if user => get interest array and push the current inrerest if not included and set the lastVisit to the current date
     * if not user => then create user with the default user
     */
    try {
        const existingVisitor=await Visitor.findOne({where:{email}})
        if (existingVisitor) {
            const newInterests=existingVisitor.interests;
            (interest && !newInterests.includes(interest))&& newInterests.push(interest)
                const user=await Visitor.update({visits:parseInt(existingVisitor.visits)+1,lastVisit:new Date(),interests:newInterests}, {where:{email},returning:true})
            res.status(200).send({user,message:'Form Submitted'})
        } else {
            const newInterests=[]
            interest && newInterests.push(interest)
            const user=await Visitor.create({name,email,phone,industry,organization,visits,lastVisit:new Date(),interests:newInterests})
                res.status(200).send({user,message:'Form Submitted'}) 
        }
    } catch (error) {
      res.status(500).send('server error')   
    }
}

export {contact}