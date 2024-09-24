const express=require("express");
const router=express.Router();
const {authmiddleware}=require("../middleware")
const {User,Account} =require("../db");
const { default: mongoose } = require("mongoose");

router.use(express.json());

router.get("/balance",authmiddleware,async (req,res)=>{
   
   const userid=req.user_id;
   const account=await Account.findOne({userid})
   res.json({
    balance:account.balance
   })
})

router.post("/transfer",authmiddleware,async(req,res)=>{
    let session;
    try{
        session=await mongoose.startSession();
        session.startTransaction();
    }catch(e){
        return res.json({message:"Error while initiating transfer comeback later after some time"
    })
    }

    try{
        const {amount,to}=req.body;
        const account= await Account.findOne({userid:req.user_id}).session(session);
        if(!account || account.balance<amount){
            await session.abortTransaction();
            return res.status(400).json({message:"Insufficient balance"});
        }
        const toAccount= await Account.findOne({userid:to}).session(session);

        if(!toAccount){
            await session.abortTransaction();
            return res.status(400).json({
                message:"Invalid account"
            })
        }

        await Account.updateOne({userid:req.user_id},{$inc :{balance :-amount}}).session(session);
        await Account.updateOne({userid:to},{$inc :{balance:amount}}).session(session);
        await session.commitTransaction();
        res.json({
            message:"Transfer successfull"
        });
    }catch(e){
        await session.abortTransaction();
        res.status(500).json({message:"An error occur during transaction"});
    } 
    finally
    {
        if(session){
        session.endSession();
    }
    }
})

module.exports =router;