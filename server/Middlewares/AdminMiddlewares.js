const Admin=require('../Models/AdminModel')

const jwt=require('jsonwebtoken')

module.exports.checkAdmin=(req,res,next)=>{
    const token=req.cookies.jwt
    if(token){
        jwt.verify(token,'adil super secret key',async(err,decodedToken)=>{
            if(err){
                res.json({status:false}) 
                next()
            }else{
                const user= await Admin.findById(decodedToken.id)
                if(user) res.json({status:true,user:user.email})
                else res.json({status:false}) 
                next()
                    
                
            }
        })
    }else{
        res.json({status:false})
        next()
    }
}