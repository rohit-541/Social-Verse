import { body ,validationResult } from "express-validator";

export const loginvalidateRequest = async (req,res,next) => {
    
    const rules = [body('email').notEmpty().withMessage("Email is required"),body('email').isEmail().withMessage("Please Provide a valid email address"),body('password').notEmpty().withMessage("Password is required")];

    //excecute rules
    await Promise.all(rules.map((rule)=>rule.run(req)));

    const Validationresult = validationResult(req);
    if(!Validationresult.isEmpty()){
        const error = Validationresult.array().map((err)=>err.msg); 
        return res.status(401).send(error);
    }else{
        next();
    }
}