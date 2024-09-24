const {JWT_SECRET} =require('./config');
const jwt=require('jsonwebtoken');

const authmiddleware=(req,res,next)=>{

        const authHeader=req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            
            return res.status(403).json({});
        }
        const token=authHeader.split(' ')[1];
        try{
            const decode=jwt.verify(token,JWT_SECRET);
            req.user_id=decode.user_id;
            next();
        }
        catch(e){
            return res.status(403).json({});
        }

}
module.exports = {
    authmiddleware
}
