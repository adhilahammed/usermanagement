const { adminlogin, getUser, blockUser, unblockUser, deleteUser, singleUser, updateUser, searchUser } = require('../Controllers/AdminControllers')
const { checkAdmin } = require('../Middlewares/AdminMiddlewares')

const router=require('express').Router()

router.post('/adminlogin',adminlogin)       
router.post('/',checkAdmin) 
router.post('/getUser',getUser) 
router.put('/blockUser/:id',blockUser)
router.put('/unBlockUser/:id',unblockUser)
router.delete('/deleteUser/:id',deleteUser)
router.get('/singleUser/:id',singleUser)   
router.put('/singleUser/:id',updateUser)  
router.get('/search/:key',searchUser)



module.exports=router