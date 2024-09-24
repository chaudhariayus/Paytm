const express=require("express");
const router=express.Router();
const z=require("zod");
const { JWT_SECRET } = require("../config"); 
const jwt =require("jsonwebtoken");
const {User,Account} =require("../db")
const { authmiddleware } = require("../middleware");


router.use(express.json());
const signupschema=z.object({
    username:z.string().email(),
    firstName:z.string(),
    lastName:z.string(),
    password:z.string()
});

const signupmiddleware=async(req,res,next)=>{
    const newuser=req.body;
    const parsed=signupschema.safeParse(newuser);
    if(!parsed.success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }
    const userexits=await User.findOne({
        username:newuser.username
    });
    if(userexits){
        return res.status(411).json({
            message:"Email already taken"
        })
    }
    next();

}

router.post("/signup", signupmiddleware, async (req, res) => {
    try {
        const added_user = await User.create(req.body);
        const user_id = added_user._id;
        await Account.create({
            userid:user_id,
            balance:1+Math.random()*10000
        })
        const token = jwt.sign({ user_id }, JWT_SECRET);
        res.json({
            message: "User created successfully",
            token: token
        });
    } catch (e) {
        console.error("Error details:", e); 
        return res.status(500).json({ message: "Internal Server Error", error: e.message });
    }
});

const loginschema=z.object({
    username:z.string().email(),
    password:z.string()
})

const signinmiddleware= async (req,res,next)=>{
    const user=req.body;
    if(!loginschema.safeParse(user).success){
        return res.status(411).json({message:"Incorrect Inputs"});
    }
    try{
        const userexists=await User.findOne(user);
        if(!userexists){
           return  res.status(411).json({message:"Error while login"})
        }
        req.userid=userexists._id
        return next();
    }
    catch(e){
        return res.status(500).json({message:"Internal Server Error"});
    }
}

router.post("/signin",signinmiddleware,async(req,res)=>{
    const user_id=req.userid
    const token=jwt.sign({user_id},JWT_SECRET);

    res.json({
        token:token
    })
})

const newschema=z.object({
    password:z.string().optional(),
    firstName:z.string().optional(),
    lastName:z.string().optional()


})

router.put("/",authmiddleware,async(req,res)=>{
    if(!newschema.safeParse(req.body).success){
        return res.status(411).json({message:"Error while updating information"});
    }
    try{
        const username=req.username;
        const user=await User.updateOne({username},req.body);
       
    }catch(e){
        res.status(411).json({
            message: "Error while updating information"
        });
    }
})

router.get("/bulk",authmiddleware,async(req,res)=>{
    const filter=req.query.filter||"";
    try{
        const users=await User.find({
            $or:[{
                firstName:{"$regex" :filter} 
                },
                {
                    lastName:{"$regex":filter}
                }
            ]
        })
        const user= users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }));
        res.json({user});
    }catch(e){
        res.status(500).json({});
    }
})

module.exports=router;