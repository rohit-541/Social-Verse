import { body ,validationResult } from "express-validator";

export const validateRequest = async (req,res,next) => {
    
    const rules = [body('name').notEmpty().withMessage('Name is required'),body('email').notEmpty().withMessage("Email is required"),body('email').isEmail().withMessage("Please Provide a valid email address"),body('password').notEmpty().withMessage("Password is required"),body('password').isLength({
        min:8,
    }).withMessage("Password should be more than 8 characters")];

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