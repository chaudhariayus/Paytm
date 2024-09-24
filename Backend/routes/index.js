const express=require("express");
const router=express.Router();
const userouter =require("./user")
const accountrouter=require("./account")

router.use("/user",userouter);
router.use("/account",accountrouter);

module.exports=router;
