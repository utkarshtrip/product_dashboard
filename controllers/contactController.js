import Visit from "../models/visit.js"
import Visitor from "../models/visitor.js"
import Contact from "../models/contact.js";
import Product from "../models/product.js";

const contact=async(req,res)=>{
    const {name,email,phone,industry,organization,visits,interest}=req.body
    try {
        if(interest){
            let existingProduct=await Product.findOne({where:{name:interest}})
            if(!existingProduct){
                existingProduct=await Product.create({name:interest})
            }
            const existingVisitor=await Visitor.findOne({where:{email}})
            if(existingVisitor){
                const existingVisit=await Visit.findOne({where:{visitorId:existingVisitor.id,productId:existingProduct.id}})
                if (existingVisit) {
                    const visitDates=[...existingVisit.visitDates,new Date()]
                    await Visitor.update({visits:parseInt(existingVisitor.visits)+1,lastVisit:new Date()}, {where:{email}})
                    await Visit.update({revisits:parseInt(existingVisit.revisits)+1,visitDates},{where:{id:existingVisit.id}})
                    res.status(200).send({message:"Form Submitted"})
                } else {
                    const newInterests=[...existingVisitor.interests,interest]
                    await Visitor.update({visits:parseInt(existingVisitor.visits)+1,lastVisit:new Date(),interests:newInterests}, {where:{email}})
                    await Visit.create({visitDates:[new Date()],productId:existingProduct.id,visitorId:existingVisitor.id})
                    res.status(200).send({message:"Form Submitted"}) 
                }
            }else{
                const newVisitor=await Visitor.create({name,email,phone,industry,organization,visits,lastVisit:new Date(),interests:[interest]},{returning:true})
                await Visit.create({visitDates:[new Date()],productId:existingProduct.id,visitorId:newVisitor.id})
                res.status(200).json({message:"Form Submitted"})
            }
        }   else{
            const existingContact=await Contact.findOne({where:{email}})
            if(existingContact){
                await Contact.update({visits:parseInt(existingContact.visits)+1,lastVisit:new Date()},{where:{id:existingContact.id}})
                res.status(200).json({message:"Thanks for connecting"})
            }else{
                await Contact.create({name,email,phone,industry,organization,visits,lastVisit:new Date()})
                res.status(200).json({message:"Thanks for connecting"})
            }
        } 
    } catch (error) {
              res.status(500).json({message:'server error'})   
    }
}

export {contact}