const UserModel = require("../Models/UserModel")
const AdminModel=require('../Models/AdminModel')
const jwt=require('jsonwebtoken')

const maxAge=3*24*60*60

const createToken=(id)=>{
    return jwt.sign({id},'adil super secret key',{
       expiresIn:maxAge
    })
}

const handleErrors=(err)=>{
    let errors={email:'',password:''}

    if(err.message==='incorrect Email') 
    errors.email='That email is not registered'

    if(err.message==='incorrect password') 
    errors.email='That password is incorrect'

    if(err.code===11000){
        errors.email='Email is already registered'
        return errors
    }
    if(err.message.includes('Users validation failed')){  
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path]=properties.message
        })
    }
    return errors
}

module.exports.adminlogin=async(req,res,next)=>{
    try {
        const{email,password}=req.body
        const admin=await AdminModel.adminlogin(email,password)   
        const token=createToken(admin._id)
        res.cookie('jwt',token,{
            withCrdentials:true,
            httpOnly:false,
            maxAge:maxAge*1000
        })
        res.status(200).json({admin:admin._id,created:true})
    } catch (err) {
        console.log(err);
        const errors=handleErrors(err)
        res.json({errors,created:false})

    }
}

module.exports.getUser = async (req, res, next) => {
    try {
      const user = await UserModel.find()
      console.log(user);
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
  
    }
  };

  module.exports.blockUser=async (req,res,next)=>{
    try {
        let id=req.params.id
        const user=await UserModel.findByIdAndUpdate({_id:id},{$set:{block:true}},{upsert:true})
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
  }

  module.exports.unblockUser=async (req,res,next)=>{
    try {
        let id=req.params.id
        const user=await UserModel.findByIdAndUpdate({_id:id},{$set:{block:false}},{upsert:true})
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
  }

  module.exports.deleteUser=async (req,res,next)=>{
    try {
        let id=req.params.id
        const user=await UserModel.deleteOne({_id:id})
        res.status(200).json(user)
    } catch (err) {
        console.log(err);
    }
  }

  module.exports.singleUser = async (req, res, next) => {
    try {
        
      const user = await UserModel.findOne({_id:req.params.id})   
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
  
    }
  };

  module.exports.updateUser = async(req, res, next) => {
    try {
        
      const user = await UserModel.updateOne(
        {_id:req.params.id},
        {$set:req.body}
        )   
      res.status(200).json(user)
    } catch (err) {
      console.log(err);
      const errors=handleErrors(err)
        res.json({errors,created:false})
  
    }
  };

  module.exports.searchUser = async (req, res, next) => {
    try {
        
      let result = await UserModel.find({
        '$or':[
          {
            name:{$regex:req.params.key}
          }
        ]
      })   
      res.status(200).json(result)
    } catch (err) {
      console.log(err);
  
    }
  };

 

 