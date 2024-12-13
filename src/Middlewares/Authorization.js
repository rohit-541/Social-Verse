import jwt from 'jsonwebtoken'

export const auth = (req,res,next)=>{
    const token  = req.headers["authorization"];

    if(!token){
        return res.status(401).send({success:false,message:"Unauthorized"});
    }

    try{
        const payload = jwt.verify(token,"frm7MFZRjHeuT3db9mZu4snyjai1e0zm");
        req.userId = payload.userId;
    }catch(error){
        return res.status(401).send("Unauthorized");
    }

    next();
}