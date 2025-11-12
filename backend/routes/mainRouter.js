const express=require('express');
const userRouter=require('./userRouter.js')

const router=express.Router();

router.use('/user',userRouter)
module.exports=router;